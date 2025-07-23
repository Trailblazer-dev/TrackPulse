import React from 'react'

const Landing = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to TrackPulse
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your comprehensive tracking and analytics platform
        </p>
        <div className="space-x-4">
          <a 
            href="/explore" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore Features
          </a>
          <a 
            href="/about" 
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  )
}

export default Landing