import React from 'react'

const AdminDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <h3 className="text-lg font-semibold mb-2">Users Management</h3>
          <p className="text-gray-600">Manage system users and permissions</p>
          <a href="/admin/users" className="text-red-600 hover:underline mt-2 block">
            Manage Users →
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-lg font-semibold mb-2">System Metrics</h3>
          <p className="text-gray-600">Monitor system performance</p>
          <a href="/admin/metrics" className="text-yellow-600 hover:underline mt-2 block">
            View Metrics →
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-lg font-semibold mb-2">Audit Logs</h3>
          <p className="text-gray-600">Review system audit logs</p>
          <a href="/admin/audit-logs" className="text-green-600 hover:underline mt-2 block">
            View Logs →
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold mb-2">Data Management</h3>
          <p className="text-gray-600">Manage system data and backups</p>
          <a href="/admin/data-management" className="text-blue-600 hover:underline mt-2 block">
            Manage Data →
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold mb-2">Report Builder</h3>
          <p className="text-gray-600">Create custom reports</p>
          <a href="/admin/report-builder" className="text-purple-600 hover:underline mt-2 block">
            Build Reports →
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard