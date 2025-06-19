'use client'
import React, { useState } from 'react'
import DashboardHeader from './header'
import AnalyticsDashboard from './analytics'

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  return (
    <div className="flex h-screen">
      <div className={`flex-none w-64 bg-white border-r border-gray-200 dark:bg-gray-900 dark:border-gray-800 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Sidebar content */}
      </div>

      <div className="flex-1 overflow-auto">
        <DashboardHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="p-6">
          <AnalyticsDashboard />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout