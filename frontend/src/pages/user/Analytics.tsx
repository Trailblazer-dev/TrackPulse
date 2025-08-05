import React from 'react'
import { analytics } from '../../utils/user/user'

const Analytics = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-themed mb-8">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.values(analytics).map((section, idx) => (
          <div
            key={idx}
            className="surface rounded-xl shadow-themed-md p-6 border border-themed/10"
          >
            <h3 className="text-xl font-semibold text-themed mb-4">{section.title}</h3>
            <div className="h-48 flex items-center justify-center text-muted">[Chart Placeholder]</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Analytics