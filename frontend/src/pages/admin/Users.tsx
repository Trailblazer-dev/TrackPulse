import React, { useState, useEffect } from 'react'
import { adminUsersManagement } from '../../utils/admin/admin'
import { Search, Filter, Download, Plus, Edit, Trash2, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'

const Users = () => {
  const [filters, setFilters] = useState(adminUsersManagement.filters)
  const [pagination, setPagination] = useState(adminUsersManagement.table.pagination)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [mockUserData, setMockUserData] = useState<any[]>([
    { id: '001', name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', dateJoined: '2023-05-10', lastLogin: '2023-10-15' },
    { id: '002', name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active', dateJoined: '2023-04-22', lastLogin: '2023-10-18' },
    { id: '003', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', dateJoined: '2023-06-15', lastLogin: '2023-09-30' },
    { id: '004', name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'Active', dateJoined: '2023-07-03', lastLogin: '2023-10-17' },
    { id: '005', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'User', status: 'Pending', dateJoined: '2023-10-01', lastLogin: 'Never' },
    { id: '006', name: 'Diana Miller', email: 'diana@example.com', role: 'User', status: 'Active', dateJoined: '2023-08-12', lastLogin: '2023-10-10' },
    { id: '007', name: 'Edward Davis', email: 'edward@example.com', role: 'Manager', status: 'Active', dateJoined: '2023-05-20', lastLogin: '2023-10-16' },
    { id: '008', name: 'Fiona Clark', email: 'fiona@example.com', role: 'User', status: 'Inactive', dateJoined: '2023-03-18', lastLogin: '2023-08-05' },
    { id: '009', name: 'George White', email: 'george@example.com', role: 'User', status: 'Active', dateJoined: '2023-09-05', lastLogin: '2023-10-14' },
    { id: '010', name: 'Hannah Lee', email: 'hannah@example.com', role: 'Admin', status: 'Active', dateJoined: '2023-02-28', lastLogin: '2023-10-18' }
  ])

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // Initial check
    checkMobile()
    
    // Add resize listener
    window.addEventListener('resize', checkMobile)
    
    // Update pagination total
    setPagination(prev => ({
      ...prev,
      totalItems: mockUserData.length
    }))
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [mockUserData.length])

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value
    }))
  }

  // Handle filter change
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  // Handle sort
  const handleSort = (column: string) => {
    const currentSort = filters.sortBy
    const [currentColumn, currentDirection] = currentSort.split('_')
    
    let newSort = ''
    if (currentColumn === column) {
      // Toggle direction if same column
      newSort = `${column}_${currentDirection === 'asc' ? 'desc' : 'asc'}`
    } else {
      // Default to ascending for new column
      newSort = `${column}_asc`
    }
    
    setFilters(prev => ({
      ...prev,
      sortBy: newSort
    }))
  }

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > Math.ceil(pagination.totalItems / pagination.itemsPerPage)) {
      return
    }
    
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }))
  }

  // Handle select all users
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUsers(mockUserData.map(user => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  // Handle select single user
  const handleSelectUser = (e: React.ChangeEvent<HTMLInputElement>, userId: string) => {
    if (e.target.checked) {
      setSelectedUsers(prev => [...prev, userId])
    } else {
      setSelectedUsers(prev => prev.filter(id => id !== userId))
    }
  }

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      case 'inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
    }
  }

  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
      case 'manager':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700/50 dark:text-gray-300'
    }
  }

  // Filter and paginate users
  const filteredUsers = mockUserData
    .filter(user => {
      // Search filter
      if (filters.search && !Object.values(user).some(
        value => typeof value === 'string' && value.toLowerCase().includes(filters.search.toLowerCase())
      )) {
        return false
      }
      
      // Role filter
      if (filters.role !== 'all' && user.role.toLowerCase() !== filters.role.toLowerCase()) {
        return false
      }
      
      // Status filter
      if (filters.status !== 'all' && user.status.toLowerCase() !== filters.status.toLowerCase()) {
        return false
      }
      
      return true
    })
    .sort((a, b) => {
      const [column, direction] = filters.sortBy.split('_')
      if (!a[column] || !b[column]) return 0
      
      const comparison = a[column].localeCompare(b[column])
      return direction === 'asc' ? comparison : -comparison
    })
    
  const paginatedUsers = filteredUsers.slice(
    (pagination.currentPage - 1) * pagination.itemsPerPage,
    pagination.currentPage * pagination.itemsPerPage
  )

  return (
    <div className="w-full max-w-full px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-themed">{adminUsersManagement.title}</h1>
        <p className="text-sm text-muted md:hidden">{adminUsersManagement.description}</p>
        
        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          <button 
            className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-primary text-white flex items-center gap-1"
            aria-label={adminUsersManagement.actions.create.label}
          >
            <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{adminUsersManagement.actions.create.label}</span>
          </button>
          
          <button 
            className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border border-themed/20 text-themed hover:bg-themed/5 flex items-center gap-1"
            disabled={selectedUsers.length === 0}
            aria-label={adminUsersManagement.actions.export.label}
          >
            <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{adminUsersManagement.actions.export.label}</span>
          </button>
          
          <button 
            className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border border-themed/20 text-themed hover:bg-themed/5 flex items-center gap-1"
            disabled={selectedUsers.length === 0}
            aria-label={adminUsersManagement.actions.bulkActions.label}
          >
            <MoreHorizontal className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{adminUsersManagement.actions.bulkActions.label}</span>
          </button>
        </div>
      </div>
      
      {/* Filters section */}
      <div className="surface rounded-lg shadow-themed-md p-3 sm:p-4 border border-themed/10 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search users..."
              value={filters.search}
              onChange={handleSearch}
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
                value={filters.role}
                onChange={(e) => handleFilterChange('role', e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
            </div>
            
            <select
              className="py-2 px-3 border border-themed/20 rounded-lg surface text-sm w-full sm:w-auto"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            
            <select
              className="py-2 px-3 border border-themed/20 rounded-lg surface text-sm w-full sm:w-auto"
              value={filters.dateJoined}
              onChange={(e) => handleFilterChange('dateJoined', e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="last7days">Last 7 days</option>
              <option value="last30days">Last 30 days</option>
              <option value="last90days">Last 90 days</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Users table */}
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
                      checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                      onChange={handleSelectAll}
                    />
                  </div>
                </th>
                {adminUsersManagement.table.columns.map((column, idx) => {
                  // Skip Actions column on mobile
                  if (isMobile && column.key === 'actions') return null;
                  // Skip less important columns on mobile
                  if (isMobile && ['dateJoined', 'lastLogin', 'id'].includes(column.key)) return null;
                  
                  return (
                    <th 
                      key={idx} 
                      className="px-3 py-3 sm:px-4 sm:py-4 text-left text-xs font-medium text-muted"
                      onClick={() => column.sortable && handleSort(column.key)}
                      style={{ cursor: column.sortable ? 'pointer' : 'default' }}
                    >
                      <div className="flex items-center">
                        {column.header}
                        {column.sortable && (
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-4 w-4 ml-1 ${
                              filters.sortBy.startsWith(column.key) ? 'text-primary' : 'text-muted opacity-50'
                            }`} 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            {filters.sortBy === `${column.key}_asc` ? (
                              <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L10 4.414 6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            ) : filters.sortBy === `${column.key}_desc` ? (
                              <path fillRule="evenodd" d="M5.293 12.293a1 1 0 011.414 0L10 15.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            ) : (
                              <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v10.5a.75.75 0 01-1.5 0V3.75A.75.75 0 0110 3z M5.553 12.106a.75.75 0 010 1.06 1.25 1.25 0 01-1.768 0l-2.5-2.5a.75.75 0 111.06-1.06l1.97 1.97 1.97-1.97a.75.75 0 011.06 0 .75.75 0 01.208.53.75.75 0 01-.208.53l-1.97 1.97 1.97 1.97a.75.75 0 010 1.06 1.25 1.25 0 01-1.768 0l-2.5-2.5a.75.75 0 010-1.06l2.5-2.5zM14.916 12.636l1.97-1.97a.75.75 0 011.06 0 .75.75 0 01.208.53.75.75 0 01-.208.53l-2.5 2.5a1.25 1.25 0 01-1.768 0 .75.75 0 010-1.06l1.97-1.97-1.97-1.97a.75.75 0 01-.208-.53.75.75 0 01.208-.53.75.75 0 011.06 0l2.5 2.5a.75.75 0 010 1.06l-2.5 2.5a1.25 1.25 0 01-1.768 0 .75.75 0 010-1.06l1.97-1.97z" />
                            )}
                          </svg>
                        )}
                      </div>
                    </th>
                  )
                })}
                {/* Add action column for mobile */}
                {isMobile && (
                  <th className="px-3 py-3 sm:px-4 sm:py-4 text-right text-xs font-medium text-muted">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-themed/10">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={isMobile ? 4 : adminUsersManagement.table.columns.length + 1} className="px-3 py-4 sm:px-4 sm:py-6 text-center text-muted">
                    No users found matching your filters
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user, idx) => (
                  <tr key={idx} className="hover:bg-themed/5 transition-colors">
                    <td className="px-3 py-3 sm:px-4 sm:py-4">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded text-primary focus:ring-primary"
                        checked={selectedUsers.includes(user.id)}
                        onChange={(e) => handleSelectUser(e, user.id)}
                      />
                    </td>
                    {/* ID column - hidden on mobile */}
                    {!isMobile && (
                      <td className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm text-muted">
                        {user.id}
                      </td>
                    )}
                    {/* Name column */}
                    <td className="px-3 py-3 sm:px-4 sm:py-4">
                      <div className="flex items-center">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                          {user.name.charAt(0)}
                        </div>
                        <div className="ml-2 sm:ml-3">
                          <div className="text-xs sm:text-sm font-medium text-themed">{user.name}</div>
                          <div className="text-[10px] sm:text-xs text-muted">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    {/* Email column - hidden on mobile as it's shown with the name */}
                    {!isMobile && (
                      <td className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm text-muted">
                        {user.email}
                      </td>
                    )}
                    {/* Role column */}
                    <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    {/* Status column */}
                    <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${getStatusBadgeColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    {/* Date Joined column - hidden on mobile */}
                    {!isMobile && (
                      <td className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm text-muted whitespace-nowrap">
                        {user.dateJoined}
                      </td>
                    )}
                    {/* Last Login column - hidden on mobile */}
                    {!isMobile && (
                      <td className="px-3 py-3 sm:px-4 sm:py-4 text-xs sm:text-sm text-muted whitespace-nowrap">
                        {user.lastLogin}
                      </td>
                    )}
                    {/* Actions column */}
                    <td className="px-3 py-3 sm:px-4 sm:py-4 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-2">
                        <button 
                          className="p-1 text-muted hover:text-primary transition-colors"
                          aria-label={adminUsersManagement.actions.edit.label}
                        >
                          <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                        <button 
                          className="p-1 text-muted hover:text-red-500 dark:hover:text-red-400 transition-colors"
                          aria-label={adminUsersManagement.actions.delete.label}
                        >
                          <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                        {/* More button for additional options */}
                        <button 
                          className="p-1 text-muted hover:text-primary transition-colors"
                          aria-label="More options"
                        >
                          <MoreHorizontal className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination - responsive design */}
        <div className="py-3 flex items-center justify-between border-t border-themed/10 px-4">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-xs text-muted">
                Showing <span className="font-medium">{((pagination.currentPage - 1) * pagination.itemsPerPage) + 1}</span> to <span className="font-medium">{Math.min(pagination.currentPage * pagination.itemsPerPage, filteredUsers.length)}</span> of{" "}
                <span className="font-medium">{filteredUsers.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-themed/20 bg-surface text-sm font-medium ${
                    pagination.currentPage === 1 ? 'text-muted/50 cursor-not-allowed' : 'text-muted hover:bg-themed/5'
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                {/* Page numbers - show fewer on smaller screens */}
                {Array.from({ length: Math.ceil(filteredUsers.length / pagination.itemsPerPage) }, (_, i) => i + 1)
                  .filter(page => {
                    // Always show first, last, current, and pages adjacent to current
                    const totalPages = Math.ceil(filteredUsers.length / pagination.itemsPerPage);
                    return page === 1 || 
                           page === totalPages ||
                           Math.abs(page - pagination.currentPage) <= 1;
                  })
                  .map((page, idx, arr) => (
                    <React.Fragment key={page}>
                      {idx > 0 && arr[idx - 1] !== page - 1 && (
                        <span className="relative inline-flex items-center px-3 py-2 border border-themed/20 bg-surface text-sm font-medium text-muted">
                          ...
                        </span>
                      )}
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`relative inline-flex items-center px-3 py-2 border border-themed/20 text-sm font-medium ${
                          pagination.currentPage === page
                            ? 'z-10 bg-primary text-white'
                            : 'bg-surface text-muted hover:bg-themed/5'
                        }`}
                      >
                        {page}
                      </button>
                    </React.Fragment>
                  ))}
                
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage >= Math.ceil(filteredUsers.length / pagination.itemsPerPage)}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-themed/20 bg-surface text-sm font-medium ${
                    pagination.currentPage >= Math.ceil(filteredUsers.length / pagination.itemsPerPage)
                      ? 'text-muted/50 cursor-not-allowed'
                      : 'text-muted hover:bg-themed/5'
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            </div>
          </div>
          
          {/* Simplified mobile pagination */}
          <div className="flex justify-between w-full sm:hidden">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md ${
                pagination.currentPage === 1
                  ? 'text-muted/50 bg-themed/5 cursor-not-allowed'
                  : 'text-themed border border-themed/20 bg-surface hover:bg-themed/5'
              }`}
            >
              Previous
            </button>
            
            <div className="text-xs text-muted self-center">
              Page {pagination.currentPage} of {Math.ceil(filteredUsers.length / pagination.itemsPerPage)}
            </div>
            
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= Math.ceil(filteredUsers.length / pagination.itemsPerPage)}
              className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md ${
                pagination.currentPage >= Math.ceil(filteredUsers.length / pagination.itemsPerPage)
                  ? 'text-muted/50 bg-themed/5 cursor-not-allowed'
                  : 'text-themed border border-themed/20 bg-surface hover:bg-themed/5'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users