import React, { useState, useEffect } from 'react'
import { adminDataManagement } from '../../utils/admin/admin'
import { 
  Database, 
  RefreshCcw, 
  Download, 
  Upload, 
  Trash2, 
  ChevronDown,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileText,
  Server
} from 'lucide-react'

const DataManagement = () => {
  const [activeTab, setActiveTab] = useState('backups')
  const [selectedBackups, setSelectedBackups] = useState<string[]>([])
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ 
    key: 'date', 
    direction: 'desc' 
  })
  const [backupFilter, setBackupFilter] = useState('all')
  const [isMobile, setIsMobile] = useState(false)
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [currentAction, setCurrentAction] = useState<string | null>(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [actionToConfirm, setActionToConfirm] = useState<{ action: string; backup?: any } | null>(null)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkMobile)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Handle backup selection
  const handleBackupSelect = (e: React.ChangeEvent<HTMLInputElement>, backupDate: string) => {
    if (e.target.checked) {
      setSelectedBackups([...selectedBackups, backupDate])
    } else {
      setSelectedBackups(selectedBackups.filter(date => date !== backupDate))
    }
  }

  // Handle select all backups
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedBackups(adminDataManagement.backupHistory.data.map(backup => backup.date))
    } else {
      setSelectedBackups([])
    }
  }

  // Handle sorting
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = 'asc'
    }
    
    setSortConfig({ key, direction })
  }

  // Get sorted and filtered backups
  const getSortedBackups = () => {
    const filteredBackups = adminDataManagement.backupHistory.data.filter(backup => {
      if (backupFilter === 'all') return true
      return backup.type.toLowerCase() === backupFilter.toLowerCase()
    })
    
    return [...filteredBackups].sort((a, b) => {
      if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })
  }

  // Handle backup action
  const handleBackupAction = (action: string, backup?: any) => {
    if (['restore', 'delete'].includes(action)) {
      setActionToConfirm({ action, backup })
      setIsConfirmModalOpen(true)
      return
    }
    
    // For other actions, show the action modal
    setCurrentAction(action)
    setIsActionModalOpen(true)
    
    // In a real app, we would make API calls here
    console.log(`Performing ${action} ${backup ? `on backup from ${backup.date}` : 'operation'}`)
    
    // Close modal after simulated operation
    if (action === 'download') {
      setTimeout(() => {
        setIsActionModalOpen(false)
        setCurrentAction(null)
      }, 2000)
    }
  }

  // Confirm action
  const confirmAction = () => {
    if (!actionToConfirm) return
    
    // In a real app, we would make API calls here
    console.log(`Confirmed ${actionToConfirm.action} on backup from ${actionToConfirm.backup?.date || 'selected backups'}`)
    
    // Close modal
    setIsConfirmModalOpen(false)
    setActionToConfirm(null)
  }

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
      case 'in progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300'
    }
  }

  // Format size for display
  const formatSize = (size: string) => {
    if (size.includes('MB')) {
      const mbValue = parseFloat(size.replace('MB', ''))
      if (mbValue < 100) return size
      const gbValue = (mbValue / 1000).toFixed(1)
      return `${gbValue}GB`
    }
    return size
  }

  return (
    <div className="w-full max-w-full px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 sm:mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-themed">{adminDataManagement.title}</h1>
          <p className="text-sm text-muted mt-1">{adminDataManagement.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Quick action buttons */}
          {adminDataManagement.actions.map((action, idx) => (
            <button 
              key={idx}
              onClick={() => handleBackupAction(action.action)}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border border-themed/20 text-themed hover:bg-themed/5 flex items-center gap-1.5 transition-colors"
            >
              {action.icon === 'database' && <Database className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              {action.icon === 'refresh' && <RefreshCcw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              {action.icon === 'download' && <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              {action.icon === 'upload' && <Upload className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              {action.icon === 'trash' && <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Database Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="surface rounded-lg shadow-themed-md p-4 border border-themed/10">
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-muted mb-1">Database Size</p>
              <h3 className="text-xl font-semibold text-themed">{adminDataManagement.databaseStats.size}</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        
        <div className="surface rounded-lg shadow-themed-md p-4 border border-themed/10">
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-muted mb-1">Tables</p>
              <h3 className="text-xl font-semibold text-themed">{adminDataManagement.databaseStats.tables}</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Server className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
        
        <div className="surface rounded-lg shadow-themed-md p-4 border border-themed/10">
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-muted mb-1">Total Records</p>
              <h3 className="text-xl font-semibold text-themed">{adminDataManagement.databaseStats.records}</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
        
        <div className="surface rounded-lg shadow-themed-md p-4 border border-themed/10">
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-muted mb-1">Last Optimized</p>
              <h3 className="text-xl font-semibold text-themed">{adminDataManagement.databaseStats.lastOptimized}</h3>
            </div>
            <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs for different data management sections */}
      <div className="flex border-b border-themed/10 mb-4">
        <button
          onClick={() => setActiveTab('backups')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            activeTab === 'backups'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-themed'
          }`}
        >
          Backup History
        </button>
        <button
          onClick={() => setActiveTab('export')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            activeTab === 'export'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-themed'
          }`}
        >
          Export/Import
        </button>
        <button
          onClick={() => setActiveTab('cleanup')}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
            activeTab === 'cleanup'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted hover:text-themed'
          }`}
        >
          Data Cleanup
        </button>
      </div>
      
      {/* Backup History Tab */}
      {activeTab === 'backups' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Filter controls */}
            <div className="flex space-x-2">
              <select
                value={backupFilter}
                onChange={(e) => setBackupFilter(e.target.value)}
                className="py-1.5 px-3 text-xs border border-themed/20 rounded-lg surface"
              >
                <option value="all">All Types</option>
                <option value="full">Full Backups</option>
                <option value="incremental">Incremental</option>
              </select>
            </div>
            
            {/* Bulk actions for selected backups */}
            <div className="flex space-x-2">
              <button
                disabled={selectedBackups.length === 0}
                className={`py-1.5 px-3 text-xs rounded-lg flex items-center gap-1.5 ${
                  selectedBackups.length === 0
                    ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/40'
                }`}
                onClick={() => handleBackupAction('download')}
              >
                <Download className="h-3 w-3" />
                <span>Download Selected</span>
              </button>
              
              <button
                disabled={selectedBackups.length === 0}
                className={`py-1.5 px-3 text-xs rounded-lg flex items-center gap-1.5 ${
                  selectedBackups.length === 0
                    ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800/40'
                }`}
                onClick={() => handleBackupAction('delete')}
              >
                <Trash2 className="h-3 w-3" />
                <span>Delete Selected</span>
              </button>
            </div>
          </div>
          
          {/* Backup history table */}
          <div className="surface rounded-lg shadow-themed-md border border-themed/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-themed/5">
                    <th className="px-3 py-3 text-left">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded text-primary focus:ring-primary"
                        checked={selectedBackups.length === adminDataManagement.backupHistory.data.length && selectedBackups.length > 0}
                        onChange={handleSelectAll}
                      />
                    </th>
                    {adminDataManagement.backupHistory.columns.map((column, idx) => {
                      // Skip less important columns on mobile
                      if (isMobile && ['createdBy'].includes(column.key)) return null;
                      
                      return (
                        <th 
                          key={idx}
                          className={`px-3 py-3 text-left text-xs font-medium text-muted ${
                            column.key === 'actions' ? 'text-right' : ''
                          }`}
                          onClick={() => column.sortable && handleSort(column.key)}
                          style={{ cursor: column.sortable ? 'pointer' : 'default' }}
                        >
                          <div className="flex items-center">
                            <span>{column.header}</span>
                            {column.sortable && (
                              <ChevronDown 
                                className={`h-3.5 w-3.5 ml-1 transform transition-transform ${
                                  sortConfig.key === column.key && sortConfig.direction === 'desc' ? 'rotate-180' : ''
                                } ${
                                  sortConfig.key === column.key ? 'opacity-100' : 'opacity-30'
                                }`}
                              />
                            )}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-themed/10">
                  {getSortedBackups().map((backup, idx) => (
                    <tr key={idx} className="hover:bg-themed/5 transition-colors">
                      <td className="px-3 py-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded text-primary focus:ring-primary"
                          checked={selectedBackups.includes(backup.date)}
                          onChange={(e) => handleBackupSelect(e, backup.date)}
                        />
                      </td>
                      <td className="px-3 py-3 text-xs sm:text-sm text-themed">
                        {backup.date}
                      </td>
                      <td className="px-3 py-3 text-xs sm:text-sm">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${
                          backup.type === 'Full' 
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}>
                          {backup.type}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-xs sm:text-sm text-muted">
                        {formatSize(backup.size)}
                      </td>
                      <td className="px-3 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${getStatusBadgeColor(backup.status)}`}>
                          {backup.status}
                        </span>
                      </td>
                      {!isMobile && (
                        <td className="px-3 py-3 text-xs sm:text-sm text-muted">
                          {backup.createdBy}
                        </td>
                      )}
                      <td className="px-3 py-3 text-right whitespace-nowrap">
                        <div className="flex justify-end space-x-1.5">
                          {backup.actions.includes('Download') && (
                            <button
                              onClick={() => handleBackupAction('download', backup)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded dark:text-blue-400 dark:hover:bg-blue-900/20"
                              title="Download"
                            >
                              <Download className="h-3.5 w-3.5" />
                            </button>
                          )}
                          
                          {backup.actions.includes('Restore') && (
                            <button
                              onClick={() => handleBackupAction('restore', backup)}
                              className="p-1 text-green-600 hover:bg-green-50 rounded dark:text-green-400 dark:hover:bg-green-900/20"
                              title="Restore"
                            >
                              <RefreshCcw className="h-3.5 w-3.5" />
                            </button>
                          )}
                          
                          {backup.actions.includes('Delete') && (
                            <button
                              onClick={() => handleBackupAction('delete', backup)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded dark:text-red-400 dark:hover:bg-red-900/20"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                          
                          {backup.actions.includes('Retry') && (
                            <button
                              onClick={() => handleBackupAction('retry', backup)}
                              className="p-1 text-yellow-600 hover:bg-yellow-50 rounded dark:text-yellow-400 dark:hover:bg-yellow-900/20"
                              title="Retry"
                            >
                              <RefreshCcw className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  {getSortedBackups().length === 0 && (
                    <tr>
                      <td colSpan={isMobile ? 5 : 6} className="px-3 py-6 text-center text-muted">
                        No backup history found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="py-3 px-4 flex items-center justify-between border-t border-themed/10">
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{getSortedBackups().length}</span> of{" "}
                    <span className="font-medium">{getSortedBackups().length}</span> backups
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Export/Import Tab */}
      {activeTab === 'export' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Export Section */}
            <div className="surface rounded-lg shadow-themed-md p-5 border border-themed/10">
              <h3 className="text-lg font-semibold text-themed mb-4">Export Data</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Select Data Type</label>
                  <select className="w-full p-2 border border-themed/20 rounded-lg surface text-sm">
                    <option>All Data</option>
                    <option>User Data</option>
                    <option>Analytics Data</option>
                    <option>Content Data</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Format</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input type="radio" name="exportFormat" className="h-4 w-4 text-primary focus:ring-primary mr-2" checked />
                      <span className="text-sm text-themed">CSV</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="exportFormat" className="h-4 w-4 text-primary focus:ring-primary mr-2" />
                      <span className="text-sm text-themed">JSON</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="exportFormat" className="h-4 w-4 text-primary focus:ring-primary mr-2" />
                      <span className="text-sm text-themed">SQL</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Options</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 rounded text-primary focus:ring-primary mr-2" />
                      <span className="text-sm text-themed">Include Metadata</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 rounded text-primary focus:ring-primary mr-2" />
                      <span className="text-sm text-themed">Compress Export</span>
                    </label>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button
                    onClick={() => handleBackupAction('export')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span>Generate Export</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Import Section */}
            <div className="surface rounded-lg shadow-themed-md p-5 border border-themed/10">
              <h3 className="text-lg font-semibold text-themed mb-4">Import Data</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Data Source</label>
                  <select className="w-full p-2 border border-themed/20 rounded-lg surface text-sm">
                    <option>File Upload</option>
                    <option>Remote URL</option>
                    <option>Cloud Storage</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">File Upload</label>
                  <div className="border-2 border-dashed border-themed/20 rounded-lg p-6 text-center">
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-muted" />
                      <p className="text-sm text-muted">Drag and drop files here, or click to browse</p>
                      <p className="text-xs text-muted">Supports CSV, JSON, SQL files (max 100MB)</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">Options</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 rounded text-primary focus:ring-primary mr-2" />
                      <span className="text-sm text-themed">Create Backup Before Import</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 rounded text-primary focus:ring-primary mr-2" />
                      <span className="text-sm text-themed">Replace Existing Data</span>
                    </label>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button
                    onClick={() => handleBackupAction('import')}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Start Import</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Data Cleanup Tab */}
      {activeTab === 'cleanup' && (
        <div className="space-y-6">
          <div className="surface rounded-lg shadow-themed-md p-5 border border-themed/10">
            <h3 className="text-lg font-semibold text-themed mb-4">Data Cleanup Options</h3>
            
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="border border-themed/10 rounded-lg p-4 hover:shadow-themed-md transition-shadow">
                  <h4 className="font-medium text-themed mb-2">Delete Temporary Files</h4>
                  <p className="text-xs text-muted mb-3">Remove temporary files created during data processing that are no longer needed.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-blue-600">Potential Space: 235MB</span>
                    <button
                      onClick={() => handleBackupAction('cleanup-temp')}
                      className="px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40 rounded text-xs transition-colors"
                    >
                      Cleanup
                    </button>
                  </div>
                </div>
                
                <div className="border border-themed/10 rounded-lg p-4 hover:shadow-themed-md transition-shadow">
                  <h4 className="font-medium text-themed mb-2">Clean Old Logs</h4>
                  <p className="text-xs text-muted mb-3">Remove system logs older than the specified retention period.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-blue-600">Potential Space: 450MB</span>
                    <button
                      onClick={() => handleBackupAction('cleanup-logs')}
                      className="px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40 rounded text-xs transition-colors"
                    >
                      Cleanup
                    </button>
                  </div>
                </div>
                
                <div className="border border-themed/10 rounded-lg p-4 hover:shadow-themed-md transition-shadow">
                  <h4 className="font-medium text-themed mb-2">Optimize Database</h4>
                  <p className="text-xs text-muted mb-3">Optimize database tables and indexes for better performance.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-blue-600">Last Run: 15 days ago</span>
                    <button
                      onClick={() => handleBackupAction('optimize-db')}
                      className="px-2 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40 rounded text-xs transition-colors"
                    >
                      Optimize
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-themed/10 pt-5">
                <h4 className="font-medium text-themed mb-3">Advanced Cleanup</h4>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">Data Retention</label>
                    <select className="w-full sm:w-1/2 p-2 border border-themed/20 rounded-lg surface text-sm">
                      <option>Keep all data</option>
                      <option>Delete data older than 1 year</option>
                      <option>Delete data older than 2 years</option>
                      <option>Delete data older than 3 years</option>
                      <option>Custom range...</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-muted mb-1">Select Data Types</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 rounded text-primary focus:ring-primary mr-2" />
                        <span className="text-sm text-themed">Audit Logs</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 rounded text-primary focus:ring-primary mr-2" />
                        <span className="text-sm text-themed">System Logs</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 rounded text-primary focus:ring-primary mr-2" />
                        <span className="text-sm text-themed">Analytics Data</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 rounded text-primary focus:ring-primary mr-2" />
                        <span className="text-sm text-themed">Cache Files</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 rounded text-primary focus:ring-primary mr-2" />
                        <span className="text-sm text-themed">Old Backups</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 rounded text-primary focus:ring-primary mr-2" />
                        <span className="text-sm text-themed">Inactive Users</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleBackupAction('advanced-cleanup')}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Run Advanced Cleanup</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="surface rounded-lg shadow-themed-md p-5 border border-themed/10">
            <h3 className="text-lg font-semibold text-themed mb-2">Cleanup Schedule</h3>
            <p className="text-sm text-muted mb-4">Configure automatic cleanup schedules to maintain system performance.</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-themed/10">
                <div>
                  <h4 className="font-medium text-themed">Temporary Files Cleanup</h4>
                  <p className="text-xs text-muted">Automatically remove temp files</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">Daily at 2:00 AM</span>
                  <button className="p-1 text-muted hover:text-primary">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-themed/10">
                <div>
                  <h4 className="font-medium text-themed">Database Optimization</h4>
                  <p className="text-xs text-muted">Optimize database tables</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">Weekly on Sunday at 3:00 AM</span>
                  <button className="p-1 text-muted hover:text-primary">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <h4 className="font-medium text-themed">Old Log Purging</h4>
                  <p className="text-xs text-muted">Delete logs older than 90 days</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">Monthly on 1st at 4:00 AM</span>
                  <button className="p-1 text-muted hover:text-primary">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsConfirmModalOpen(false)}></div>
          <div className="surface rounded-lg shadow-lg p-6 z-10 w-full max-w-md mx-4">
            <div className="mb-4">
              {actionToConfirm?.action === 'delete' && (
                <>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mx-auto mb-4">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-themed text-center">Confirm Deletion</h3>
                  <p className="text-sm text-muted text-center mt-2">
                    Are you sure you want to delete {actionToConfirm.backup ? `the backup from ${actionToConfirm.backup.date}` : `${selectedBackups.length} selected backups`}? This action cannot be undone.
                  </p>
                </>
              )}
              
              {actionToConfirm?.action === 'restore' && (
                <>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 mx-auto mb-4">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-themed text-center">Confirm Restore</h3>
                  <p className="text-sm text-muted text-center mt-2">
                    Are you sure you want to restore from the backup dated {actionToConfirm.backup?.date}? Current data will be overwritten.
                  </p>
                </>
              )}
            </div>
            
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 border border-themed/20 text-themed hover:bg-themed/5 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
              
              <button
                onClick={confirmAction}
                className={`px-4 py-2 text-white rounded-lg text-sm font-medium ${
                  actionToConfirm?.action === 'delete' 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-yellow-600 hover:bg-yellow-700'
                }`}
              >
                {actionToConfirm?.action === 'delete' ? 'Delete' : 'Restore'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Action Modal */}
      {isActionModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsActionModalOpen(false)}></div>
          <div className="surface rounded-lg shadow-lg p-6 z-10 w-full max-w-md mx-4">
            <div className="text-center">
              {currentAction === 'download' && (
                <>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                    <Download className="h-6 w-6 animate-bounce" />
                  </div>
                  <h3 className="text-lg font-semibold text-themed">Downloading Backup</h3>
                  <p className="text-sm text-muted mt-2">
                    Your download should begin automatically. If it doesn't, 
                    <button className="text-primary hover:underline ml-1">click here</button>
                  </p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-4">
                    <div className="bg-blue-500 h-1.5 rounded-full w-3/4"></div>
                  </div>
                </>
              )}
              
              {currentAction === 'create_backup' && (
                <>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                    <Database className="h-6 w-6 animate-pulse" />
                  </div>
                  <h3 className="text-lg font-semibold text-themed">Creating Backup</h3>
                  <p className="text-sm text-muted mt-2">Please wait while we create a new backup of your data.</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-4">
                    <div className="bg-blue-500 h-1.5 rounded-full w-2/5"></div>
                  </div>
                  <p className="text-xs text-muted mt-2">This may take several minutes depending on your data size.</p>
                </>
              )}
              
              {currentAction === 'restore_backup' && (
                <>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                    <RefreshCcw className="h-6 w-6 animate-spin" />
                  </div>
                  <h3 className="text-lg font-semibold text-themed">Restoring Backup</h3>
                  <p className="text-sm text-muted mt-2">Please wait while we restore your data from the selected backup.</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-4">
                    <div className="bg-blue-500 h-1.5 rounded-full w-1/2"></div>
                  </div>
                  <p className="text-xs text-muted mt-2">This may take several minutes. Please do not close this window.</p>
                </>
              )}
              
              {currentAction === 'export' && (
                <>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                    <Download className="h-6 w-6 animate-bounce" />
                  </div>
                  <h3 className="text-lg font-semibold text-themed">Exporting Data</h3>
                  <p className="text-sm text-muted mt-2">We're preparing your data export. This may take a moment.</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full mt-4">
                    <div className="bg-blue-500 h-1.5 rounded-full w-3/5"></div>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setIsActionModalOpen(false)}
                className="px-4 py-2 border border-themed/20 text-themed hover:bg-themed/5 rounded-lg text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataManagement