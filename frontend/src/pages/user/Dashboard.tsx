import React from 'react'

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Analytics</h3>
          <p className="text-gray-600">View your tracking analytics</p>
          <a href="/analytics" className="text-blue-600 hover:underline mt-2 block">
            Go to Analytics →
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Reports</h3>
          <p className="text-gray-600">Generate and view reports</p>
          <a href="/reports" className="text-blue-600 hover:underline mt-2 block">
            View Reports →
          </a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Bookmarks</h3>
          <p className="text-gray-600">Manage your bookmarks</p>
          <a href="/bookmarks" className="text-blue-600 hover:underline mt-2 block">
            View Bookmarks →
          </a>
        </div>
      </div>
    </div>
  )
}

export default Dashboard