'use client'
import React from 'react'
import { Bar, Pie, Line } from 'react-chartjs-2'
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
  Legend
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
  Legend
)

export const BarChart = ({ data, options }) => (
  <Bar 
    data={data} 
    options={{
      responsive: true,
      maintainAspectRatio: false,
      ...options
    }} 
  />
)

export const PieChart = ({ data, options }) => (
  <Pie 
    data={data} 
    options={{
      responsive: true,
      maintainAspectRatio: false,
      ...options
    }} 
  />
)

export const LineChart = ({ data, options }) => (
  <Line 
    data={data} 
    options={{
      responsive: true,
      maintainAspectRatio: false,
      ...options
    }} 
  />
)