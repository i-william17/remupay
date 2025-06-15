'use client'
import React, { useState } from 'react'
import { FiBell, FiSearch, FiMenu, FiHelpCircle, FiDownload } from 'react-icons/fi'
import { MdOutlineNotificationsActive } from 'react-icons/md'
import { MdPayment } from 'react-icons/md'
import { motion } from 'framer-motion'
import Image from 'next/image' 

interface DashboardHeaderProps {
  toggleSidebar: () => void
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ toggleSidebar }) => {
  const [activeTab, setActiveTab] = useState('Overview')
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  const tabs = [
    'Overview',
    'Revenue',
    'Customers',
    'Products',
    'M-Pesa',
    'Reports'
  ]

  const notifications = [
    {
      id: 1,
      title: 'New M-Pesa payment',
      description: 'KES 12,500 received from John Doe',
      time: '2 mins ago',
      read: false,
      icon: <MdPayment className="text-green-500" />
    },
    {
      id: 2,
      title: 'Weekly report ready',
      description: 'Your weekly analytics report is generated',
      time: '1 hour ago',
      read: true,
      icon: <FiDownload className="text-blue-500" />
    }
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          {/* Left Side */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 lg:hidden"
            >
              <FiMenu size={20} />
            </button>
            
            <h1 className="text-2xl font-bold text-gray-900 hidden md:block">
              Business <span className="text-[#8C5EFF]">Analytics</span>
            </h1>
            
            <div className="relative hidden lg:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search reports, metrics..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8C5EFF] focus:border-[#8C5EFF] outline-none transition-all"
              />
            </div>
          </div>
          
          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 relative">
              <FiHelpCircle size={20} />
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 relative"
              >
                <FiBell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                >
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      <button className="text-sm text-[#8C5EFF]">Mark all as read</button>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-4 hover:bg-gray-50 cursor-pointer ${!notification.read ? 'bg-blue-50' : ''}`}
                      >
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            {notification.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {notification.description}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="flex-shrink-0">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-200 text-center">
                    <button className="text-sm text-[#8C5EFF] font-medium">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src="/user-avatar.jpg"
                  width={36}
                  height={36}
                  alt="User"
                  className="rounded-full"
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">John Kamau</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex items-center space-x-6 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none ${
                activeTab === tab ? 'text-[#8C5EFF]' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C5EFF]"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader