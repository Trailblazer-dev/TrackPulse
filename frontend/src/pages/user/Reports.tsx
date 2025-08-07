import  { useState, useEffect } from 'react'
import { reports } from '../../utils/user/user'
import { Calendar, FileText, Filter, Download, Clock } from 'lucide-react'

const Reports = () => {
  const [activeTab, setActiveTab] = useState('recent')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isTableScrollable, setIsTableScrollable] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Check if table needs horizontal scrolling
    const checkTableWidth = () => {
      const tables = document.querySelectorAll('.report-table-container')
      tables.forEach(table => {
        const container = table as HTMLElement
        const content = container.querySelector('table') as HTMLElement
        if (content && container.clientWidth < content.clientWidth) {
          setIsTableScrollable(true)
        } else {
          setIsTableScrollable(false)
        }
      })
    }
    
    // Initial checks
    checkMobile()
    
    // Set resize listener
    window.addEventListener('resize', () => {
      checkMobile()
      setTimeout(checkTableWidth, 100) // Delay to ensure DOM is updated
    })
    
    // Run table width check after component mounts
    setTimeout(checkTableWidth, 200)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const handleTemplateSelect = (templateName: string) => {
    setSelectedTemplate(templateName === selectedTemplate ? null : templateName)
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-themed mb-4 sm:mb-6">Reports</h1>
      
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
                  {reports.recentReports.reports.map((report, idx) => (
                    <tr key={idx} className="hover:bg-themed/5 transition-colors">
                      <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary mr-2 flex-shrink-0" />
                          <span className="font-medium text-themed text-sm sm:text-base">{report.name}</span>
                        </div>
                      </td>
                      <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-muted">{report.date}</td>
                      <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                          {report.type}
                        </span>
                      </td>
                      <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          {report.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 sm:px-4 sm:py-4 text-right space-x-2 whitespace-nowrap">
                        <button className="inline-flex items-center px-2 py-1 border border-themed/20 rounded text-[10px] sm:text-xs font-medium text-themed hover:bg-themed/5">
                          View
                        </button>
                        <button className="inline-flex items-center px-2 py-1 border border-themed/20 rounded text-[10px] sm:text-xs font-medium text-themed hover:bg-themed/5">
                          <Download className="h-3 w-3 mr-1" />
                          <span className="hidden sm:inline">Download</span>
                        </button>
                      </td>
                    </tr>
                  ))}
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
            {reports.scheduledReports.reports.map((report, idx) => (
              <div key={idx} className="surface rounded-xl shadow-themed-md p-4 border border-themed/10 hover:shadow-themed-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-themed text-base line-clamp-1" title={report.name}>
                    {report.name}
                  </h3>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    report.status === 'Scheduled' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                  }`}>
                    {report.status}
                  </span>
                </div>
                
                <div className="flex items-center text-muted text-xs mb-3">
                  <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                  {report.date}
                </div>
                
                <div className="flex items-center mb-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                    {report.type}
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
            ))}
          </div>
        </div>
      )}
      
      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button className="px-3 py-1.5 text-sm font-medium rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              All
            </button>
            <button className="px-3 py-1.5 text-sm font-medium rounded-lg bg-themed/5 text-muted hover:bg-themed/10">
              Financial
            </button>
            <button className="px-3 py-1.5 text-sm font-medium rounded-lg bg-themed/5 text-muted hover:bg-themed/10">
              Analytics
            </button>
            <button className="px-3 py-1.5 text-sm font-medium rounded-lg bg-themed/5 text-muted hover:bg-themed/10">
              Performance
            </button>
          </div>
          
          {/* Templates List - accordion style for mobile */}
          <div className="space-y-4">
            {reports.reportTemplates.templates.map((template, idx) => (
              <div 
                key={idx}
                className={`surface rounded-xl shadow-themed-sm border border-themed/10 transition-all duration-300 ${
                  selectedTemplate === template.name ? 'shadow-themed-md' : 'hover:shadow-themed'
                }`}
              >
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => handleTemplateSelect(template.name)}
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
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-muted transition-transform ${selectedTemplate === template.name ? 'transform rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Mobile-only category badge */}
                  <div className="mt-2 sm:hidden">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      {template.category}
                    </span>
                  </div>
                </div>
                
                {/* Expandable content */}
                {selectedTemplate === template.name && (
                  <div className="px-4 pb-4 border-t border-themed/10 pt-3 -mt-1">
                    <p className="text-sm text-muted mb-4">{template.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      <button className="inline-flex items-center px-3 py-1.5 border border-primary rounded-md text-xs font-medium text-primary hover:bg-primary/5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Create Report
                      </button>
                      <button className="inline-flex items-center px-3 py-1.5 border border-themed/20 rounded-md text-xs font-medium text-themed hover:bg-themed/5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.6 13.4A7 7 0 1 0 2 10a7 7 0 0 0 11.6 3.4L18 18l-1 1-3.4-3.4a7 7 0 0 0 0-2.2zM12 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0z" />
                        </svg>
                        Preview
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
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