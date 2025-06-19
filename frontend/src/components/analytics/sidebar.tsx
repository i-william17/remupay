'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiHome,
  FiPieChart,
  FiDollarSign,
  FiUsers,
  FiShoppingBag,
  FiSettings,
  FiBell,
  FiHelpCircle,
  FiLogOut,
  FiChevronDown,
  FiMenu,
  FiChevronRight,
  FiSearch,
  FiPlus
} from 'react-icons/fi'
import { MdPayment, MdOutlineNotificationsActive } from 'react-icons/md'
import { MdOutlinePointOfSale, MdPayments } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
  isMobile: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, isMobile }) => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [unreadNotifications, setUnreadNotifications] = useState(3)
  const [searchQuery, setSearchQuery] = useState('')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState('Analytics')

  const navItems = [
    { icon: <FiHome size={20} />, label: 'Dashboard', href: '/dashboard' },
    {
      icon: <FiPieChart size={20} />,
      label: 'Analytics',
      href: '/analytics',
      submenu: [
        { label: 'Reports', href: '/analytics/reports' },
        { label: 'Statistics', href: '/analytics/statistics' },
        { label: 'Export Data', href: '/analytics/export' }
      ]
    },
    { icon: <MdPayment size={20} />, label: 'M-Pesa', href: '/mpesa', badge: 'New' },
    { icon: <MdOutlinePointOfSale size={20} />, label: 'Sales', href: '/sales' },
    {
      icon: <FiDollarSign size={20} />,
      label: 'Revenue',
      href: '/revenue',
      submenu: [
        { label: 'Daily', href: '/revenue/daily' },
        { label: 'Weekly', href: '/revenue/weekly' },
        { label: 'Monthly', href: '/revenue/monthly' }
      ]
    },
    { icon: <FiUsers size={20} />, label: 'Customers', href: '/customers' },
    { icon: <FiShoppingBag size={20} />, label: 'Products', href: '/products' },
    { icon: <MdPayments size={20} />, label: 'Expenses', href: '/expenses' },
    { icon: <FiSettings size={20} />, label: 'Settings', href: '/settings' }
  ]

  const quickActions = [
    { label: 'New Sale', color: 'from-purple-600 to-purple-500', icon: <MdOutlinePointOfSale size={16} /> },
    { label: 'Add Customer', color: 'from-orange-500 to-pink-500', icon: <FiUsers size={16} /> },
    { label: 'Record Expense', color: 'from-indigo-600 to-purple-800', icon: <MdPayments size={16} /> }
  ]

  const filteredNavItems = navItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleSubmenu = (label: string) => {
    setActiveSubmenu(activeSubmenu === label ? null : label)
  }

  const clearNotifications = () => {
    setUnreadNotifications(0)
  }

  useEffect(() => {
    if (isMobile) {
      setIsCollapsed(!isOpen)
    }
  }, [isMobile, isOpen])

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={{ x: isMobile ? -300 : 0 }}
        animate={{
          x: isOpen ? 0 : (isMobile ? -300 : 0),
          width: isCollapsed ? '80px' : '288px'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed inset-y-0 left-0 bg-gradient-to-b from-white to-gray-50 shadow-xl z-50 flex flex-col border-r border-gray-100 ${isCollapsed ? 'w-20' : 'w-72'}`}
      >
        {/* Sidebar Header */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center p-3' : 'justify-between p-5'} border-b border-gray-100 bg-white`}>
          {!isCollapsed ? (
            <>
              <Image 
              src="/4-nobg.png" 
              width={70} 
              height={70} 
              alt="Logo" 
              className="rounded-full" />

              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-all duration-200"
              >
                <FiMenu size={20} />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-all duration-200"
            >
              <FiMenu size={20} />
            </button>
          )}
        </div>

        {/* Search Bar (only visible when expanded) */}
        {!isCollapsed && (
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search menu..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        )}

        {/* User Profile (collapsed shows just avatar) */}
        <div className={`p-4 border-b border-gray-100 bg-white ${isCollapsed ? 'flex justify-center' : ''}`}>
          <div className={`flex items-center ${isCollapsed ? 'space-x-0' : 'space-x-4'}`}>
            <div className="relative">
              <div className={`relative overflow-hidden rounded-xl border-2 border-white shadow-md ${isCollapsed ? 'w-10 h-10' : 'w-12 h-12'}`}>
                <Image
                  src="/two.jpg"
                  width={isCollapsed ? 40 : 48}
                  height={isCollapsed ? 40 : 48}
                  alt="User"
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">John Kamau</h3>
                <p className="text-sm text-gray-500 truncate">Premium Plan</p>
              </div>
            )}
            {!isCollapsed && (
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <FiChevronDown className="transform transition-transform duration-200 hover:rotate-180" />
              </button>
            )}
          </div>
        </div>



        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto p-2">
          <nav className="space-y-1">
            {filteredNavItems.map((item, index) => (
              <div key={index}>
                <motion.div
                  whileHover={{ x: isCollapsed ? 0 : 5 }}
                  onClick={() => {
                    setActiveItem(item.label);
                    if (item.submenu) toggleSubmenu(item.label);
                  }}
                  className={`flex items-center ${isCollapsed ? 'justify-center p-3 rounded-lg' : 'px-4 py-3 rounded-xl'
                    } text-gray-600 hover:text-purple-600 transition-all duration-200 group ${activeItem === item.label ? 'bg-purple-50 text-purple-600' : 'hover:bg-gray-50'
                    }`}
                >
                  <Link href={item.href} passHref className="flex items-center w-full">
                    <span
                      className={`${isCollapsed ? '' : 'mr-3'} ${activeItem === item.label
                        ? 'text-purple-600'
                        : 'text-gray-400 group-hover:text-purple-500'
                        }`}
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <>
                        <span className="font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-orange-500 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                            {item.badge}
                          </span>
                        )}
                        {item.submenu && (
                          <FiChevronRight
                            className={`ml-2 text-gray-400 transition-transform duration-200 ${activeSubmenu === item.label ? 'rotate-90' : ''
                              }`}
                          />
                        )}
                      </>
                    )}
                  </Link>
                </motion.div>

                {/* Submenu items */}
                {!isCollapsed && item.submenu && activeSubmenu === item.label && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 pl-4 border-l-2 border-gray-200"
                  >
                    {item.submenu.map((subItem, subIndex) => (
                      <motion.div
                        key={subIndex}
                        whileHover={{ x: 5 }}
                        className="flex items-center px-3 py-2 text-sm text-gray-500 hover:text-purple-600 transition-all duration-200"
                      >
                        <Link href={subItem.href} passHref className="flex items-center w-full">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mr-3"></span>
                          {subItem.label}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className={`p-4 border-t border-gray-100 bg-white ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
          <div className={`${isCollapsed ? 'space-y-3' : 'space-y-4'}`}>
            <button
              className={`flex items-center ${isCollapsed ? 'justify-center p-2 rounded-lg' : 'space-x-3'} text-gray-600 hover:text-purple-600 w-full group`}
              onClick={clearNotifications}
            >
              <div className={`${isCollapsed ? 'p-1.5' : 'p-1.5'} bg-gray-100 rounded-lg group-hover:bg-purple-100 transition-colors duration-200 relative`}>
                <FiBell size={18} className="text-gray-500 group-hover:text-purple-600" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                    {unreadNotifications}
                  </span>
                )}
              </div>
              {!isCollapsed && (
                <>
                  <span>Notifications</span>
                  {unreadNotifications > 0 && (
                    <span className="ml-auto bg-purple-600 text-white text-xs px-2 py-1 rounded-full shadow-sm">
                      {unreadNotifications}
                    </span>
                  )}
                </>
              )}
            </button>

            <button className={`flex items-center ${isCollapsed ? 'justify-center p-2 rounded-lg' : 'space-x-3'} text-gray-600 hover:text-purple-600 w-full group`}>
              <div className={`${isCollapsed ? 'p-1.5' : 'p-1.5'} bg-gray-100 rounded-lg group-hover:bg-purple-100 transition-colors duration-200`}>
                <FiHelpCircle size={18} className="text-gray-500 group-hover:text-purple-600" />
              </div>
              {!isCollapsed && <span>Help & Support</span>}
            </button>

            <button className={`flex items-center ${isCollapsed ? 'justify-center p-2 rounded-lg' : 'space-x-3'} text-gray-600 hover:text-red-600 w-full group`}>
              <div className={`${isCollapsed ? 'p-1.5' : 'p-1.5'} bg-gray-100 rounded-lg group-hover:bg-red-100 transition-colors duration-200`}>
                <FiLogOut size={18} className="text-gray-500 group-hover:text-red-600" />
              </div>
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>

          {/* App Version */}
          {!isCollapsed && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 tracking-wide">Version 2.1.0</p>
            </div>
          )}
        </div>
      </motion.div>
    </>
  )
}

export default Sidebar