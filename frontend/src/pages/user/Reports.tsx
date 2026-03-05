import { useState, useEffect, useCallback } from 'react'
import { reportsApi } from '../../services/api/user/reports'
import type { GeneratedReport, ReportTemplate } from '../../services/api/user/reports'
import { Calendar, FileText, Filter, Download, Clock, Loader2, Plus } from 'lucide-react'

const Reports = () => {
  const [activeTab, setActiveTab] = useState('recent')
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [recentReports, setRecentReports] = useState<GeneratedReport[]>([])
  const [scheduledReports, setScheduledReports] = useState<GeneratedReport[]>([])
  const [templates, setTemplates] = useState<ReportTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTableScrollable, setIsTableScrollable] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Show scroll hint if on mobile and there are reports
    setIsTableScrollable(recentReports.length > 0);
  }, [recentReports]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const [recentRes, scheduledRes, templatesRes] = await Promise.all([
        reportsApi.getRecentReports(),
        reportsApi.getScheduledReports(),
        reportsApi.getTemplates()
      ])
      
      // Ensure we have arrays even if API returns something else
      setRecentReports(Array.isArray(recentRes.data) ? recentRes.data : [])
      setScheduledReports(Array.isArray(scheduledRes.data) ? scheduledRes.data : [])
      setTemplates(Array.isArray(templatesRes.data) ? templatesRes.data : [])
      
      setError(null)
    } catch (err: any) {
      console.error('Error fetching reports data:', err)
      setError(err.message || 'Failed to load reports data.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleTemplateSelect = (templateId: number) => {
    setSelectedTemplate(templateId === selectedTemplate ? null : templateId)
  }

  const handleGenerateReport = async (template: ReportTemplate) => {
    try {
      setGenerating(true)
      await reportsApi.generateReport({
        name: `${template.name} - ${new Date().toLocaleDateString()}`,
        report_type: template.category,
        template: template.id,
        parameters: {}
      })
      // Refresh reports list
      const recentRes = await reportsApi.getRecentReports()
      setRecentReports(recentRes.data)
      setActiveTab('recent')
    } catch (err) {
      console.error('Error generating report:', err)
      alert('Failed to generate report.')
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-muted">Loading reports...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-themed mb-4 sm:mb-6">Reports</h1>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700/50 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 backdrop-blur-sm">
          <p className="font-medium">Error loading reports</p>
          <p className="text-sm opacity-90">{error}</p>
          <button 
            onClick={() => fetchData()}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}
      
      {/* Tabs for navigation - horizontally scrollable on mobile */}
      <div className="mb-6 border-b border-themed/10 overflow-x-auto pb-1">
        <div className="flex space-x-6 min-w-max">
          <button
            onClick={() => setActiveTab('recent')}
            className={`pb-3 px-1 relative ${
              activeTab === 'recent'
                ? 'text-primary border-b-2 border-primary font-medium'
                : 'text-muted hover:text-themed'
            }`}
          >
            <div className="flex items-center">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              <span className="text-sm sm:text-base">Recent Reports</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('scheduled')}
            className={`pb-3 px-1 relative ${
              activeTab === 'scheduled'
                ? 'text-primary border-b-2 border-primary font-medium'
                : 'text-muted hover:text-themed'
            }`}
          >
            <div className="flex items-center">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              <span className="text-sm sm:text-base">Scheduled Reports</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`pb-3 px-1 relative ${
              activeTab === 'templates'
                ? 'text-primary border-b-2 border-primary font-medium'
                : 'text-muted hover:text-themed'
            }`}
          >
            <div className="flex items-center">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              <span className="text-sm sm:text-base">Report Templates</span>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Reports Tab */}
      {activeTab === 'recent' && (
        <div className="space-y-6">
          {/* Search and filter controls - stack on mobile, horizontal on desktop */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search reports..."
                className="w-full pl-9 pr-3 py-2 border border-themed/20 rounded-lg surface text-sm"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-2">
              {/* Filter buttons - wrap on smaller screens */}
              <select className="px-3 py-2 border border-themed/20 rounded-lg surface text-sm">
                <option>All Types</option>
                <option>Financial</option>
                <option>Analytics</option>
                <option>Performance</option>
                <option>Research</option>
              </select>
              <select className="px-3 py-2 border border-themed/20 rounded-lg surface text-sm">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
          </div>
          
          {/* Report table with horizontal scroll for mobile */}
          <div className="surface rounded-xl shadow-themed-md border border-themed/10 overflow-hidden">
            <div className="report-table-container overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-themed/5">
                    <th className="px-3 py-3 sm:px-4 sm:py-4 text-left text-xs sm:text-sm font-medium text-muted">Report Name</th>
                    <th className="px-3 py-3 sm:px-4 sm:py-4 text-left text-xs sm:text-sm font-medium text-muted">Date</th>
                    <th className="px-3 py-3 sm:px-4 sm:py-4 text-left text-xs sm:text-sm font-medium text-muted">Type</th>
                    <th className="px-3 py-3 sm:px-4 sm:py-4 text-left text-xs sm:text-sm font-medium text-muted">Status</th>
                    <th className="px-3 py-3 sm:px-4 sm:py-4 text-right text-xs sm:text-sm font-medium text-muted">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-themed/10">
                  {recentReports.length > 0 ? (
                    recentReports.map((report) => (
                      <tr key={report.id} className="hover:bg-themed/5 transition-colors">
                        <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2 flex-shrink-0" />
                            <span className="font-medium text-themed text-sm sm:text-base">{report.name}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-muted">
                          {new Date(report.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {report.report_type}
                          </span>
                        </td>
                        <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${
                            report.status === 'COMPLETED' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                          }`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-3 py-3 sm:px-4 sm:py-4 text-right space-x-2 whitespace-nowrap">
                          <button className="inline-flex items-center px-2 py-1 border border-themed/20 rounded text-[10px] sm:text-xs font-medium text-themed hover:bg-themed/5">
                            View
                          </button>
                          {report.file_path && (
                            <button className="inline-flex items-center px-2 py-1 border border-themed/20 rounded text-[10px] sm:text-xs font-medium text-themed hover:bg-themed/5">
                              <Download className="h-3 w-3 mr-1" />
                              <span className="hidden sm:inline">Download</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-10 text-center text-muted">
                        No recent reports found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Show hint if table is scrollable on mobile */}
            {isTableScrollable && isMobile && (
              <div className="text-center py-2 text-[10px] text-muted bg-themed/5 border-t border-themed/10">
                <span className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Swipe to see more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            )}

            {/* Pagination - simplified for mobile */}
            <div className="py-3 flex items-center justify-between border-t border-themed/10 px-4">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-muted">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{" "}
                    <span className="font-medium">12</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-themed/20 bg-surface text-sm font-medium text-muted hover:bg-themed/5">
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-themed/20 bg-surface text-sm font-medium text-muted hover:bg-themed/5"> 1 </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-themed/20 bg-primary text-sm font-medium text-white"> 2 </a>
                    <a href="#" className="relative inline-flex items-center px-4 py-2 border border-themed/20 bg-surface text-sm font-medium text-muted hover:bg-themed/5"> 3 </a>
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-themed/20 bg-surface text-sm font-medium text-muted hover:bg-themed/5">
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
              
              {/* Simplified mobile pagination */}
              <div className="flex justify-between w-full sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-themed/20 text-sm font-medium rounded-md text-muted bg-surface hover:bg-themed/5">
                  Previous
                </button>
                <span className="text-sm text-muted">Page 2 of 3</span>
                <button className="relative inline-flex items-center px-4 py-2 border border-themed/20 text-sm font-medium rounded-md text-muted bg-surface hover:bg-themed/5">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Scheduled Reports Tab */}
      {activeTab === 'scheduled' && (
        <div className="space-y-6">
          {/* Header with add button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search scheduled reports..."
                className="w-full pl-9 pr-3 py-2 border border-themed/20 rounded-lg surface text-sm"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 whitespace-nowrap">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Schedule Report
            </button>
          </div>
          
          {/* Scheduled Reports Grid - responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {scheduledReports.length > 0 ? (
              scheduledReports.map((report) => (
                <div key={report.id} className="surface rounded-xl shadow-themed-md p-4 border border-themed/10 hover:shadow-themed-lg transition-all duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-themed text-base line-clamp-1" title={report.name}>
                      {report.name}
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {report.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-muted text-xs mb-3">
                    <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                    {report.scheduled_for ? new Date(report.scheduled_for).toLocaleString() : 'Not scheduled'}
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      {report.report_type}
                    </span>
                  </div>
                  
                  <div className="border-t border-themed/10 pt-3 flex justify-between">
                    <button className="text-xs text-primary hover:text-primary/80">
                      Edit
                    </button>
                    <button className="text-xs text-red-600 hover:text-red-500">
                      Cancel
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-muted border border-dashed border-themed/20 rounded-xl">
                No scheduled reports found.
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          {/* Templates List - accordion style for mobile */}
          <div className="space-y-4">
            {templates.length > 0 ? (
              templates.map((template) => (
                <div 
                  key={template.id}
                  className={`surface rounded-xl shadow-themed-sm border border-themed/10 transition-all duration-300 ${
                    selectedTemplate === template.id ? 'shadow-themed-md' : 'hover:shadow-themed'
                  }`}
                >
                  <div 
                    className="p-4 cursor-pointer"
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="rounded-lg w-8 h-8 flex items-center justify-center bg-primary/10 text-primary mr-3 flex-shrink-0">
                          <FileText className="h-4 w-4" />
                        </div>
                        <h3 className="font-medium text-themed">{template.name}</h3>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-muted mr-3 hidden sm:block">{template.category}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-muted transition-transform ${selectedTemplate === template.id ? 'transform rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expandable content */}
                  {selectedTemplate === template.id && (
                    <div className="px-4 pb-4 border-t border-themed/10 pt-3 -mt-1">
                      <p className="text-sm text-muted mb-4">{template.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        <button 
                          disabled={generating}
                          onClick={() => handleGenerateReport(template)}
                          className="inline-flex items-center px-3 py-1.5 border border-primary rounded-md text-xs font-medium text-primary hover:bg-primary/5 disabled:opacity-50"
                        >
                          {generating ? (
                            <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
                          ) : (
                            <Plus className="h-3.5 w-3.5 mr-1" />
                          )}
                          Generate Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-20 text-center text-muted border border-dashed border-themed/20 rounded-xl">
                No report templates found.
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Generate Report CTA */}
      <div className="mt-8 surface rounded-xl shadow-themed-md p-4 sm:p-6 border border-themed/10">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="mb-4 sm:mb-0 sm:mr-6 flex-1">
            <h3 className="text-lg font-semibold text-themed mb-2">Generate Custom Report</h3>
            <p className="text-muted text-sm">Need a specialized report? Create a custom report tailored to your specific requirements.</p>
          </div>
          <button className="w-full sm:w-auto px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm font-medium transition-colors flex items-center justify-center">
            <FileText className="h-4 w-4 mr-2" />
            Create Custom Report
          </button>
        </div>
      </div>
    </div>
  )
}

export default Reports