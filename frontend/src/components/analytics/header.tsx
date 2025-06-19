'use client'
import React, { useState, useEffect, useRef } from 'react'
import { 
  FiBell, FiSearch, FiMenu, FiHelpCircle, FiDownload, 
  FiX, FiUser, FiSettings, FiMessageSquare, FiCalendar,
  FiPlus, FiFilter, FiRefreshCw, FiExternalLink, FiLogOut, FiShoppingBag
} from 'react-icons/fi'
import { 
  MdPayment, MdOutlinePointOfSale, MdOutlineNotificationsActive,
  MdOutlineAccountBalanceWallet, MdOutlineAnalytics
} from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { Tooltip } from '@nextui-org/tooltip'
import { Badge } from '@nextui-org/badge'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown'
import { useTheme } from 'next-themes'
import { Switch } from '@nextui-org/switch'
import { Avatar } from '@nextui-org/avatar'

interface DashboardHeaderProps {
  toggleSidebar: () => void
  isMobile: boolean
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ toggleSidebar, isMobile }) => {
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('Overview')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [unreadNotifications, setUnreadNotifications] = useState(5)
  const [quickActionsOpen, setQuickActionsOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const tabs = [
    { name: 'Overview', path: '/analytics', icon: <MdOutlineAnalytics className="text-lg" /> },
    { name: 'Revenue', path: '/analytics/revenue', icon: <MdOutlineAccountBalanceWallet className="text-lg" /> },
    { name: 'Customers', path: '/analytics/customers', icon: <FiUser className="text-lg" /> },
    { name: 'Products', path: '/analytics/products', icon: <FiShoppingBag className="text-lg" /> },
    { name: 'M-Pesa', path: '/analytics/mpesa', icon: <MdPayment className="text-lg" />, badge: 'New' },
    { name: 'Reports', path: '/analytics/reports', icon: <FiDownload className="text-lg" /> }
  ]

  const notifications = [
    {
      id: 1,
      title: 'New M-Pesa payment',
      description: 'KES 12,500 received from John Doe',
      time: '2 mins ago',
      read: false,
      icon: <MdPayment className="text-emerald-500 text-xl" />,
      action: () => router.push('/transactions/123')
    },
    {
      id: 2,
      title: 'Weekly report ready',
      description: 'Your weekly analytics report is generated',
      time: '1 hour ago',
      read: true,
      icon: <FiDownload className="text-blue-500 text-xl" />,
      action: () => window.open('/reports/weekly')
    },
    {
      id: 3,
      title: 'New sale recorded',
      description: 'Order #4567 for KES 8,200',
      time: '3 hours ago',
      read: false,
      icon: <MdOutlinePointOfSale className="text-purple-500 text-xl" />,
      action: () => router.push('/sales/4567')
    },
    {
      id: 4,
      title: 'Account activity',
      description: 'New login from Nairobi, Kenya',
      time: '5 hours ago',
      read: false,
      icon: <FiUser className="text-amber-500 text-xl" />,
      action: () => router.push('/security')
    },
    {
      id: 5,
      title: 'Scheduled maintenance',
      description: 'System update scheduled for tonight at 2:00 AM',
      time: '1 day ago',
      read: true,
      icon: <FiSettings className="text-gray-500 text-xl" />,
      action: () => {}
    }
  ]

  const quickActions = [
    { label: 'New Sale', icon: <MdOutlinePointOfSale />, action: () => router.push('/sales/new') },
    { label: 'Add Customer', icon: <FiUser />, action: () => router.push('/customers/new') },
    { label: 'Record Expense', icon: <MdPayment />, action: () => router.push('/expenses/new') },
    { label: 'Generate Report', icon: <FiDownload />, action: () => router.push('/reports/generate') },
    { label: 'Schedule Task', icon: <FiCalendar />, action: () => router.push('/tasks/new') }
  ]

  const userMenuItems = [
    { key: 'profile', label: 'My Profile', icon: <FiUser />, action: () => router.push('/profile') },
    { key: 'settings', label: 'Settings', icon: <FiSettings />, action: () => router.push('/settings') },
    { key: 'messages', label: 'Messages', icon: <FiMessageSquare />, action: () => router.push('/messages') },
    { key: 'divider', label: 'divider' },
    { key: 'logout', label: 'Log Out', icon: <FiLogOut />, action: () => router.push('/logout') }
  ]

  const markAllAsRead = () => {
    setUnreadNotifications(0)
    setNotificationsOpen(false)
  }

  const handleTabClick = (tab: { name: string; path: string }) => {
    setActiveTab(tab.name)
    router.push(tab.path)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      setUnreadNotifications(prev => prev - 1)
    }
    notification.action()
    setNotificationsOpen(false)
  }

  useEffect(() => {
    // Auto-focus search when opened
    if (searchOpen && searchRef.current) {
      searchRef.current.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    // Close notifications when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.notifications-dropdown') && !target.closest('.notifications-button')) {
        setNotificationsOpen(false)
      }
      if (!target.closest('.search-container') && !target.closest('.search-button')) {
        setSearchOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 shadow-sm">
      <div className="px-4 sm:px-6 py-3">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-2">
          {/* Left Side */}
          <div className="flex items-center space-x-3">
            <Tooltip content="Toggle sidebar" placement="bottom">
              <button 
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors lg:hidden"
              >
                <FiMenu size={20} />
              </button>
            </Tooltip>
            
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white hidden md:block">
              Business <span className="text-[#8C5EFF]">Analytics</span>
            </h1>
            
            {/* Desktop Search */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search reports, metrics..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#8C5EFF] focus:border-transparent outline-none transition-all bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Right Side */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Mobile Search */}
            <Tooltip content="Search" placement="bottom">
              <button 
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 lg:hidden search-button"
              >
                <FiSearch size={20} />
              </button>
            </Tooltip>

            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute right-0 left-0 top-0 bg-white dark:bg-gray-900 p-2 shadow-md lg:hidden z-50 search-container"
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <FiSearch className="text-gray-400" />
                    </div>
                    <input
                      ref={searchRef}
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-10 py-2 w-full border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#8C5EFF] focus:border-transparent outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button 
                      onClick={() => setSearchOpen(false)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <FiX className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Actions */}
            <Tooltip content="Quick actions" placement="bottom">
              <Dropdown>
                <DropdownTrigger>
                  <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors">
                    <FiPlus size={20} />
                  </button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="Quick Actions"
                  className="w-48"
                >
                  {quickActions.map((action) => (
                    <DropdownItem 
                      key={action.label}
                      startContent={action.icon}
                      onClick={action.action}
                    >
                      {action.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </Tooltip>

            {/* Refresh */}
            <Tooltip content="Refresh data" placement="bottom">
              <button 
                onClick={handleRefresh}
                className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
                disabled={isRefreshing}
              >
                <FiRefreshCw size={20} />
              </button>
            </Tooltip>

            {/* Theme Toggle */}
            <Tooltip content={theme === 'dark' ? 'Light mode' : 'Dark mode'} placement="bottom">
              <Switch
                isSelected={theme === 'dark'}
                onValueChange={(isSelected) => setTheme(isSelected ? 'dark' : 'light')}
                size="sm"
                color="secondary"
                thumbIcon={({ isSelected }) =>
                  isSelected ? (
                    <span className="text-yellow-400">☀️</span>
                  ) : (
                    <span className="text-gray-600">🌙</span>
                  )
                }
              />
            </Tooltip>

            {/* Help Center */}
            <Tooltip content="Help center" placement="bottom">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors hidden sm:block">
                <FiHelpCircle size={20} />
              </button>
            </Tooltip>
            
            {/* Notifications */}
            <div className="relative notifications-dropdown">
              <Tooltip content="Notifications" placement="bottom">
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 relative notifications-button transition-colors"
                >
                  <Badge 
                    content={unreadNotifications} 
                    color="danger" 
                    size="sm"
                    isInvisible={unreadNotifications === 0}
                  >
                    <FiBell size={20} />
                  </Badge>
                </button>
              </Tooltip>
              
              {/* Notifications Dropdown */}
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                      <div className="flex space-x-2">
                        <button 
                          onClick={markAllAsRead}
                          className="text-sm text-[#8C5EFF] font-medium hover:text-[#7a4de6] dark:hover:text-[#9d7aff]"
                        >
                          Mark all as read
                        </button>
                      </div>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div 
                          key={notification.id} 
                          className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                            !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                          }`}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex space-x-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {notification.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {notification.description}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
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
                    <div className="p-3 border-t border-gray-200 dark:border-gray-700 text-center bg-gray-50 dark:bg-gray-900">
                      <button 
                        className="text-sm text-[#8C5EFF] font-medium hover:text-[#7a4de6] dark:hover:text-[#9d7aff]"
                        onClick={() => {
                          router.push('/notifications')
                          setNotificationsOpen(false)
                        }}
                      >
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* User Profile */}
            <Dropdown>
              <DropdownTrigger>
                <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer">
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    size="sm"
                    src="/user-avatar.jpg"
                  />
                  {!isMobile && (
                    <div className="text-left hidden md:block">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">John Kamau</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                    </div>
                  )}
                </div>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="User Menu"
                className="w-56"
              >
                {userMenuItems.map((item) => (
                  item.key === 'divider' ? (
                    <DropdownItem key={item.key} className="divider" showDivider />
                  ) : (
                    <DropdownItem 
                      key={item.key}
                      startContent={item.icon}
                      onClick={item.action}
                      className={item.key === 'logout' ? 'text-danger' : ''}
                    >
                      {item.label}
                    </DropdownItem>
                  )
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 sm:space-x-4 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab)}
              className={`relative px-3 py-2 text-sm font-medium whitespace-nowrap focus:outline-none transition-colors flex items-center space-x-2 ${
                pathname.startsWith(tab.path) 
                  ? 'text-[#8C5EFF] dark:text-[#9d7aff]' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.5 text-xs rounded-full bg-[#8C5EFF] text-white ml-1">
                  {tab.badge}
                </span>
              )}
              {pathname.startsWith(tab.path) && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C5EFF] dark:bg-[#9d7aff]"
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