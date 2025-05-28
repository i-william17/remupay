'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaTwitter, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa';
import Image from 'next/image';

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Payment Gateway", href: "/product/payments" },
        { name: "Billing", href: "/product/billing" },
        { name: "Invoicing", href: "/product/invoicing" },
        { name: "Radar", href: "/product/radar" },
        { name: "Connect", href: "/product/connect" }
      ]
    },
    {
      title: "Developers",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "API Reference", href: "/docs/api" },
        { name: "Libraries", href: "/docs/libraries" },
        { name: "Plugins", href: "/docs/plugins" },
        { name: "Status", href: "/status" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Customers", href: "/customers" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
        { name: "Press", href: "/press" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Support", href: "/support" },
        { name: "Contact", href: "/contact" },
        { name: "Guides", href: "/guides" },
        { name: "Webinars", href: "/webinars" },
        { name: "Partners", href: "/partners" }
      ]
    }
  ];

  const socialLinks = [
    { icon: <FaTwitter className="w-5 h-5" />, href: "https://twitter.com/remunary" },
    { icon: <FaLinkedin className="w-5 h-5" />, href: "https://linkedin.com/company/remunary" },
    { icon: <FaGithub className="w-5 h-5" />, href: "https://github.com/remunary" },
    { icon: <FaDiscord className="w-5 h-5" />, href: "https://discord.gg/remunary" }
  ];

  const contactInfo = [
    { icon: <FiMail className="w-5 h-5" />, text: "hello@remunary.com" },
    { icon: <FiPhone className="w-5 h-5" />, text: "+1 (555) 123-4567" },
    { icon: <FiMapPin className="w-5 h-5" />, text: "San Francisco, CA" }
  ];

  return (
    <footer className="relative bg-[#3E0D4C] text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#8C5EFF] mix-blend-screen filter blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-[#F95738] mix-blend-screen filter blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-150 h-50 rounded-lg flex items-center justify-center mr-3">
                <Image 
                  src="/4-nobg.png" 
                  alt="Remunary" 
                  width={170} 
                  height={170} 
                />
              </div>
            </div>
            <p className="text-[#B388EB] mb-6 max-w-md">
              The complete payments platform for internet businesses. Powering the next generation of commerce.
            </p>
            
            {/* Newsletter */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                Stay Updated
              </h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-3 rounded-l-lg bg-[#2A0938] text-white placeholder-[#B388EB]/50 focus:outline-none focus:ring-2 focus:ring-[#8C5EFF] w-full"
                />
                <button className="bg-gradient-to-r from-[#8C5EFF] to-[#F95738] px-4 py-3 rounded-r-lg font-medium hover:from-[#7D4AFF] hover:to-[#E84C2F] transition-all">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  className="w-10 h-10 rounded-full bg-[#2A0938] flex items-center justify-center hover:bg-[#8C5EFF] transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <motion.li 
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <a 
                      href={link.href} 
                      className="text-[#B388EB] hover:text-white transition-colors flex items-center"
                    >
                      <FiArrowRight className="mr-2 w-3 h-3" />
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-3 mt-0.5 text-[#8C5EFF]">
                    {item.icon}
                  </span>
                  <span className="text-[#B388EB] hover:text-white transition-colors">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#2A0938]"></div>

        {/* Bottom footer */}
        <div className="py-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#B388EB] text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Remunary, Inc. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="/privacy" className="text-[#B388EB] hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="text-[#B388EB] hover:text-white text-sm transition-colors">
              Terms of Service
            </a>
            <a href="/cookies" className="text-[#B388EB] hover:text-white text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>

      {/* Floating payment methods illustration */}
      <motion.div 
        className="absolute -bottom-20 -right-20 opacity-20"
        animate={{
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image 
          src="/payment-methods-illustration.svg" 
          alt="Payment Methods" 
          width={300} 
          height={300} 
        />
      </motion.div>
    </footer>
  );
};

export default Footer;