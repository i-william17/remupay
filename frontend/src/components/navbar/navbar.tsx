'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiArrowRight, FiChevronDown } from 'react-icons/fi';
import {
  FaProductHunt,
  FaTools,
  FaCode,
  FaDollarSign,
  FaBuilding,
  FaUserCircle
} from 'react-icons/fa';
import { RiSecurePaymentLine } from 'react-icons/ri';
import Image from 'next/image';

const RemunaryNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setMobileSubmenu(null);
  }, [pathname]);

  const navItems = [
    {
      name: 'Products',
      href: '/products',
      icon: <FaProductHunt className="w-4 h-4" />,
      subItems: [
        { name: 'Payment Gateway', href: '/products/payment' },
        { name: 'Billing', href: '/products/billing' },
        { name: 'Invoicing', href: '/products/invoicing' }
      ]
    },
    {
      name: 'Solutions',
      href: '/solutions',
      icon: <FaTools className="w-4 h-4" />,
      subItems: [
        { name: 'E-commerce', href: '/solutions/ecommerce' },
        { name: 'SaaS', href: '/solutions/saas' },
        { name: 'Marketplaces', href: '/solutions/marketplaces' }
      ]
    },
    { name: 'Developers', href: '/developers', icon: <FaCode className="w-4 h-4" /> },
    { name: 'Pricing', href: '/pricing', icon: <FaDollarSign className="w-4 h-4" /> },
    { name: 'Company', href: '/about', icon: <FaBuilding className="w-4 h-4" /> },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm py-2' : 'bg-white/80 backdrop-blur-sm py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Visible on all screens */}
            <Link href="/" className="flex items-center space-x-2 group flex-shrink-0">
            <Image
              src="/1-nobg.png"
              alt="Logo"
              width={170}
              height={170}
              className="mr-3"
            />
            </Link>

            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl text-sm font-medium transition-all ${pathname === item.href
                        ? 'bg-[#F4F0ED] text-[#3E0D4C]'
                        : 'text-gray-600 hover:bg-gray-50/80 hover:text-[#3E0D4C]'
                      }`}
                  >
                    <span className="mr-2 text-[#8C5EFF]">{item.icon}</span>
                    {item.name}
                    {item.subItems && <FiChevronDown className="ml-1 w-4 h-4 text-gray-400 group-hover:text-[#8C5EFF]" />}
                  </Link>

                  {/* Desktop Dropdown */}
                  {item.subItems && (
                    <div className="absolute left-0 mt-1 w-56 origin-top-left rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                      <div className="py-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`block px-4 py-2.5 text-sm ${pathname === subItem.href
                                ? 'bg-[#F4F0ED] text-[#3E0D4C]'
                                : 'text-gray-700 hover:bg-gray-50'
                              }`}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Auth Buttons - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                href="/login"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-[#3E0D4C] transition-colors"
              >
                <FaUserCircle className="mr-2 w-4 h-4" />
                Sign in
              </Link>
              <Link
                href="/register"
                className="flex items-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#8C5EFF] to-[#F95738] text-white text-sm font-medium shadow-lg hover:shadow-xl transition-all hover:from-[#7D4AFF] hover:to-[#E84C2F] group"
              >
                Get Started <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Mobile Menu Button - Visible only on mobile */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Full screen overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-40 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
          }`}
        style={{ marginTop: '64px', height: 'calc(100vh - 64px)' }}
      >
        <div className="h-full overflow-y-auto px-5 py-4">
          <div className="space-y-1">
            {navItems.map((item) => (
              <div key={item.name}>
                <div
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium ${pathname === item.href
                      ? 'bg-[#F4F0ED] text-[#3E0D4C]'
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  onClick={() => item.subItems
                    ? setMobileSubmenu(mobileSubmenu === item.name ? null : item.name)
                    : null}
                >
                  <div className="flex items-center">
                    <span className="mr-3 text-[#8C5EFF]">{item.icon}</span>
                    {item.name}
                  </div>
                  {item.subItems && (
                    <FiChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${mobileSubmenu === item.name ? 'rotate-180' : ''
                      }`} />
                  )}
                </div>

                {/* Mobile Submenu */}
                {item.subItems && mobileSubmenu === item.name && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={`block px-4 py-3 rounded-lg text-sm ${pathname === subItem.href
                            ? 'bg-[#F4F0ED] text-[#3E0D4C]'
                            : 'text-gray-600 hover:bg-gray-50'
                          }`}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-6 mt-4 border-t border-gray-200 space-y-4">
            <Link
              href="/login"
              className="flex items-center justify-center px-6 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <FaUserCircle className="mr-2 w-5 h-5" />
              Sign in
            </Link>
            <Link
              href="/register"
              className="flex items-center justify-center px-6 py-3 rounded-xl text-base font-medium text-white bg-gradient-to-r from-[#8C5EFF] to-[#F95738] shadow-md hover:from-[#7D4AFF] hover:to-[#E84C2F] transition-all"
            >
              Get Started <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RemunaryNavbar;