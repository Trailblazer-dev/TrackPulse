import React from 'react'
import { reports } from '../../utils/user/user'

const Reports = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-themed mb-8">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {/* Recent Reports */}
        <div className="surface rounded-xl shadow-themed-md p-6 border border-themed/10">
          <h3 className="text-xl font-semibold text-themed mb-4">{reports.recentReports.title}</h3>
          <ul className="divide-y divide-themed/10">
            {reports.recentReports.reports.map((r, idx) => (
              <li key={idx} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="font-medium text-themed">{r.name}</span>
                  <span className="ml-2 text-xs text-muted">{r.type}</span>
                </div>
                <div className="flex items-center space-x-4 mt-2 md:mt-0">
                  <span className="text-xs text-muted">{r.date}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    r.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' :
                    r.status === 'Scheduled' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' :
                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300'
                  }`}>
                    {r.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Scheduled Reports */}
        <div className="surface rounded-xl shadow-themed-md p-6 border border-themed/10">
          <h3 className="text-xl font-semibold text-themed mb-4">{reports.scheduledReports.title}</h3>
          <ul className="divide-y divide-themed/10">
            {reports.scheduledReports.reports.map((r, idx) => (
              <li key={idx} className="py-3 flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <span className="font-medium text-themed">{r.name}</span>
                  <span className="ml-2 text-xs text-muted">{r.type}</span>
                </div>
                <div className="flex items-center space-x-4 mt-2 md:mt-0">
                  <span className="text-xs text-muted">{r.date}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    r.status === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' :
                    r.status === 'Scheduled' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' :
                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300'
                  }`}>
                    {r.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Report Templates */}
      <div className="surface rounded-xl shadow-themed-md p-6 border border-themed/10 mb-8">
        <h3 className="text-xl font-semibold text-themed mb-4">{reports.reportTemplates.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.reportTemplates.templates.map((tpl, idx) => (
            <div key={idx} className="surface-accent rounded-lg p-4 border border-themed/10 shadow-sm">
              <div className="font-semibold text-themed mb-2">{tpl.name}</div>
              <div className="text-muted text-sm mb-1">{tpl.description}</div>
              <div className="text-xs text-primary font-bold">{tpl.category}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Export Options */}
      <div className="surface rounded-xl shadow-themed-md p-6 border border-themed/10">
        <h3 className="text-xl font-semibold text-themed mb-4">Export & Schedule</h3>
        <div className="flex flex-col md:flex-row md:items-center md:space-x-12 space-y-4 md:space-y-0">
          <div>
            <div className="text-sm text-muted mb-2">Export Formats:</div>
            <div className="flex flex-wrap gap-2">
              {reports.exportOptions.formats.map((fmt, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{fmt}</span>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted mb-2">Schedule Options:</div>
            <div className="flex flex-wrap gap-2">
              {reports.exportOptions.scheduleOptions.map((opt, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-medium dark:bg-blue-900/40 dark:text-blue-300">{opt}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports