'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState<Partial<FormData & { passwordStrength: string }>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const checkPasswordStrength = (password: string): string => {
    if (!password) return '';
    if (password.length < 8) return 'Weak';
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecial].filter(Boolean).length;
    
    switch(strength) {
      case 4: return 'Strong';
      case 3: return 'Good';
      default: return 'Fair';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData & { passwordStrength: string }> = {};
    const passwordStrength = checkPasswordStrength(formData.password);

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      newErrors.passwordStrength = 'Weak';
    } else if (passwordStrength === 'Fair') {
      newErrors.password = 'Password should include uppercase, lowercase, numbers, and special characters';
      newErrors.passwordStrength = 'Fair';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      alert('Account created successfully!');
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreedToTerms: false,
      });
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error creating account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthColor = (strength: string): string => {
    switch(strength) {
      case 'Strong': return 'bg-green-500';
      case 'Good': return 'bg-blue-500';
      case 'Fair': return 'bg-yellow-500';
      case 'Weak': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden lg:block w-1/2 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#8C5EFF] to-[#F95738] opacity-90"></div>
        <Image
          src="/one.jpg"
          alt="Business Analytics"
          fill
          className="object-cover w-full h-full bg-center bg-no-repeat brightness-50"
          priority
        />
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative z-10 h-full flex flex-col justify-center p-16 text-white"
        >
          <div className="mb-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mb-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-[#8C5EFF]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </motion.div>
            <h1 className="text-3xl font-bold mb-4">Welcome to Remunary</h1>
            <p className="text-lg opacity-90">
              The complete business analytics platform for growing enterprises
            </p>
          </div>
          <div className="mt-auto">
            <motion.div 
              whileHover={{ x: 5 }}
              className="flex items-center space-x-4"
            >
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-medium">"Remunary transformed our analytics workflow"</p>
                <p className="text-sm opacity-80">- Sarah K., Nairobi</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white"
      >
        <div className="max-w-md w-full">
          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mb-8"
          >
          <Image
            src="/1-nobg.png"
            alt="Create Your Account"
            width={150}
            height={150}
            className="mx-auto mb-4"
          />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
            <p className="text-gray-600 text-sm">
              Join thousands of businesses using Remunary for smarter analytics
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={`w-full text-sm px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#8C5EFF] focus:border-transparent text-black`}
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <motion.p 
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.fullName}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`w-full text-sm px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#8C5EFF] focus:border-transparent text-black`}
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <motion.p 
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`w-full text-sm px-4 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#8C5EFF] focus:border-transparent text-black`}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              {(passwordFocused || errors.password) && formData.password && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="mt-2"
                >
                  <div className="flex space-x-1 mb-1">
                    {[1, 2, 3, 4].map((i) => {
                      const strength = checkPasswordStrength(formData.password);
                      const active = i <= {
                        'Weak': 1,
                        'Fair': 2,
                        'Good': 3,
                        'Strong': 4
                      }[strength] ? strength : '';
                      return (
                        <div 
                          key={i}
                          className={`h-1 flex-1 rounded-full ${active ? getPasswordStrengthColor(strength) : 'bg-gray-200'}`}
                        />
                      );
                    })}
                  </div>
                  <p className={`text-xs ${
                    errors.passwordStrength === 'Weak' ? 'text-red-600' :
                    errors.passwordStrength === 'Fair' ? 'text-yellow-600' :
                    errors.passwordStrength === 'Good' ? 'text-blue-600' :
                    'text-green-600'
                  }`}>
                    Password strength: {checkPasswordStrength(formData.password)}
                  </p>
                </motion.div>
              )}
              {errors.password && (
                <motion.p 
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.password}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`w-full text-sm px-4 py-3 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#8C5EFF] focus:border-transparent text-black`}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <motion.p 
                  initial={{ y: -5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-start"
            >
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="agreedToTerms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#8C5EFF] focus:ring-[#8C5EFF]"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="terms" className="ml-3 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-[#8C5EFF] hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#8C5EFF] hover:underline">
                  Privacy Policy
                </a>
              </label>
            </motion.div>
            {errors.agreedToTerms && (
              <motion.p 
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-sm text-red-600"
              >
                You must agree to the terms
              </motion.p>
            )}

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#8C5EFF] to-[#F95738] text-white font-medium py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#8C5EFF] focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-center text-sm text-gray-600"
            >
              Already have an account?{' '}
              <a href="/login" className="font-medium text-[#8C5EFF] hover:underline">
                Login
              </a>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;