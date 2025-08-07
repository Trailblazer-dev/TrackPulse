import React, { useState, useEffect } from 'react'
import { adminReportBuilder } from '../../utils/admin/admin'
import { 
  FileText, 
  Calendar, 
  Users, 
  Download, 
  Save, 
  Clock, 
  Mail, 
  ChevronDown,
  Plus,
  Trash2,
  Edit,
  Copy,
  PlayCircle
} from 'lucide-react'

const ReportBuilder = () => {
  const [reportType, setReportType] = useState(adminReportBuilder.reportTypes[0].value)
  const [dateRange, setDateRange] = useState({
    start: adminReportBuilder.filters.dateRange.start,
    end: adminReportBuilder.filters.dateRange.end
  })
  const [selectedPreset, setSelectedPreset] = useState('Last 30 days')
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState(adminReportBuilder.settings.format.default)
  const [includeCharts, setIncludeCharts] = useState(adminReportBuilder.settings.visualization.includeCharts)
  const [scheduleReport, setScheduleReport] = useState(adminReportBuilder.settings.scheduling.enabled)
  const [frequency, setFrequency] = useState(adminReportBuilder.settings.scheduling.frequency)
  const [isMobile, setIsMobile] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('builder')
  const [reportName, setReportName] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [filterValue, setFilterValue] = useState('') // Add this new state for the filter value

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Check if dark mode is enabled
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }
    
    // Initial checks
    checkMobile()
    checkDarkMode()
    
    // Create MutationObserver to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode()
        }
      })
    })
    
    // Start observing
    observer.observe(document.documentElement, { attributes: true })
    
    // Add resize listener
    window.addEventListener('resize', checkMobile)
    
    // Clean up
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Handle date preset selection
  const handleDatePresetSelect = (preset: string) => {
    setSelectedPreset(preset)
    setIsDatePickerOpen(false)
    
    // Set date range based on preset
    const now = new Date()
    let startDate = new Date()
    
    switch(preset) {
      case 'Last 7 days':
        startDate.setDate(now.getDate() - 7)
        break
      case 'Last 30 days':
        startDate.setDate(now.getDate() - 30)
        break
      case 'Last quarter':
        startDate.setMonth(now.getMonth() - 3)
        break
      case 'Year to date':
        startDate = new Date(now.getFullYear(), 0, 1) // January 1st of current year
        break
      default:
        startDate.setDate(now.getDate() - 30)
    }
    
    setDateRange({
      start: startDate.toISOString().split('T')[0],
      end: now.toISOString().split('T')[0]
    })
  }

  // Generate report handler
  const handleGenerateReport = () => {
    if (!reportName) {
      alert('Please enter a report name')
      return
    }
    
    setIsGenerating(true)
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false)
      setShowPreview(true)
    }, 1500)
  }

  // Get icon based on report type
  const getReportTypeIcon = (type: string) => {
    switch(type) {
      case 'user_activity':
        return <Users className="h-5 w-5" />
      case 'system_performance':
        return <FileText className="h-5 w-5" />
      case 'error_rates':
        return <FileText className="h-5 w-5" />
      case 'api_usage':
        return <FileText className="h-5 w-5" />
      case 'audit_logs':
        return <FileText className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <div className="w-full max-w-full px-2 sm:px-4 py-4 sm:py-8 overflow-hidden">
      {/* Responsive header section with better mobile layout */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-themed truncate">{adminReportBuilder.title}</h1>
          <p className="text-sm text-muted mt-1">{adminReportBuilder.description}</p>
        </div>
        
        {/* Full-width buttons on mobile, inline on desktop */}
        <div className="flex gap-2 w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('builder')}
            className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors flex-1 md:flex-auto ${
              activeTab === 'builder'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            Report Builder
          </button>
          <button 
            onClick={() => setActiveTab('saved')}
            className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors flex-1 md:flex-auto ${
              activeTab === 'saved'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            Saved Reports
          </button>
        </div>
      </div>
      
      {activeTab === 'builder' && (
        <>
          {!showPreview ? (
            <div className="grid grid-cols-1 gap-6 overflow-x-hidden">
              {/* Report Configuration Section */}
              <div className="surface rounded-lg shadow-themed-md p-4 sm:p-5 border border-themed/10">
                <h3 className="text-lg font-semibold text-themed mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  Report Configuration
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">Report Name</label>
                    <input
                      type="text"
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                      placeholder="Enter report name..."
                      className="w-full p-2 border border-themed/20 rounded-lg surface text-sm max-w-full"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">Report Type</label>
                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                      {adminReportBuilder.reportTypes.map((type, idx) => (
                        <button
                          key={idx}
                          onClick={() => setReportType(type.value)}
                          className={`p-2 sm:p-3 border rounded-lg flex flex-col items-center justify-center transition-all ${
                            reportType === type.value
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                              : 'border-themed/10 hover:border-themed/30 hover:bg-themed/5'
                          }`}
                        >
                          {getReportTypeIcon(type.value)}
                          <span className="mt-1 text-xs sm:text-sm text-center">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Date Range Selection - Fixed the container width issue */}
                  <div className="pt-2 border-t border-themed/10">
                    <label className="block text-sm font-medium text-muted mb-1">Date Range</label>
                    <div className="relative w-full">
                      <button 
                        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                        className="w-full p-2 border border-themed/20 rounded-lg surface text-sm flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <Calendar className="h-4 w-4 text-muted flex-shrink-0" />
                          <span className="truncate">{selectedPreset}</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-muted flex-shrink-0" />
                      </button>
                      
                      {isDatePickerOpen && (
                        <div className="absolute left-0 mt-1 w-full max-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                          <div className="p-2 space-y-1">
                            {adminReportBuilder.filters.dateRange.presets.map((preset, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleDatePresetSelect(preset)}
                                className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                {preset}
                              </button>
                            ))}
                            <hr className="my-1 border-gray-200 dark:border-gray-700" />
                            <div className="p-3 space-y-2">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-xs text-muted mb-1">Start Date</label>
                                  <input
                                    type="date"
                                    value={dateRange.start}
                                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                                    className="w-full p-1.5 border border-themed/20 rounded-md surface text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs text-muted mb-1">End Date</label>
                                  <input
                                    type="date"
                                    value={dateRange.end}
                                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                                    className="w-full p-1.5 border border-themed/20 rounded-md surface text-sm"
                                  />
                                </div>
                              </div>
                              <button
                                onClick={() => setIsDatePickerOpen(false)}
                                className="w-full px-3 py-1.5 mt-1 bg-blue-600 text-white rounded-md text-sm"
                              >
                                Apply Custom Range
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Advanced filters section - Fixed mobile layout overflow issues */}
              <div className="surface rounded-lg shadow-themed-md p-4 sm:p-5 border border-themed/10 overflow-hidden">
                <h3 className="text-lg font-semibold text-themed mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-500" />
                  Data Filters
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">User Status</label>
                    <select
                      value={adminReportBuilder.filters.status.default}
                      className="w-full p-2 border border-themed/20 rounded-lg surface text-sm"
                    >
                      {adminReportBuilder.filters.status.options.map((option, idx) => (
                        <option key={idx} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted">Include Inactive Users</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">Data Granularity</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button className="p-1.5 sm:p-2 border border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-xs sm:text-sm font-medium">Daily</button>
                      <button className="p-1.5 sm:p-2 border border-themed/10 hover:border-themed/30 hover:bg-themed/5 rounded-lg text-xs sm:text-sm font-medium">Weekly</button>
                      <button className="p-1.5 sm:p-2 border border-themed/10 hover:border-themed/30 hover:bg-themed/5 rounded-lg text-xs sm:text-sm font-medium">Monthly</button>
                    </div>
                  </div>
                  
                  {/* Improved mobile layout for advanced filters */}
                  <div className="pt-2 border-t border-themed/10">
                    <label className="block text-sm font-medium text-muted mb-2">Advanced Filters</label>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-2">
                        <select className="p-2 border border-themed/20 rounded-lg surface text-sm w-full">
                          <option>User Login Count</option>
                          <option>Session Duration</option>
                          <option>Page Views</option>
                        </select>
                        <div className="flex flex-wrap items-center gap-2">
                          <select className="p-2 border border-themed/20 rounded-lg surface text-sm min-w-[90px] flex-grow-0">
                            <option>Greater</option>
                            <option>Equal</option>
                            <option>Less</option>
                          </select>
                          <div className="flex-1 min-w-[120px]">
                            <input 
                              type="text" 
                              value={filterValue} 
                              onChange={(e) => setFilterValue(e.target.value)} 
                              className="p-2 border border-themed/20 rounded-lg surface text-sm w-full" 
                              placeholder="Value" 
                            />
                          </div>
                          <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg flex-shrink-0">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <button className="text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1 hover:underline mt-1">
                        <Plus className="h-3.5 w-3.5" /> Add Filter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Export settings section - Fixed overflow issues */}
              <div className="surface rounded-lg shadow-themed-md p-4 sm:p-5 border border-themed/10">
                <h3 className="text-lg font-semibold text-themed mb-4 flex items-center gap-2">
                  <Download className="h-5 w-5 text-purple-500" />
                  Export Options
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">Format</label>
                    <div className="grid grid-cols-2 gap-2">
                      {adminReportBuilder.settings.format.options.map((format, idx) => (
                        <button
                          key={idx}
                          onClick={() => setExportFormat(format.value)}
                          className={`p-1.5 sm:p-2 border rounded-lg text-xs sm:text-sm font-medium transition-all ${
                            exportFormat === format.value
                              ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                              : 'border-themed/10 hover:border-themed/30 hover:bg-themed/5'
                          }`}
                        >
                          {format.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted">Include Data Visualizations</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={includeCharts}
                          onChange={() => setIncludeCharts(!includeCharts)}
                          className="sr-only peer" 
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </label>
                  </div>
                  
                  {includeCharts && (
                    <div className="pl-3 sm:pl-4 border-l-2 border-purple-200 dark:border-purple-800">
                      <label className="block text-sm font-medium text-muted mb-1">Chart Types</label>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {adminReportBuilder.settings.visualization.chartTypes.map((chartType, idx) => (
                          <span key={idx} className="px-1.5 sm:px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-md text-[10px] sm:text-xs">{chartType}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Schedule Settings - Fixed mobile layout issues */}
              <div className="surface rounded-lg shadow-themed-md p-4 sm:p-5 border border-themed/10">
                <h3 className="text-lg font-semibold text-themed mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  Schedule & Delivery
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-muted">Schedule Recurring Report</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={scheduleReport}
                          onChange={() => setScheduleReport(!scheduleReport)}
                          className="sr-only peer" 
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </label>
                  </div>
                  
                  {scheduleReport && (
                    <div className="space-y-3 pl-3 sm:pl-4 border-l-2 border-amber-200 dark:border-amber-800">
                      <div>
                        <label className="block text-sm font-medium text-muted mb-1">Frequency</label>
                        <select
                          value={frequency}
                          onChange={(e) => setFrequency(e.target.value)}
                          className="w-full p-2 border border-themed/20 rounded-lg surface text-sm"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                      
                      {frequency === 'weekly' && (
                        <div>
                          <label className="block text-sm font-medium text-muted mb-1">Day of Week</label>
                          <select className="w-full p-2 border border-themed/20 rounded-lg surface text-sm">
                            <option>Monday</option>
                            <option>Tuesday</option>
                            <option>Wednesday</option>
                            <option>Thursday</option>
                            <option>Friday</option>
                            <option>Saturday</option>
                            <option>Sunday</option>
                          </select>
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium text-muted mb-1">Time</label>
                        <input
                          type="time"
                          defaultValue="08:00"
                          className="w-full p-2 border border-themed/20 rounded-lg surface text-sm"
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="pt-2 border-t border-themed/10">
                    <label className="block text-sm font-medium text-muted mb-1">Email Recipients</label>
                    <textarea
                      placeholder="Enter email addresses separated by commas"
                      rows={2}
                      className="w-full p-2 border border-themed/20 rounded-lg surface text-sm resize-y"
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4 mr-2" />
                      <span className="text-xs sm:text-sm text-muted">Also send to admins</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4 mr-2" />
                      <span className="text-xs sm:text-sm text-muted">Save to cloud storage</span>
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Generate Button - Improved mobile layout */}
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <button
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex-1 flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:hover:bg-blue-600"
                >
                  {isGenerating ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="truncate">Generating...</span>
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4 flex-shrink-0" />
                      <span className="truncate">Generate Report</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => {}}
                  className="px-4 py-2.5 border border-themed/20 text-themed hover:bg-themed/5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Save className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Save Template</span>
                </button>
              </div>
            </div>
          ) : (
            // Report Preview - Mobile friendly version
            <div className="space-y-6 overflow-x-hidden">
              <div className="surface rounded-lg shadow-themed-md p-3 sm:p-5 border border-themed/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
                  <h3 className="text-xl font-semibold text-themed flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <span className="truncate">Report Preview: {reportName}</span>
                  </h3>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowPreview(false)}
                      className="px-3 py-1.5 border border-themed/20 text-themed hover:bg-themed/5 rounded-lg text-xs font-medium transition-colors flex-1 sm:flex-auto"
                    >
                      Edit Report
                    </button>
                    
                    <button
                      onClick={() => {}}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 flex-1 sm:flex-auto justify-center"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 border border-themed/10 p-3 sm:p-4 rounded-lg">
                  {/* Report Header - Improved for small screens */}
                  <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-themed/10">
                    <h2 className="text-base sm:text-lg font-bold text-themed">{reportName}</h2>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2 mt-2 text-xs text-muted">
                      <div className="mb-1 sm:mb-0"><span className="font-medium">Report Type:</span> {adminReportBuilder.reportTypes.find(t => t.value === reportType)?.label}</div>
                      <div className="mb-1 sm:mb-0"><span className="font-medium">Date Range:</span> {dateRange.start} to {dateRange.end}</div>
                      <div><span className="font-medium">Generated On:</span> {new Date().toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  {/* Report Content - Mobile optimized */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Sample Executive Summary */}
                    <div>
                      <h3 className="text-sm sm:text-base font-medium text-themed mb-1 sm:mb-2">Executive Summary</h3>
                      <p className="text-xs sm:text-sm text-muted">
                        This report provides an analysis of {adminReportBuilder.reportTypes.find(t => t.value === reportType)?.label.toLowerCase()} 
                        during the period from {dateRange.start} to {dateRange.end}. 
                        Key metrics show {reportType === 'user_activity' ? 'increased user engagement' : 
                                          reportType === 'system_performance' ? 'stable system performance' : 
                                          reportType === 'error_rates' ? 'decreased error rates' : 
                                          'positive trends'} compared to previous periods.
                      </p>
                    </div>
                    
                    {/* Sample Metrics - Responsive grid that adapts to screen size */}
                    <div>
                      <h3 className="text-sm sm:text-base font-medium text-themed mb-2 sm:mb-3">Key Metrics</h3>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        <div className="bg-white dark:bg-gray-900 p-2 sm:p-3 rounded-lg border border-themed/10 text-center">
                          <div className="text-[10px] sm:text-xs text-muted mb-1">Total Users</div>
                          <div className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400">1,248</div>
                          <div className="text-[8px] sm:text-[10px] text-green-600 dark:text-green-400">↑ 12% from previous</div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-900 p-2 sm:p-3 rounded-lg border border-themed/10 text-center">
                          <div className="text-[10px] sm:text-xs text-muted mb-1">Avg. Session</div>
                          <div className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400">4.2 min</div>
                          <div className="text-[8px] sm:text-[10px] text-green-600 dark:text-green-400">↑ 8% from previous</div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-900 p-2 sm:p-3 rounded-lg border border-themed/10 text-center">
                          <div className="text-[10px] sm:text-xs text-muted mb-1">Retention</div>
                          <div className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400">78.3%</div>
                          <div className="text-[8px] sm:text-[10px] text-red-600 dark:text-red-400">↓ 2% from previous</div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-900 p-2 sm:p-3 rounded-lg border border-themed/10 text-center">
                          <div className="text-[10px] sm:text-xs text-muted mb-1">Conversions</div>
                          <div className="text-base sm:text-lg font-semibold text-blue-600 dark:text-blue-400">342</div>
                          <div className="text-[8px] sm:text-[10px] text-green-600 dark:text-green-400">↑ 18% from previous</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Sample Chart Section - Responsive height */}
                    {includeCharts && (
                      <div>
                        <h3 className="text-sm sm:text-base font-medium text-themed mb-2 sm:mb-3">Data Visualization</h3>
                        <div className="aspect-[4/3] sm:aspect-[16/9] border border-themed/10 rounded-lg overflow-hidden bg-white dark:bg-gray-900 flex items-center justify-center">
                          <div className="text-center p-3 sm:p-6">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-2">
                              <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <p className="text-xs sm:text-sm text-muted">
                              Chart visualization will be generated for the final report.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Sample Detailed Results - Horizontal scroll on mobile */}
                    <div>
                      <h3 className="text-sm sm:text-base font-medium text-themed mb-2 sm:mb-3">Detailed Results</h3>
                      <div className="overflow-x-auto -mx-3 px-3 sm:-mx-4 sm:px-4 pb-2">
                        <table className="min-w-full border border-themed/10 rounded-lg overflow-hidden">
                          <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                              <th className="py-1.5 sm:py-2 px-2 sm:px-3 text-[10px] sm:text-xs font-medium text-muted text-left">Date</th>
                              <th className="py-1.5 sm:py-2 px-2 sm:px-3 text-[10px] sm:text-xs font-medium text-muted text-left">Active Users</th>
                              <th className="py-1.5 sm:py-2 px-2 sm:px-3 text-[10px] sm:text-xs font-medium text-muted text-left">Sessions</th>
                              <th className="py-1.5 sm:py-2 px-2 sm:px-3 text-[10px] sm:text-xs font-medium text-muted text-left">Avg. Duration</th>
                              <th className="py-1.5 sm:py-2 px-2 sm:px-3 text-[10px] sm:text-xs font-medium text-muted text-left">Conversion Rate</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-900 divide-y divide-themed/10">
                            {[...Array(5)].map((_, idx) => {
                              const date = new Date();
                              date.setDate(date.getDate() - idx);
                              
                              return (
                                <tr key={idx} className="hover:bg-themed/5">
                                  <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-[10px] sm:text-xs text-themed">
                                    {date.toLocaleDateString()}
                                  </td>
                                  <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-[10px] sm:text-xs text-muted">
                                    {Math.round(900 + Math.random() * 200)}
                                  </td>
                                  <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-[10px] sm:text-xs text-muted">
                                    {Math.round(1400 + Math.random() * 300)}
                                  </td>
                                  <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-[10px] sm:text-xs text-muted">
                                    {(3 + Math.random() * 2).toFixed(1)} min
                                  </td>
                                  <td className="py-1.5 sm:py-2 px-2 sm:px-3 text-[10px] sm:text-xs text-muted">
                                    {(5 + Math.random() * 3).toFixed(1)}%
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    {/* Sample Recommendations */}
                    <div>
                      <h3 className="text-sm sm:text-base font-medium text-themed mb-1 sm:mb-2">Recommendations</h3>
                      <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-muted pl-0 sm:pl-2">
                        <li>Optimize mobile experience to improve session duration</li>
                        <li>Implement retention strategies for users in the 30-45 age group</li>
                        <li>Explore factors affecting the recent drop in user retention</li>
                        <li>Consider A/B testing for the conversion funnel to improve rates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      
      {activeTab === 'saved' && (
        <div className="surface rounded-lg shadow-themed-md p-3 sm:p-5 border border-themed/10 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
            <h3 className="text-lg font-semibold text-themed">Saved Reports</h3>
            <button
              onClick={() => setActiveTab('builder')}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 justify-center"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>New Report</span>
            </button>
          </div>
          
          {/* Responsive table design */}
          <div className="overflow-x-auto -mx-3 sm:-mx-5 px-3 sm:px-5">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-y border-themed/10">
                  <th className="py-2 sm:py-3 px-2 sm:px-3 text-left text-[10px] sm:text-xs font-medium text-muted">Report Name</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-3 text-left text-[10px] sm:text-xs font-medium text-muted">Type</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-3 text-left text-[10px] sm:text-xs font-medium text-muted hidden sm:table-cell">Created By</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-3 text-left text-[10px] sm:text-xs font-medium text-muted hidden sm:table-cell">Created</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-3 text-left text-[10px] sm:text-xs font-medium text-muted">Last Run</th>
                  <th className="py-2 sm:py-3 px-2 sm:px-3 text-right text-[10px] sm:text-xs font-medium text-muted">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-themed/10">
                {adminReportBuilder.savedReports.map((report, idx) => (
                  <tr key={idx} className="hover:bg-themed/5">
                    <td className="py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm font-medium text-themed">
                      <span className="line-clamp-1">{report.name}</span>
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm text-muted">
                      {adminReportBuilder.reportTypes.find(t => t.value === report.type)?.label || report.type}
                    </td>
                    <td className="py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm text-muted hidden sm:table-cell">{report.createdBy}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm text-muted hidden sm:table-cell">{report.createdAt}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-3 text-xs sm:text-sm text-muted">{report.lastRun}</td>
                    <td className="py-2 sm:py-3 px-2 sm:px-3 text-right">
                      <div className="flex justify-end space-x-1 sm:space-x-2">
                        <button
                          className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                          title="Run Report"
                        >
                          <PlayCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                        <button
                          className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded hidden sm:block"
                          title="Edit Report"
                        >
                          <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                        <button
                          className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded hidden sm:block"
                          title="Duplicate Report"
                        >
                          <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                        <button
                          className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                          title="Delete Report"
                        >
                          <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {adminReportBuilder.savedReports.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-6 sm:py-8 text-center text-muted">
                      <div className="flex flex-col items-center">
                        <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-muted opacity-40 mb-2" />
                        <p className="text-sm text-muted mb-3">No saved reports found</p>
                        <button 
                          onClick={() => setActiveTab('builder')} 
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium"
                        >
                          Create your first report
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReportBuilder