'use client'
import React from 'react'
import { BarChart, PieChart, LineChart } from './chart'
import { FiTrendingUp, FiDollarSign, FiUsers, FiCreditCard, FiShoppingCart, FiDownload, FiFilter, FiRefreshCw } from 'react-icons/fi'
import { MdPayment, MdLocationOn, MdStore } from 'react-icons/md'
import { motion } from 'framer-motion'
import Tooltip from './tooltip'

const AnalyticsDashboard = () => {
  // Enhanced mock data for Kenyan SME
  const performanceData = {
    monthlyRevenue: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Revenue (KES)',
          data: [450000, 590000, 680000, 810000, 920000, 1050000, 1240000],
          backgroundColor: '#8C5EFF',
          borderColor: '#6E3EFF',
          tension: 0.3,
          fill: true
        }
      ]
    },
    paymentMethods: {
      labels: ['M-Pesa', 'Card', 'Bank Transfer', 'Cash'],
      datasets: [
        {
          data: [68, 15, 12, 5],
          backgroundColor: ['#F95738', '#8C5EFF', '#3E0D4C', '#F9A825'],
          borderWidth: 1
        }
      ]
    },
    customerDemographics: {
      labels: ['18-25', '26-35', '36-45', '45+'],
      datasets: [
        {
          label: 'Customers',
          data: [25, 45, 20, 10],
          backgroundColor: '#8C5EFF',
          borderRadius: 4
        }
      ]
    },
    regionalSales: {
      labels: ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'],
      datasets: [
        {
          label: 'Sales (KES)',
          data: [620000, 380000, 290000, 210000, 180000],
          backgroundColor: '#8C5EFF'
        }
      ]
    },
    keyMetrics: {
      totalSales: '1,240,500 KES',
      mpesaTransactions: '1,842',
      newCustomers: '328',
      conversionRate: '24%',
      avgOrderValue: '3,750 KES',
      customerRetention: '78%'
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-gray-900"
          >
            Business Analytics Dashboard
          </motion.h2>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select className="bg-gray-50 pl-10 pr-4 py-2 rounded-lg text-sm text-gray-800 border border-gray-200 focus:border-[#8C5EFF] focus:ring-1 focus:ring-[#8C5EFF]">
              <option>Last 7 Days</option>
              <option>This Month</option>
              <option>Last Quarter</option>
              <option>Year to Date</option>
            </select>
          </div>
          
          <button className="flex items-center gap-2 bg-[#8C5EFF] hover:bg-[#7D4AFF] text-white px-4 py-2 rounded-lg text-sm transition-colors">
            <FiDownload /> Export Report
          </button>
          
          <button className="flex items-center gap-2 bg-white text-gray-700 px-4 py-2 rounded-lg text-sm border border-gray-200 hover:bg-gray-50 transition-colors">
            <FiRefreshCw /> Refresh
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <MetricCard 
          icon={<FiDollarSign className="text-[#8C5EFF]" size={20} />}
          title="Total Sales"
          value={performanceData.keyMetrics.totalSales}
          change="+12%"
          tooltip="Total revenue generated"
        />
        <MetricCard 
          icon={<MdPayment className="text-[#F95738]" size={20} />}
          title="M-Pesa TXs"
          value={performanceData.keyMetrics.mpesaTransactions}
          change="+18%"
          tooltip="Mobile money transactions"
        />
        <MetricCard 
          icon={<FiUsers className="text-[#3E0D4C]" size={20} />}
          title="New Customers"
          value={performanceData.keyMetrics.newCustomers}
          change="+8%"
          tooltip="New customer acquisitions"
        />
        <MetricCard 
          icon={<FiTrendingUp className="text-[#F9A825]" size={20} />}
          title="Conversion Rate"
          value={performanceData.keyMetrics.conversionRate}
          change="+3%"
          tooltip="Visitor to customer rate"
        />
        <MetricCard 
          icon={<FiShoppingCart className="text-[#8C5EFF]" size={20} />}
          title="Avg Order Value"
          value={performanceData.keyMetrics.avgOrderValue}
          change="+5%"
          tooltip="Average transaction amount"
        />
        <MetricCard 
          icon={<MdStore className="text-[#F95738]" size={20} />}
          title="Retention Rate"
          value={performanceData.keyMetrics.customerRetention}
          change="+2%"
          tooltip="Repeat customer percentage"
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Trend Chart */}
        <ChartContainer 
          title="Monthly Revenue Trend"
          description="Gross revenue over time"
          tooltip="Shows your business growth trajectory"
          initialDelay={0.2}
        >
          <div className="h-72">
            <LineChart 
              data={performanceData.monthlyRevenue}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
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
                  y: {
                    beginAtZero: false,
                    ticks: {
                      callback: function(value) {
                        return 'KES ' + (value / 1000).toLocaleString() + 'K'
                      }
                    },
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </ChartContainer>

        {/* Payment Methods Pie Chart */}
        <ChartContainer 
          title="Payment Methods"
          description="Transaction distribution by type"
          tooltip="Breakdown of payment preferences"
          initialDelay={0.4}
        >
          <div className="h-72">
            <PieChart 
              data={performanceData.paymentMethods}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'right',
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Demographics */}
        <ChartContainer 
          title="Customer Age Groups"
          description="Customer distribution by age"
          tooltip="Understanding your customer base"
          initialDelay={0.6}
        >
          <div className="h-64">
            <BarChart 
              data={performanceData.customerDemographics}
              options={{
                responsive: true,
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
                      callback: function(value) {
                        return value + '%'
                      }
                    },
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </ChartContainer>

        {/* Regional Sales */}
        <ChartContainer 
          title="Regional Sales Distribution"
          description="Revenue by location"
          tooltip="Geographic performance insights"
          initialDelay={0.8}
        >
          <div className="h-64">
            <BarChart 
              data={performanceData.regionalSales}
              options={{
                indexAxis: 'y',
                responsive: true,
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
                      callback: function(value) {
                        return 'KES ' + (value / 1000).toLocaleString() + 'K'
                      }
                    },
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                    }
                  },
                  y: {
                    grid: {
                      display: false
                    }
                  }
                }
              }}
            />
          </div>
        </ChartContainer>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Recent Transactions</h3>
          <button className="text-sm text-[#8C5EFF] hover:text-[#6E3EFF] font-medium">
            View All Transactions
          </button>
        </div>
        
        <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
          <div className="grid grid-cols-12 bg-gray-100 p-4 text-sm font-medium text-gray-700">
            <div className="col-span-3">Transaction ID</div>
            <div className="col-span-2">Amount</div>
            <div className="col-span-2">Method</div>
            <div className="col-span-3">Location</div>
            <div className="col-span-2">Status</div>
          </div>
          
          {[
            { 
              id: '#MP-84512', 
              amount: 'KES 12,500', 
              method: 'M-Pesa', 
              location: 'Nairobi CBD',
              status: 'Completed',
              timestamp: '2 mins ago'
            },
            { 
              id: '#MP-84511', 
              amount: 'KES 8,200', 
              method: 'M-Pesa', 
              location: 'Westlands',
              status: 'Completed',
              timestamp: '15 mins ago'
            },
            { 
              id: '#CRD-3241', 
              amount: 'KES 24,000', 
              method: 'Card', 
              location: 'Mombasa',
              status: 'Pending',
              timestamp: '1 hour ago'
            },
            { 
              id: '#BNK-7821', 
              amount: 'KES 56,300', 
              method: 'Bank Transfer', 
              location: 'Kisumu',
              status: 'Completed',
              timestamp: '3 hours ago'
            },
            { 
              id: '#MP-84510', 
              amount: 'KES 5,700', 
              method: 'M-Pesa', 
              location: 'Thika',
              status: 'Failed',
              timestamp: '5 hours ago'
            },
          ].map((transaction, index) => (
            <div 
              key={index} 
              className="grid grid-cols-12 items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-sm"
            >
              <div className="col-span-3 font-medium text-gray-900">{transaction.id}</div>
              <div className="col-span-2 font-semibold">{transaction.amount}</div>
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
              <div className="col-span-3 flex items-center gap-2 text-gray-600">
                <MdLocationOn className="text-gray-400" />
                {transaction.location}
              </div>
              <div className="col-span-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                  transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {transaction.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Reusable Metric Card Component
const MetricCard = ({ icon, title, value, change, tooltip }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs hover:shadow-sm transition-shadow"
  >
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-opacity-10 bg-[#8C5EFF]">
            {icon}
          </div>
          <Tooltip content={tooltip}>
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          </Tooltip>
        </div>
        <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      </div>
      <span className={`text-xs px-2 py-1 rounded-full ${
        change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {change}
      </span>
    </div>
  </motion.div>
)

// Reusable Chart Container Component
const ChartContainer = ({ title, description, tooltip, children, initialDelay = 0 }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: initialDelay }}
    className="bg-white p-5 rounded-xl border border-gray-200"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <Tooltip content={tooltip}>
        <button className="text-gray-400 hover:text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </button>
      </Tooltip>
    </div>
    {children}
  </motion.div>
)

export default AnalyticsDashboard