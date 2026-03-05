import React, { useState, useEffect, useCallback } from 'react'
import { auditLogsApi } from '../../services/api/admin/auditLogs'
import type { AuditLog as AuditLogType, AuditVisualizations } from '../../services/api/admin/auditLogs'
import { Search, Download, Filter, Calendar, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Loader2 } from 'lucide-react'
import { Line, Pie } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  Title
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  ArcElement, 
  Tooltip, 
  Legend, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement,
  Title
);

const AuditLogs = () => {
  const [logs, setLogs] = useState<AuditLogType[]>([])
  const [visualizations, setVisualizations] = useState<AuditVisualizations | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const [filters, setFilters] = useState({
    search: '',
    actionType: 'all',
    resourceType: 'all',
    sortBy: '-timestamp'
  });
  
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 20,
    totalRecords: 0
  });

  const [selectedLogs, setSelectedLogs] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('Last 7 days');

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true)
      const params: any = {
        page: pagination.currentPage,
        ordering: filters.sortBy
      }
      
      if (filters.actionType !== 'all') params.action = filters.actionType.toUpperCase()
      if (filters.resourceType !== 'all') params.resource_type = filters.resourceType.toUpperCase()
      
      const response = await auditLogsApi.getAuditLogs(params)
      setLogs(response.data.results)
      setPagination(prev => ({
        ...prev,
        totalRecords: response.data.count
      }))
      setError(null)
    } catch (err) {
      console.error('Error fetching audit logs:', err)
      setError('Failed to load audit logs.')
    } finally {
      setLoading(false)
    }
  }, [pagination.currentPage, filters.sortBy, filters.actionType, filters.resourceType])

  const fetchVisuals = useCallback(async () => {
    try {
      const response = await auditLogsApi.getVisualizations()
      setVisualizations(response.data)
    } catch (err) {
      console.error('Error fetching visualizations:', err)
    }
  }, [])

  useEffect(() => {
    fetchLogs()
  }, [fetchLogs])

  useEffect(() => {
    fetchVisuals()
  }, [fetchVisuals])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const checkDarkMode = () => setIsDarkMode(document.documentElement.classList.contains('dark'));
    
    checkMobile();
    checkDarkMode();
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') checkDarkMode();
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    window.addEventListener('resize', checkMobile);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedLogs(logs.map(log => log.id));
    } else {
      setSelectedLogs([]);
    }
  };

  const handleSelectLog = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (e.target.checked) {
      setSelectedLogs(prev => [...prev, id]);
    } else {
      setSelectedLogs(prev => prev.filter(logId => logId !== id));
    }
  };

  const totalPages = Math.ceil(pagination.totalRecords / pagination.pageSize);

  const filteredLogs = logs.filter(log => {
    if (!filters.search) return true;
    const search = filters.search.toLowerCase();
    return (
      log.user_email?.toLowerCase().includes(search) ||
      log.action.toLowerCase().includes(search) ||
      log.resource_type.toLowerCase().includes(search) ||
      JSON.stringify(log.details).toLowerCase().includes(search)
    );
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: !isMobile,
        position: 'top' as const,
        labels: {
          color: isDarkMode ? '#CBD5E1' : '#1F2937',
          font: { family: 'Inter, sans-serif', size: isMobile ? 10 : 12 }
        }
      }
    }
  };

  const activityChartData = {
    labels: visualizations?.daily_activity.map(item => new Date(item.day).toLocaleDateString(undefined, { weekday: 'short' })) || [],
    datasets: [
      {
        label: 'Events',
        data: visualizations?.daily_activity.map(item => item.count) || [],
        fill: false,
        borderColor: '#3B82F6',
        tension: 0.4
      }
    ]
  };

  const distributionChartData = {
    labels: visualizations?.by_action.map(item => item.action) || [],
    datasets: [
      {
        data: visualizations?.by_action.map(item => item.count) || [],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#6366F1', '#EF4444', '#EC4899', '#8B5CF6']
      }
    ]
  };

  if (loading && logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-muted">Loading audit logs...</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-full px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-themed">Audit Logs</h1>
          <p className="text-sm text-muted mt-1">Monitor all system activities and user actions</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => auditLogsApi.exportLogs()}
            className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-primary text-white flex items-center gap-1"
          >
            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Export Logs</span>
          </button>
        </div>
      </div>
      
      <div className="surface rounded-lg shadow-themed-md p-3 sm:p-4 border border-themed/10 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search logs..."
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-3 py-2 border border-themed/20 rounded-lg surface text-sm"
            />
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
          </div>
          
          <div className="flex flex-wrap sm:flex-nowrap gap-2">
            <select
              className="py-2 px-3 border border-themed/20 rounded-lg surface text-sm"
              value={filters.actionType}
              onChange={(e) => handleFilterChange('actionType', e.target.value)}
            >
              <option value="all">All Actions</option>
              <option value="login">Login</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
            </select>
            
            <select
              className="py-2 px-3 border border-themed/20 rounded-lg surface text-sm"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="-timestamp">Newest First</option>
              <option value="timestamp">Oldest First</option>
            </select>
          </div>
        </div>
      </div>
      
      {visualizations && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
          <div className="surface rounded-lg shadow-themed-md p-4 border border-themed/10">
            <h3 className="text-base font-semibold text-themed mb-3">Activity Over Time</h3>
            <div className="h-48 sm:h-56">
              <Line data={activityChartData} options={chartOptions} />
            </div>
          </div>
          
          <div className="surface rounded-lg shadow-themed-md p-4 border border-themed/10">
            <h3 className="text-base font-semibold text-themed mb-3">Actions by Type</h3>
            <div className="h-48 sm:h-56">
              <Pie data={distributionChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      )}
      
      <div className="surface rounded-lg shadow-themed-md border border-themed/10 overflow-hidden mb-4 sm:mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-themed/5">
                <th className="px-3 py-3 sm:px-4 sm:py-4 text-left text-xs font-medium text-muted uppercase">Timestamp</th>
                <th className="px-3 py-3 sm:px-4 sm:py-4 text-left text-xs font-medium text-muted uppercase">User</th>
                <th className="px-3 py-3 sm:px-4 sm:py-4 text-left text-xs font-medium text-muted uppercase">Action</th>
                <th className="px-3 py-3 sm:px-4 sm:py-4 text-left text-xs font-medium text-muted uppercase">Resource</th>
                <th className="px-3 py-3 sm:px-4 sm:py-4 text-left text-xs font-medium text-muted uppercase hidden md:table-cell">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-themed/10">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-themed/5 transition-colors">
                  <td className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm text-themed whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm text-muted">
                    {log.user_email || 'System'}
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm font-medium">
                    <span className={`px-2 py-1 rounded-full text-[10px] ${
                      log.action === 'DELETE' ? 'bg-red-100 text-red-800' :
                      log.action === 'CREATE' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm text-muted">
                    {log.resource_type}
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm text-muted hidden md:table-cell truncate max-w-xs">
                    {JSON.stringify(log.details)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="py-3 px-4 flex items-center justify-between border-t border-themed/10">
          <div className="text-xs text-muted">
            Total {pagination.totalRecords} records
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="p-1 rounded border border-themed/20 disabled:opacity-50"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm px-2">Page {pagination.currentPage} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === totalPages}
              className="p-1 rounded border border-themed/20 disabled:opacity-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuditLogs
