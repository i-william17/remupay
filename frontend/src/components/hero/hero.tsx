'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiPlay } from 'react-icons/fi';
import { FaShieldAlt, FaGlobe, FaLightbulb } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#F9FAFB] to-white pt-28 pb-24 md:pt-36 md:pb-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-[#8C5EFF] mix-blend-multiply filter blur-[100px]"
          animate={{
            x: [0, 40, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-[#F95738] mix-blend-multiply filter blur-[120px]"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-white text-sm font-medium shadow-xs mb-6 border border-gray-200"
            >
              <span className="w-2 h-2 rounded-full bg-[#8C5EFF] mr-2"></span>
              <span className="text-gray-800">Now with Fraud Protection</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-[#8C5EFF] to-[#F95738] bg-clip-text text-transparent">
                Smarter Payments
              </span>{' '}
              for <span className="text-[#3E0D4C]">Growing</span> Businesses
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-lg leading-relaxed">
              The complete payments platform engineered for scale, with global reach,{' '}
              <span className="font-semibold text-gray-900">99.99% uptime</span>, and{' '}
              <span className="font-semibold text-gray-900">industry-low</span> processing fees.
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-3 mb-10">
              {[
                { 
                  icon: <FaShieldAlt className="text-[#8C5EFF]" />, 
                  text: "PCI DSS Level 1",
                  bg: "bg-[#8C5EFF]/10",
                  textColor: "text-[#3E0D4C]"
                },
                { 
                  icon: <FaGlobe className="text-[#F95738]" />, 
                  text: "180+ Countries",
                  bg: "bg-[#F95738]/10",
                  textColor: "text-[#3E0D4C]"
                },
                { 
                  icon: <FaLightbulb className="text-[#3E0D4C]" />, 
                  text: "Smart Routing",
                  bg: "bg-[#3E0D4C]/10",
                  textColor: "text-[#3E0D4C]"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center px-4 py-2 rounded-lg ${feature.bg} ${feature.textColor} shadow-xs border border-gray-200`}
                >
                  <span className="mr-2">{feature.icon}</span>
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/register"
                  className="flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-[#8C5EFF] to-[#F95738] text-white font-medium shadow-lg hover:shadow-xl transition-all group"
                >
                  Get Started Free
                  <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center"
              >
                <button className="flex items-center justify-center px-6 py-4 rounded-xl bg-white text-gray-800 font-medium border-2 border-gray-200 hover:border-[#8C5EFF] transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-[#F4F0ED] flex items-center justify-center mr-3 group-hover:bg-[#8C5EFF]/10 transition-colors">
                    <FiPlay className="text-[#8C5EFF] group-hover:text-[#7D4AFF]" />
                  </div>
                  How It Works
                </button>
              </motion.div>
            </div>

            {/* Social proof */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ y: -3 }}
                    className="w-10 h-10 rounded-full bg-white border-2 border-white overflow-hidden shadow-sm"
                    style={{ zIndex: 5 - item }}
                  >
                    <Image
                      src={`/avatars/avatar-${item}.jpg`}
                      width={40}
                      height={40}
                      alt={`User ${item}`}
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
              <div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-800">4.9/5</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Trusted by <span className="font-semibold text-gray-800">12,000+</span> businesses worldwide
                </p>
              </div>
            </div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative w-full aspect-[1.1] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
            >
              <Image
                src="/payment-dashboard.png"
                alt="Remunary Dashboard"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            
            {/* Floating elements */}
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-200 w-52"
            >
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-[#F4F0ED] flex items-center justify-center mr-3">
                  <span className="text-[#8C5EFF] text-lg font-bold">$</span>
                </div>
                <span className="font-medium text-gray-800">Daily Volume</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">$42,156</p>
              <div className="flex items-center text-sm text-green-600 font-medium">
                <FiArrowRight className="transform rotate-45 mr-1" />
                <span>12% from yesterday</span>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-200 w-44"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <FiCheck className="text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Success Rate</span>
              </div>
              <p className="text-xl font-bold text-gray-900">99.7%</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;