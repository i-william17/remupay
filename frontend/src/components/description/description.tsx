'use client'
import React, { useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  FiCheck, FiZap, FiLock, FiGlobe, 
  FiPieChart, FiArrowRight, FiPlay,
  FiBarChart2, FiCreditCard, FiShield, FiShoppingCart
} from 'react-icons/fi'
import { 
  MdOutlinePayments, MdOutlineSecurity, 
  MdOutlineAnalytics, MdOutlineLanguage 
} from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import ReactPlayer from 'react-player'
import { Tooltip } from '@nextui-org/tooltip'
import { Badge } from '@nextui-org/badge'

const DescriptionComponent = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [videoOpen, setVideoOpen] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      icon: <FiZap className="w-6 h-6 text-[#8C5EFF]" />,
      title: "Lightning Processing",
      description: "900ms transaction speeds with our optimized infrastructure",
      stat: "99.99% Uptime SLA",
      bgColor: "bg-[#8C5EFF]/10",
      details: {
        stats: [
          { value: "900ms", label: "Avg Processing Time" },
          { value: "99.99%", label: "Uptime" },
          { value: "10M+", label: "TPS Capacity" }
        ],
        videoId: "dQw4w9WgXcQ"
      }
    },
    {
      icon: <FiLock className="w-6 h-6 text-[#F95738]" />,
      title: "Military-Grade Security",
      description: "PCI DSS Level 1 certified with 3DS2 authentication",
      stat: "Zero Fraud Liability",
      bgColor: "bg-[#F95738]/10",
      details: {
        stats: [
          { value: "PCI DSS 1", label: "Compliance" },
          { value: "256-bit", label: "Encryption" },
          { value: "0", label: "Fraud Cases" }
        ],
        videoId: "dQw4w9WgXcQ"
      }
    },
    {
      icon: <FiGlobe className="w-6 h-6 text-[#3E0D4C]" />,
      title: "Global Reach",
      description: "Accept payments in 180+ countries with local acquiring",
      stat: "50+ Currencies",
      bgColor: "bg-[#3E0D4C]/10",
      details: {
        stats: [
          { value: "180+", label: "Countries" },
          { value: "50+", label: "Currencies" },
          { value: "100%", label: "Coverage" }
        ],
        videoId: "dQw4w9WgXcQ"
      }
    },
    {
      icon: <FiPieChart className="w-6 h-6 text-[#8C5EFF]" />,
      title: "Smart Analytics",
      description: "Real-time revenue reporting and forecasting",
      stat: "100+ Data Points",
      bgColor: "bg-[#8C5EFF]/10",
      details: {
        stats: [
          { value: "Real-time", label: "Reporting" },
          { value: "100+", label: "Metrics" },
          { value: "AI", label: "Forecasting" }
        ],
        videoId: "dQw4w9WgXcQ"
      }
    }
  ]

  const useCases = [
    {
      title: "E-commerce",
      icon: <FiShoppingCart className="w-5 h-5" />,
      description: "Seamless checkout experiences with optimized payment flows"
    },
    {
      title: "SaaS",
      icon: <FiBarChart2 className="w-5 h-5" />,
      description: "Recurring billing with smart dunning management"
    },
    {
      title: "Marketplaces",
      icon: <FiCreditCard className="w-5 h-5" />,
      description: "Split payments and escrow services"
    },
    {
      title: "Global Enterprises",
      icon: <FiGlobe className="w-5 h-5" />,
      description: "Multi-currency processing with local acquiring"
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="relative bg-white dark:bg-gray-900 py-24 sm:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 dark:opacity-5">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#8C5EFF] mix-blend-multiply filter blur-[120px] dark:blur-[150px]"
          animate={{
            x: [0, 40, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#F95738] mix-blend-multiply filter blur-[100px] dark:blur-[120px]"
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#8C5EFF]/10 dark:bg-[#8C5EFF]/20 text-[#8C5EFF] text-sm font-semibold mb-6"
          >
            <MdOutlinePayments className="mr-2" />
            Enterprise Payments
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#8C5EFF] to-[#F95738] bg-clip-text text-transparent">
              Powerful
            </span> payment infrastructure
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Remunary provides the complete toolkit to accept, process, and optimize payments across every channel with enterprise-grade reliability.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className={`h-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 hover:border-[#8C5EFF]/30 relative overflow-hidden ${
                hoveredFeature === index ? 'ring-2 ring-[#8C5EFF]/20' : ''
              }`}>
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 transition-colors group-hover:bg-opacity-20`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-5">{feature.description}</p>
                <div className="flex items-center text-sm font-medium text-[#8C5EFF] dark:text-[#9d7aff]">
                  <FiCheck className="mr-2 flex-shrink-0" />
                  <span>{feature.stat}</span>
                </div>

                {/* Hover overlay */}
                {hoveredFeature === index && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6"
                  >
                    <button 
                      onClick={() => setVideoOpen(true)}
                      className="w-full flex items-center justify-center gap-2 bg-white text-[#8C5EFF] py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      <FiPlay /> Watch Demo
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 aspect-[1.1]"
            >
              <Image
                src="/payment-dashboard-screenshot.png"
                alt="Remunary Dashboard"
                fill
                className="object-cover"
                priority
              />
              
              {/* Play button */}
              <button 
                onClick={() => setVideoOpen(true)}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#8C5EFF] transition-colors">
                  <FiPlay className="w-6 h-6 text-[#8C5EFF] group-hover:text-white transition-colors" />
                </div>
              </button>
            </motion.div>
            
            {/* Floating Stats */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-5 -right-5 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 w-48"
            >
              <div className="flex items-center mb-1">
                <div className="w-8 h-8 rounded-full bg-[#F4F0ED] dark:bg-gray-700 flex items-center justify-center mr-2">
                  <span className="text-[#8C5EFF] font-bold">$</span>
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Monthly Volume</span>
              </div>
              <p className="text-xl font-bold text-gray-900 dark:text-white">$284,156</p>
              <div className="flex items-center text-xs text-green-500 dark:text-green-400 mt-1 font-medium">
                <FiArrowRight className="transform rotate-45 mr-1" />
                <span>18% MoM Growth</span>
              </div>
            </motion.div>

            {/* Floating Badges */}
            <div className="absolute -top-4 -left-4 flex gap-2">
              <Badge color="secondary" variant="shadow" size="lg">
                New Feature
              </Badge>
              <Badge color="primary" variant="shadow" size="lg">
                AI Powered
              </Badge>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-[#F95738]/10 dark:bg-[#F95738]/20 text-[#F95738] text-sm font-semibold mb-5"
            >
              <MdOutlineSecurity className="mr-2" />
              Optimized Performance
            </motion.span>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Intelligent routing that maximizes approval rates
            </h3>
            
            {/* Tabs */}
            <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
              <TabList className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                {['Features', 'Technology', 'Use Cases'].map((tab, index) => (
                  <Tab
                    key={index}
                    className={`px-4 py-2 text-sm font-medium cursor-pointer ${
                      activeTab === index
                        ? 'text-[#8C5EFF] dark:text-[#9d7aff] border-b-2 border-[#8C5EFF]'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab}
                  </Tab>
                ))}
              </TabList>

              <TabPanel>
                <ul className="space-y-4 mb-8">
                  {[
                    "Dynamic currency conversion",
                    "Local acquiring network optimization",
                    "Automatic retry logic for declines",
                    "Intelligent payment method selection",
                    "Real-time fraud scoring",
                    "Custom routing rules"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="flex items-start"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <FiCheck className="w-5 h-5 text-[#8C5EFF]" />
                      </div>
                      <span className="ml-3 text-gray-700 dark:text-gray-300">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </TabPanel>

              <TabPanel>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: <MdOutlineAnalytics />, text: "Machine Learning" },
                    { icon: <FiShield />, text: "Tokenization" },
                    { icon: <MdOutlineLanguage />, text: "Multi-lingual" },
                    { icon: <FiGlobe />, text: "Global CDN" }
                  ].map((tech, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="w-8 h-8 rounded-md bg-[#8C5EFF]/10 dark:bg-[#8C5EFF]/20 flex items-center justify-center mr-3 text-[#8C5EFF]">
                        {tech.icon}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">{tech.text}</span>
                    </motion.div>
                  ))}
                </div>
              </TabPanel>

              <TabPanel>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {useCases.map((useCase, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-md bg-[#F95738]/10 dark:bg-[#F95738]/20 flex items-center justify-center mr-3 text-[#F95738]">
                          {useCase.icon}
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{useCase.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{useCase.description}</p>
                    </motion.div>
                  ))}
                </div>
              </TabPanel>
            </Tabs>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/features"
                  className="flex items-center justify-center px-6 py-3.5 rounded-xl bg-white dark:bg-gray-800 text-[#8C5EFF] font-medium border-2 border-[#8C5EFF] hover:bg-[#8C5EFF]/10 dark:hover:bg-[#8C5EFF]/20 transition-colors"
                >
                  View All Features
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#8C5EFF] to-[#F95738] text-white font-medium shadow-md hover:shadow-lg transition-all group"
                  >
                    <>Get Custom Demo</>
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Video Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setVideoOpen(false)}
                className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="aspect-video w-full">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${features[hoveredFeature || 0].details.videoId}`}
                  width="100%"
                  height="100%"
                  controls
                  playing
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default DescriptionComponent