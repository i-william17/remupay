'use client'
import React from 'react'
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          family: 'Inter, sans-serif'
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleFont: {
        family: 'Inter, sans-serif',
        size: 14
      },
      bodyFont: {
        family: 'Inter, sans-serif',
        size: 12
      },
      padding: 12,
      usePointStyle: true
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        font: {
          family: 'Inter, sans-serif'
        }
      }
    },
    y: {
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      },
      ticks: {
        font: {
          family: 'Inter, sans-serif'
        }
      }
    }
  },
  elements: {
    bar: {
      borderRadius: 6
    }
  }
}

export const BarChart = ({ 
  data, 
  options = {}, 
  className = '',
  height = '100%',
  width = '100%',
  ariaLabel = 'Bar chart'
}) => (
  <div className={`relative ${className}`} style={{ height, width }}>
    <Bar 
      data={data} 
      options={{
        ...defaultOptions,
        ...options
      }}
      aria-label={ariaLabel}
    />
  </div>
)

export const PieChart = ({ 
  data, 
  options = {}, 
  className = '',
  height = '100%',
  width = '100%',
  ariaLabel = 'Pie chart'
}) => (
  <div className={`relative ${className}`} style={{ height, width }}>
    <Pie 
      data={data} 
      options={{
        ...defaultOptions,
        ...options,
        cutout: '70%'
      }}
      aria-label={ariaLabel}
    />
  </div>
)

export const DoughnutChart = ({ 
  data, 
  options = {}, 
  className = '',
  height = '100%',
  width = '100%',
  ariaLabel = 'Doughnut chart'
}) => (
  <div className={`relative ${className}`} style={{ height, width }}>
    <Doughnut 
      data={data} 
      options={{
        ...defaultOptions,
        ...options,
        cutout: '70%'
      }}
      aria-label={ariaLabel}
    />
  </div>
)

export const LineChart = ({ 
  data, 
  options = {}, 
  className = '',
  height = '100%',
  width = '100%',
  ariaLabel = 'Line chart'
}) => (
  <div className={`relative ${className}`} style={{ height, width }}>
    <Line 
      data={data} 
      options={{
        ...defaultOptions,
        ...options,
        elements: {
          line: {
            tension: 0.4,
            fill: 'start',
            borderWidth: 2
          },
          point: {
            radius: 4,
            hoverRadius: 6
          }
        }
      }}
      aria-label={ariaLabel}
    />
  </div>
)