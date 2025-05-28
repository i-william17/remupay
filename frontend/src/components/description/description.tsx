'use client';
import React from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCheck, FiZap, FiLock, FiGlobe, FiPieChart, FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';

const DescriptionComponent = () => {
  const features = [
    {
      icon: <FiZap className="w-5 h-5 text-[#8C5EFF]" />,
      title: "Lightning Processing",
      description: "900ms transaction speeds with our optimized infrastructure",
      stat: "99.99% Uptime SLA",
      bgColor: "bg-[#8C5EFF]/10"
    },
    {
      icon: <FiLock className="w-5 h-5 text-[#F95738]" />,
      title: "Military-Grade Security",
      description: "PCI DSS Level 1 certified with 3DS2 authentication",
      stat: "Zero Fraud Liability",
      bgColor: "bg-[#F95738]/10"
    },
    {
      icon: <FiGlobe className="w-5 h-5 text-[#3E0D4C]" />,
      title: "Global Reach",
      description: "Accept payments in 180+ countries with local acquiring",
      stat: "50+ Currencies",
      bgColor: "bg-[#3E0D4C]/10"
    },
    {
      icon: <FiPieChart className="w-5 h-5 text-[#8C5EFF]" />,
      title: "Smart Analytics",
      description: "Real-time revenue reporting and forecasting",
      stat: "100+ Data Points",
      bgColor: "bg-[#8C5EFF]/10"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

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
  };

  return (
    <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#8C5EFF] mix-blend-multiply filter blur-[120px]"
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
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#F95738] mix-blend-multiply filter blur-[100px]"
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
            className="inline-block px-4 py-1.5 text-sm font-semibold rounded-full bg-[#8C5EFF]/10 text-[#8C5EFF] mb-6"
          >
            Enterprise Payments
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#8C5EFF] to-[#F95738] bg-clip-text text-transparent">
              Powerful
            </span> payment infrastructure
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
              className="group"
            >
              <div className="h-full bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-[#8C5EFF]/30">
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 transition-colors group-hover:bg-opacity-20`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-5">{feature.description}</p>
                <div className="flex items-center text-sm font-medium text-[#8C5EFF]">
                  <FiCheck className="mr-2 flex-shrink-0" />
                  <span>{feature.stat}</span>
                </div>
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
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 aspect-[1.1]"
            >
              <Image
                src="/payment-dashboard-screenshot.png"
                alt="Remunary Dashboard"
                fill
                className="object-cover"
                priority
              />
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
              className="absolute -bottom-5 -right-5 bg-white p-4 rounded-xl shadow-lg border border-gray-200 w-48"
            >
              <div className="flex items-center mb-1">
                <div className="w-8 h-8 rounded-full bg-[#F4F0ED] flex items-center justify-center mr-2">
                  <span className="text-[#8C5EFF] font-bold">$</span>
                </div>
                <span className="text-sm font-medium text-gray-800">Monthly Volume</span>
              </div>
              <p className="text-xl font-bold text-gray-900">$284,156</p>
              <div className="flex items-center text-xs text-green-500 mt-1 font-medium">
                <FiArrowRight className="transform rotate-45 mr-1" />
                <span>18% MoM Growth</span>
              </div>
            </motion.div>
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
              className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-[#F95738]/10 text-[#F95738] mb-5"
            >
              Optimized Performance
            </motion.span>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Intelligent routing that maximizes approval rates
            </h3>
            
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
                  <span className="ml-3 text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>
            
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
                  className="flex items-center justify-center px-6 py-3.5 rounded-xl bg-white text-[#8C5EFF] font-medium border-2 border-[#8C5EFF] hover:bg-[#8C5EFF]/10 transition-colors"
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
                  Get Custom Demo <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DescriptionComponent;