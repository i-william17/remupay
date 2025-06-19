'use client'
import React, { useState, useEffect } from 'react'
import { BarChart, PieChart, LineChart, DoughnutChart } from './chart'
import { 
  FiTrendingUp, FiDollarSign, FiUsers, FiCreditCard, 
  FiShoppingCart, FiDownload, FiFilter, FiRefreshCw,
  FiCalendar, FiPlus, FiMoreVertical, FiEye, FiPrinter
} from 'react-icons/fi'
import { MdPayment, MdLocationOn, MdStore, MdOutlineReceipt } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'
import { Tooltip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Badge } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const AnalyticsDashboard = () => {
  const { theme } = useTheme()
  const [dateRange, setDateRange] = useState([new Date(), new Date()])
  const [startDate, endDate] = dateRange
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [exportOpen, setExportOpen] = useState(false)
  const [selectedMetrics, setSelectedMetrics] = useState(['sales', 'customers', 'conversion'])

  // Enhanced mock data with more dimensions
  const performanceData = {
    monthlyRevenue: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Revenue (KES)',
          data: [450000, 590000, 680000, 810000, 920000, 1050000, 1240000],
          backgroundColor: 'rgba(140, 94, 255, 0.2)',
          borderColor: '#8C5EFF',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        },
        {
          label: 'Expenses (KES)',
          data: [320000, 380000, 420000, 450000, 510000, 580000, 620000],
          backgroundColor: 'rgba(249, 87, 56, 0.2)',
          borderColor: '#F95738',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        }
      ]
    },
    paymentMethods: {
      labels: ['M-Pesa', 'Card', 'Bank Transfer', 'Cash', 'Other'],
      datasets: [
        {
          data: [68, 15, 12, 3, 2],
          backgroundColor: [
            '#8C5EFF', 
            '#F95738', 
            '#3E0D4C', 
            '#F9A825',
            '#6C757D'
          ],
          borderWidth: 0
        }
      ]
    },
    customerDemographics: {
      labels: ['18-25', '26-35', '36-45', '45+'],
      datasets: [
        {
          label: 'Customers',
          data: [25, 45, 20, 10],
          backgroundColor: [
            'rgba(140, 94, 255, 0.7)',
            'rgba(249, 87, 56, 0.7)',
            'rgba(62, 13, 76, 0.7)',
            'rgba(249, 168, 37, 0.7)'
          ],
          borderRadius: 6,
          borderWidth: 0
        }
      ]
    },
    regionalSales: {
      labels: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Thika', 'Kitale'],
      datasets: [
        {
          label: 'Sales (KES)',
          data: [620000, 380000, 290000, 210000, 180000, 150000, 120000],
          backgroundColor: '#8C5EFF',
          borderRadius: 6
        }
      ]
    },
    customerSatisfaction: {
      labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Unsatisfied', 'Very Unsatisfied'],
      datasets: [
        {
          data: [35, 40, 15, 7, 3],
          backgroundColor: [
            '#10B981',
            '#8C5EFF',
            '#6C757D',
            '#F9A825',
            '#F95738'
          ],
          borderWidth: 0
        }
      ]
    },
    keyMetrics: {
      totalSales: '1,240,500 KES',
      mpesaTransactions: '1,842',
      newCustomers: '328',
      conversionRate: '24%',
      avgOrderValue: '3,750 KES',
      customerRetention: '78%',
      expenses: '620,000 KES',
      netProfit: '620,500 KES',
      customerSatisfaction: '4.2/5'
    },
    recentTransactions: [
      { 
        id: '#MP-84512', 
        amount: 'KES 12,500', 
        method: 'M-Pesa', 
        location: 'Nairobi CBD',
        status: 'Completed',
        timestamp: '2 mins ago',
        customer: 'John Kamau'
      },
      { 
        id: '#MP-84511', 
        amount: 'KES 8,200', 
        method: 'M-Pesa', 
        location: 'Westlands',
        status: 'Completed',
        timestamp: '15 mins ago',
        customer: 'Sarah Mwangi'
      },
      { 
        id: '#CRD-3241', 
        amount: 'KES 24,000', 
        method: 'Card', 
        location: 'Mombasa',
        status: 'Pending',
        timestamp: '1 hour ago',
        customer: 'David Ochieng'
      },
      { 
        id: '#BNK-7821', 
        amount: 'KES 56,300', 
        method: 'Bank Transfer', 
        location: 'Kisumu',
        status: 'Completed',
        timestamp: '3 hours ago',
        customer: 'Grace Atieno'
      },
      { 
        id: '#MP-84510', 
        amount: 'KES 5,700', 
        method: 'M-Pesa', 
        location: 'Thika',
        status: 'Failed',
        timestamp: '5 hours ago',
        customer: 'James Mutua'
      },
    ]
  }

  const exportOptions = [
    { key: 'pdf', label: 'PDF Report', icon: <FiDownload /> },
    { key: 'csv', label: 'CSV Data', icon: <FiDownload /> },
    { key: 'print', label: 'Print', icon: <FiPrinter /> },
    { key: 'share', label: 'Share', icon: <FiEye /> }
  ]

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500)
  }

  const toggleMetric = (metric: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric) 
        : [...prev, metric]
    )
  }

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-800/10 p-6 border border-gray-200 dark:border-gray-800 transition-colors`}>
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            Business Analytics Dashboard
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-400">
            Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              className="bg-gray-50 dark:bg-gray-800 pl-10 pr-4 py-2 rounded-lg text-sm text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 focus:border-[#8C5EFF] focus:ring-1 focus:ring-[#8C5EFF]"
              placeholderText="Select date range"
            />
            <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
          </div>
          
          <Dropdown>
            <DropdownTrigger>
              <button className="flex items-center gap-2 bg-[#8C5EFF] hover:bg-[#7D4AFF] text-white px-4 py-2 rounded-lg text-sm transition-colors">
                <FiDownload /> Export
              </button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Export options"
              onAction={(key) => setExportOpen(false)}
            >
              {exportOptions.map((option) => (
                <DropdownItem 
                  key={option.key}
                  startContent={option.icon}
                >
                  {option.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          
          <Tooltip content="Refresh data" placement="bottom">
            <button 
              onClick={handleRefresh}
              className={`flex items-center gap-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                isRefreshing ? 'animate-spin' : ''
              }`}
              disabled={isRefreshing}
            >
              <FiRefreshCw />
              {!isRefreshing && <span>Refresh</span>}
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'revenue', label: 'Revenue' },
          { id: 'customers', label: 'Customers' },
          { id: 'products', label: 'Products' },
          { id: 'mpesa', label: 'M-Pesa' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-2 text-sm font-medium focus:outline-none ${
              activeTab === tab.id
                ? 'text-[#8C5EFF] dark:text-[#9d7aff]'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8C5EFF] dark:bg-[#9d7aff]"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 mb-8">
        <MetricCard 
          icon={<FiDollarSign className="text-[#8C5EFF]" size={20} />}
          title="Total Sales"
          value={performanceData.keyMetrics.totalSales}
          change="+12%"
          trend="up"
          tooltip="Total revenue generated this period"
        />
        <MetricCard 
          icon={<MdPayment className="text-[#F95738]" size={20} />}
          title="M-Pesa TXs"
          value={performanceData.keyMetrics.mpesaTransactions}
          change="+18%"
          trend="up"
          tooltip="Mobile money transactions processed"
        />
        <MetricCard 
          icon={<FiUsers className="text-[#3E0D4C]" size={20} />}
          title="New Customers"
          value={performanceData.keyMetrics.newCustomers}
          change="+8%"
          trend="up"
          tooltip="New customer acquisitions"
        />
        <MetricCard 
          icon={<FiTrendingUp className="text-[#F9A825]" size={20} />}
          title="Conversion Rate"
          value={performanceData.keyMetrics.conversionRate}
          change="+3%"
          trend="up"
          tooltip="Visitor to customer conversion rate"
        />
        <MetricCard 
          icon={<FiShoppingCart className="text-[#8C5EFF]" size={20} />}
          title="Avg Order Value"
          value={performanceData.keyMetrics.avgOrderValue}
          change="+5%"
          trend="up"
          tooltip="Average transaction amount"
        />
        <MetricCard 
          icon={<MdStore className="text-[#F95738]" size={20} />}
          title="Retention Rate"
          value={performanceData.keyMetrics.customerRetention}
          change="+2%"
          trend="up"
          tooltip="Repeat customer percentage"
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Trend Chart */}
        <ChartContainer 
          title="Revenue & Expenses Trend"
          description="Financial performance over time"
          tooltip="Compare revenue and expenses"
          initialDelay={0.2}
          actionButtons={
            <div className="flex space-x-2">
              <button 
                className={`text-xs px-2 py-1 rounded-md ${
                  selectedMetrics.includes('sales') 
                    ? 'bg-[#8C5EFF] text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => toggleMetric('sales')}
              >
                Revenue
              </button>
              <button 
                className={`text-xs px-2 py-1 rounded-md ${
                  selectedMetrics.includes('expenses') 
                    ? 'bg-[#F95738] text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => toggleMetric('expenses')}
              >
                Expenses
              </button>
            </div>
          }
        >
          <div className="h-80">
            <LineChart 
              data={{
                ...performanceData.monthlyRevenue,
                datasets: performanceData.monthlyRevenue.datasets.filter(d => 
                  (d.label.includes('Revenue') && selectedMetrics.includes('sales')) ||
                  (d.label.includes('Expenses') && selectedMetrics.includes('expenses'))
                )
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      color: theme === 'dark' ? '#E5E7EB' : '#374151'
                    }
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return context.dataset.label + ': KES ' + context.raw.toLocaleString()
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: false,
                    ticks: {
                      color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
                      callback: function(value) {
                        return 'KES ' + (value / 1000).toLocaleString() + 'K'
                      }
                    },
                    grid: {
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                    }
                  },
                  x: {
                    ticks: {
                      color: theme === 'dark' ? '#9CA3AF' : '#6B7280'
                    },
                    grid: {
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                    }
                  }
                }
              }}
            />
          </div>
        </ChartContainer>

        {/* Payment Methods Pie Chart */}
        <ChartContainer 
          title="Payment Methods Distribution"
          description="Transaction breakdown by type"
          tooltip="Customer payment preferences"
          initialDelay={0.4}
        >
          <div className="h-80 flex items-center justify-center">
            <DoughnutChart 
              data={performanceData.paymentMethods}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      color: theme === 'dark' ? '#E5E7EB' : '#374151'
                    }
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `${context.label}: ${context.raw}% (KES ${Math.round(context.raw * 1240500 / 100).toLocaleString()})`
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </ChartContainer>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Customer Demographics */}
        <ChartContainer 
          title="Customer Age Groups"
          description="Customer distribution by age"
          tooltip="Understand your customer base demographics"
          initialDelay={0.6}
        >
          <div className="h-72">
            <BarChart 
              data={performanceData.customerDemographics}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `${context.raw}% of customers`
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    max: 50,
                    ticks: {
                      color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
                      callback: function(value) {
                        return value + '%'
                      }
                    },
                    grid: {
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                    }
                  },
                  x: {
                    ticks: {
                      color: theme === 'dark' ? '#9CA3AF' : '#6B7280'
                    },
                    grid: {
                      color: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                    }
                  }
                }
              }}
            />
          </div>
        </ChartContainer>

        {/* Customer Satisfaction */}
        <ChartContainer 
          title="Customer Satisfaction"
          description="Feedback from recent customers"
          tooltip="Measure of customer happiness"
          initialDelay={0.8}
        >
          <div className="h-72">
            <PieChart 
              data={performanceData.customerSatisfaction}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      color: theme === 'dark' ? '#E5E7EB' : '#374151'
                    }
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `${context.label}: ${context.raw}%`
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </ChartContainer>
      </div>

      {/* Regional Sales */}
      <ChartContainer 
        title="Regional Sales Performance"
        description="Revenue by geographic location"
        tooltip="Top performing regions"
        initialDelay={1}
      >
        <div className="h-96">
          <BarChart 
            data={performanceData.regionalSales}
            options={{
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      return 'KES ' + context.raw.toLocaleString()
                    }
                  }
                }
              },
              scales: {
                x: {
                  ticks: {
                    color: theme === 'dark' ? '#9CA3AF' : '#6B7280',
                    callback: function(value) {
                      return 'KES ' + (value / 1000).toLocaleString() + 'K'
                    }
                  },
                  grid: {
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
                  }
                },
                y: {
                  ticks: {
                    color: theme === 'dark' ? '#9CA3AF' : '#6B7280'
                  },
                  grid: {
                    display: false
                  }
                }
              }
            }}
          />
        </div>
      </ChartContainer>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
          <div className="flex space-x-3">
            <button className="text-sm text-[#8C5EFF] hover:text-[#6E3EFF] dark:hover:text-[#9d7aff] font-medium">
              View All
            </button>
            <button className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <FiFilter size={18} />
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-12 bg-gray-100 dark:bg-gray-700 p-4 text-sm font-medium text-gray-700 dark:text-gray-300">
            <div className="col-span-2">Transaction ID</div>
            <div className="col-span-2">Customer</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Method</div>
            <div className="col-span-3">Location</div>
            <div className="col-span-1">Status</div>
          </div>
          
          {performanceData.recentTransactions.map((transaction, index) => (
            <div 
              key={index} 
              className="grid grid-cols-12 items-center p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors text-sm"
            >
              <div className="col-span-2 font-medium text-gray-900 dark:text-white flex items-center">
                <MdOutlineReceipt className="mr-2 text-gray-400" />
                {transaction.id}
              </div>
              <div className="col-span-2 text-gray-700 dark:text-gray-300 truncate">
                {transaction.customer}
              </div>
              <div className="col-span-2 font-semibold text-gray-900 dark:text-white">
                {transaction.amount}
              </div>
              <div className="col-span-2 flex items-center gap-2">
                {transaction.method === 'M-Pesa' ? (
                  <MdPayment className="text-[#F95738]" />
                ) : transaction.method === 'Card' ? (
                  <FiCreditCard className="text-[#8C5EFF]" />
                ) : (
                  <FiDollarSign className="text-[#3E0D4C]" />
                )}
                {transaction.method}
              </div>
              <div className="col-span-3 flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MdLocationOn className="text-gray-400" />
                {transaction.location}
              </div>
              <div className="col-span-1">
                <Badge 
                  color={
                    transaction.status === 'Completed' ? 'success' : 
                    transaction.status === 'Pending' ? 'warning' : 
                    'danger'
                  }
                  variant="flat"
                  size="sm"
                >
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Enhanced Metric Card Component
const MetricCard = ({ icon, title, value, change, trend, tooltip }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xs hover:shadow-sm dark:hover:shadow-gray-800/50 transition-all"
  >
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-opacity-10 bg-[#8C5EFF] dark:bg-opacity-20">
            {icon}
          </div>
          <Tooltip content={tooltip}>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          </Tooltip>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
      </div>
      <div className={`flex items-center text-xs px-2 py-1 rounded-full ${
        trend === 'up' 
          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-500' 
          : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-500'
      }`}>
        {change}
        {trend === 'up' ? (
          <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </div>
    </div>
  </motion.div>
)

// Enhanced Chart Container Component
const ChartContainer = ({ 
  title, 
  description, 
  tooltip, 
  children, 
  initialDelay = 0,
  actionButtons 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: initialDelay }}
    className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xs"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </div>
      <div className="flex items-center space-x-2">
        {actionButtons}
        <Tooltip content={tooltip}>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </button>
        </Tooltip>
      </div>
    </div>
    {children}
  </motion.div>
)

export default AnalyticsDashboard