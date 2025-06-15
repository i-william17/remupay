'use client'
import React, { useState } from 'react'
import Sidebar from './sidebar'
import DashboardHeader from './header'
import AnalyticsDashboard from './analytics'

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen">
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
      />
      
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