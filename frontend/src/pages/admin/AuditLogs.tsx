import React, { useState, useEffect } from 'react'
import { adminAuditLogs } from '../../utils/admin/admin'
import { Search, Download, Filter, Calendar, ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react'
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
  const [filters, setFilters] = useState({
    search: '',
    dateRange: adminAuditLogs.filters.dateRange,
    actionType: 'all',
    severity: 'all',
    sortBy: 'timestamp_desc'
  });
  const [pagination, setPagination] = useState({
    currentPage: adminAuditLogs.pagination.currentPage,
    pageSize: adminAuditLogs.pagination.pageSize,
    totalRecords: adminAuditLogs.pagination.totalRecords
  });
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('Last 7 days');

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check if dark mode is enabled
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    // Initial checks
    checkMobile();
    checkDarkMode();
    
    // Create MutationObserver to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });
    
    // Start observing
    observer.observe(document.documentElement, { attributes: true });
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
    setPagination(prev => ({
      ...prev,
      currentPage: 1
    }));
  };

  // Handle filter changes
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setPagination(prev => ({
      ...prev,
      currentPage: 1
    }));
  };

  // Handle date preset selection
  const handleDatePresetSelect = (preset: string) => {
    setSelectedPreset(preset);
    setIsDatePickerOpen(false);
    
    // Set date range based on preset
    // This would normally calculate the actual date range
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        start: preset === 'Last 24 hours' ? '2023-10-17' : 
               preset === 'Last 7 days' ? '2023-10-11' :
               preset === 'Last 30 days' ? '2023-09-18' :
               preset === 'Last quarter' ? '2023-07-01' :
               preset === 'Year to date' ? '2023-01-01' :
               prev.dateRange.start,
        end: '2023-10-18'
      }
    }));
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }));
  };

  // Handle page size change
  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPagination(prev => ({
      ...prev,
      pageSize: parseInt(e.target.value),
      currentPage: 1
    }));
  };

  // Handle select all logs
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedLogs(adminAuditLogs.table.data.map((_: any, i: number) => i.toString()));
    } else {
      setSelectedLogs([]);
    }
  };

  // Handle single log selection
  const handleSelectLog = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      setSelectedLogs(prev => [...prev, id]);
    } else {
      setSelectedLogs(prev => prev.filter(logId => logId !== id));
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(pagination.totalRecords / pagination.pageSize);

  // Filter logs based on current filters
  const filteredLogs = adminAuditLogs.table.data.filter(log => {
    // Search filter
    if (filters.search && 
        !(log.action.toLowerCase().includes(filters.search.toLowerCase()) || 
          log.user.toLowerCase().includes(filters.search.toLowerCase()) || 
          log.details.toLowerCase().includes(filters.search.toLowerCase()))) {
      return false;
    }
    
    // Action type filter
    if (filters.actionType !== 'all') {
      if (!log.action.toLowerCase().includes(filters.actionType.toLowerCase())) {
        return false;
      }
    }
    
    // Severity filter
    if (filters.severity !== 'all' && log.severity !== filters.severity) {
      return false;
    }
    
    return true;
  });

  // Sort logs
  const sortedLogs = [...filteredLogs].sort((a, b) => {
    const [field, direction] = filters.sortBy.split('_');
    
    if (field === 'timestamp') {
      return direction === 'asc' 
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    
    if (field === 'severity') {
      const severityOrder = { 'info': 0, 'warning': 1, 'error': 2, 'critical': 3 };
      return direction === 'asc'
        ? severityOrder[a.severity as keyof typeof severityOrder] - severityOrder[b.severity as keyof typeof severityOrder]
        : severityOrder[b.severity as keyof typeof severityOrder] - severityOrder[a.severity as keyof typeof severityOrder];
    }
    
    // Fixed string comparison by checking if the values are strings
    return direction === 'asc'
      ? String(a[field as keyof typeof a]).localeCompare(String(b[field as keyof typeof b]))
      : String(b[field as keyof typeof b]).localeCompare(String(a[field as keyof typeof a]));
  });

  // Paginate logs
  const paginatedLogs = sortedLogs.slice(
    (pagination.currentPage - 1) * pagination.pageSize,
    pagination.currentPage * pagination.pageSize
  );

  // Chart options with theme awareness
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: !isMobile,
        position: 'top' as const,
        labels: {
          color: isDarkMode ? '#CBD5E1' : '#1F2937',
          font: { 
            family: 'Inter, sans-serif',
            size: isMobile ? 10 : 12 
          }
        }
      },
      tooltip: {
        bodyFont: {
          size: isMobile ? 10 : 12
        },
        titleFont: {
          size: isMobile ? 12 : 14
        }
      }
    }
  };

  const pieOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        ...chartOptions.plugins.legend,
        position: isMobile ? 'bottom' as const : 'right' as const,
      }
    }
  };

  // Mock data for charts (would come from the API in a real app)
  const activityChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Events',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: '#3B82F6',
        tension: 0.4
      }
    ]
  };

  const distributionChartData = {
    labels: ['Login', 'Logout', 'Create User', 'Update Settings', 'Failed Login'],
    datasets: [
      {
        data: [30, 25, 15, 20, 10],
        backgroundColor: [
          '#3B82F6', '#10B981', '#F59E0B', '#6366F1', '#EF4444'
        ]
      }
    ]
  };

  // Get severity badge color
  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'info':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'critical':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  return (
    <div className="w-full max-w-full px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-themed">{adminAuditLogs.title}</h1>
          <p className="text-sm text-muted mt-1">{adminAuditLogs.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-primary text-white flex items-center gap-1"
            disabled={selectedLogs.length === 0}
          >
            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Export Selected</span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border border-themed/20 text-themed hover:bg-themed/5 flex items-center gap-1"
            >
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>{selectedPreset}</span>
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
            </button>
            
            {isDatePickerOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                <div className="p-2">
                  {adminAuditLogs.filters.dateRange.presets.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDatePresetSelect(preset)}
                      className="w-full text-left px-3 py-1.5 text-xs sm:text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Filters section */}
      <div className="surface rounded-lg shadow-themed-md p-3 sm:p-4 border border-themed/10 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search logs by user, action, details..."
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-3 py-2 border border-themed/20 rounded-lg surface text-sm"
            />
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" />
          </div>
          
          {/* Filter dropdowns */}
          <div className="flex flex-wrap sm:flex-nowrap gap-2">
            <div className="flex items-center gap-1 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-muted flex-shrink-0" />
              <select
                className="py-2 pl-1 pr-7 border border-themed/20 rounded-lg surface text-sm flex-grow"
                value={filters.actionType}
                onChange={(e) => handleFilterChange('actionType', e.target.value)}
              >
                <option value="all">All Actions</option>
                <option value="login">Login</option>
                <option value="logout">Logout</option>
                <option value="create">Create</option>
                <option value="update">Update</option>
                <option value="delete">Delete</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            
            <select
              className="py-2 px-3 border border-themed/20 rounded-lg surface text-sm w-full sm:w-auto"
              value={filters.severity}
              onChange={(e) => handleFilterChange('severity', e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Visualizations section - Show on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6 hidden sm:grid">
        <div className="surface rounded-lg shadow-themed-md p-4 border border-themed/10">
          <h3 className="text-base font-semibold text-themed mb-3">Activity Over Time</h3>
          <div className="h-48 sm:h-56">
            <Line data={activityChartData} options={chartOptions} />
          </div>
        </div>
        
        <div className="surface rounded-lg shadow-themed-md p-4 border border-themed/10">
          <h3 className="text-base font-semibold text-themed mb-3">Actions by Type</h3>
          <div className="h-48 sm:h-56">
            <Pie data={distributionChartData} options={pieOptions} />
          </div>
        </div>
      </div>
      
      {/* Logs table */}
      <div className="surface rounded-lg shadow-themed-md border border-themed/10 overflow-hidden mb-4 sm:mb-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-themed/5">
                <th className="px-3 py-3 sm:px-4 sm:py-4 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded text-primary focus:ring-primary"
                      checked={selectedLogs.length === paginatedLogs.length && paginatedLogs.length > 0}
                      onChange={handleSelectAll}
                    />
                  </div>
                </th>
                {adminAuditLogs.table.columns.map((column, idx) => {
                  // Skip certain columns on mobile
                  if (isMobile && (column.key === 'ipAddress' || column.key === 'details')) {
                    return null;
                  }
                  
                  return (
                    <th 
                      key={idx}
                      className={`px-3 py-3 sm:px-4 sm:py-4 text-left text-xs font-medium text-muted ${
                        column.key === 'actions' ? 'text-right' : ''
                      }`}
                      onClick={() => {
                        if (column.sortable) {
                          const currentSort = filters.sortBy;
                          const [currentField, currentDirection] = currentSort.split('_');
                          
                          const newDirection = currentField === column.key && currentDirection === 'asc' ? 'desc' : 'asc';
                          handleFilterChange('sortBy', `${column.key}_${newDirection}`);
                        }
                      }}
                      style={{ cursor: column.sortable ? 'pointer' : 'default' }}
                    >
                      <div className="flex items-center">
                        <span>{column.header}</span>
                        {column.sortable && (
                          <div className="flex flex-col ml-1">
                            <ChevronUp 
                              className={`h-2 w-2 ${
                                filters.sortBy === `${column.key}_asc` ? 'text-primary' : 'text-muted opacity-30'
                              }`}
                            />
                            <ChevronDown 
                              className={`h-2 w-2 ${
                                filters.sortBy === `${column.key}_desc` ? 'text-primary' : 'text-muted opacity-30'
                              }`}
                            />
                          </div>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-themed/10">
              {paginatedLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-themed/5 transition-colors">
                  <td className="px-3 py-3 sm:px-4 sm:py-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded text-primary focus:ring-primary"
                      checked={selectedLogs.includes(idx.toString())}
                      onChange={(e) => handleSelectLog(e, idx.toString())}
                    />
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm text-themed whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm text-muted whitespace-nowrap">
                    {log.user}
                  </td>
                  {!isMobile && (
                    <td className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm text-muted whitespace-nowrap">
                      {log.ipAddress}
                    </td>
                  )}
                  <td className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm text-themed whitespace-nowrap">
                    {log.action}
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${getSeverityBadgeColor(log.severity)}`}>
                      {log.severity}
                    </span>
                  </td>
                  {!isMobile && (
                    <td className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm text-muted max-w-[200px] truncate">
                      {log.details}
                    </td>
                  )}
                  <td className="px-3 py-3 sm:px-4 sm:py-4 text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                      <button 
                        className="p-1 text-muted hover:text-primary transition-colors"
                        title="View details"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button 
                        className="p-1 text-muted hover:text-primary transition-colors"
                        title="Export"
                      >
                        <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {paginatedLogs.length === 0 && (
                <tr>
                  <td 
                    colSpan={isMobile ? 5 : 8}
                    className="px-3 py-6 sm:px-4 sm:py-8 text-center text-muted"
                  >
                    No logs found matching your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="py-3 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-themed/10">
          <div className="flex items-center mb-4 sm:mb-0">
            <span className="text-xs text-muted">Show</span>
            <select
              className="mx-2 border border-themed/20 rounded-lg surface text-sm py-1 px-2"
              value={pagination.pageSize}
              onChange={handlePageSizeChange}
            >
              {adminAuditLogs.pagination.pageSizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
            <span className="text-xs text-muted">entries</span>
          </div>
          
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto">
            <div className="sm:mr-4 text-xs text-muted">
              Showing {((pagination.currentPage - 1) * pagination.pageSize) + 1} to {Math.min(pagination.currentPage * pagination.pageSize, filteredLogs.length)} of {filteredLogs.length}
            </div>
            
            <div className="flex items-center">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className={`p-1 rounded-md ${
                  pagination.currentPage === 1 
                    ? 'text-muted/50 cursor-not-allowed' 
                    : 'text-muted hover:text-primary hover:bg-themed/5'
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              {!isMobile && Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (pagination.currentPage <= 3) {
                  pageNum = i + 1;
                } else if (pagination.currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = pagination.currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 mx-0.5 flex items-center justify-center rounded-md text-xs font-medium ${
                      pagination.currentPage === pageNum
                        ? 'bg-primary text-white'
                        : 'text-muted hover:bg-themed/5 hover:text-primary'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === totalPages}
                className={`p-1 rounded-md ${
                  pagination.currentPage === totalPages 
                    ? 'text-muted/50 cursor-not-allowed' 
                    : 'text-muted hover:text-primary hover:bg-themed/5'
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Export options */}
      <div className="surface rounded-lg shadow-themed-md p-4 border border-themed/10">
        <h3 className="text-base font-semibold text-themed mb-3">Export Options</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="col-span-1 sm:col-span-2">
            <div className="mb-3">
              <label className="block text-xs font-medium text-muted mb-1">Select Fields</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {adminAuditLogs.export.includedFields.map((field, idx) => (
                  <label key={idx} className="flex items-center text-xs text-themed">
                    <input
                      type="checkbox"
                      checked={true}
                      onChange={() => {}}
                      className="h-3.5 w-3.5 rounded text-primary focus:ring-primary mr-1.5"
                    />
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-medium text-muted mb-1">Format</label>
            <div className="grid grid-cols-2 gap-2">
              {adminAuditLogs.export.formats.map((format, idx) => (
                <label key={idx} className="flex items-center text-xs text-themed">
                  <input
                    type="radio"
                    name="exportFormat"
                    value={format}
                    checked={format === 'CSV'}
                    onChange={() => {}}
                    className="h-3.5 w-3.5 text-primary focus:ring-primary mr-1.5"
                  />
                  {format}
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-3 text-right">
          <button className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
            Generate Export
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuditLogs