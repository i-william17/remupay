'use client'
import React from 'react'
import { motion } from 'framer-motion'
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
  FiMenu
} from 'react-icons/fi'
import { MdPayment } from 'react-icons/md'
import { MdOutlinePointOfSale, MdPayments } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navItems = [
    { icon: <FiHome size={20} />, label: 'Dashboard', href: '/dashboard' },
    { icon: <FiPieChart size={20} />, label: 'Analytics', href: '/analytics' },
    { icon: <MdPayment size={20} />, label: 'M-Pesa', href: '/mpesa', badge: 'New' },
    { icon: <MdOutlinePointOfSale size={20} />, label: 'Sales', href: '/sales' },
    { icon: <FiDollarSign size={20} />, label: 'Revenue', href: '/revenue' },
    { icon: <FiUsers size={20} />, label: 'Customers', href: '/customers' },
    { icon: <FiShoppingBag size={20} />, label: 'Products', href: '/products' },
    { icon: <MdPayments size={20} />, label: 'Expenses', href: '/expenses' },
    { icon: <FiSettings size={20} />, label: 'Settings', href: '/settings' }
  ]

  const quickActions = [
    { label: 'New Sale', color: 'bg-[#8C5EFF]' },
    { label: 'Add Customer', color: 'bg-[#F95738]' },
    { label: 'Record Expense', color: 'bg-[#3E0D4C]' }
  ]

  return (
    <motion.div 
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 flex flex-col border-r border-gray-200`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-[#8C5EFF] rounded-lg flex items-center justify-center">
            <FiDollarSign className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">SME<span className="text-[#8C5EFF]">Pro</span></h1>
        </div>
        <button 
          onClick={toggleSidebar}
          className="p-1 rounded-lg hover:bg-gray-100 text-gray-500"
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src="/user-avatar.jpg"
              width={40}
              height={40}
              alt="User"
              className="rounded-full"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">John Kamau</h3>
            <p className="text-sm text-gray-500">Premium Plan</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <FiChevronDown />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Quick Actions</h3>
        <div className="space-y-2">
          {quickActions.map((action, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`${action.color} text-white w-full py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center space-x-2`}
            >
              <span>{action.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto p-2">
        <nav className="space-y-1">
          {navItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <motion.div
                whileHover={{ backgroundColor: '#F4F0ED' }}
                className={`flex items-center px-3 py-2.5 rounded-lg text-gray-700 hover:text-[#8C5EFF] transition-colors ${
                  item.label === 'Analytics' ? 'bg-[#F4F0ED] text-[#8C5EFF]' : ''
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-[#F95738] text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-3">
          <button className="flex items-center space-x-3 text-gray-700 hover:text-[#8C5EFF] w-full">
            <FiBell size={18} />
            <span>Notifications</span>
            <span className="ml-auto bg-[#8C5EFF] text-white text-xs px-2 py-0.5 rounded-full">3</span>
          </button>
          
          <button className="flex items-center space-x-3 text-gray-700 hover:text-[#8C5EFF] w-full">
            <FiHelpCircle size={18} />
            <span>Help & Support</span>
          </button>
          
          <button className="flex items-center space-x-3 text-gray-700 hover:text-[#8C5EFF] w-full">
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

        {/* App Version */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">Version 2.1.0</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Sidebar