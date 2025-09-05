import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, User as UserIcon, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login data:', { username: formData.username, password: formData.password });
    // Add your login logic here
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Signup data:', formData);
    // Add your signup logic here
  };

  const switchToLogin = () => {
    setActiveTab('login');
  };

  const switchToSignup = () => {
    setActiveTab('signup');
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  const underlineVariants = {
    login: { x: 0 },
    signup: { x: '100%' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Branded Header */}
      <header className="max-w-3xl mx-auto mb-8">
        <div className="bg-white/95 backdrop-blur-md shadow-lg border border-blue-100 rounded-2xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lumen</h1>
              <p className="text-xs text-gray-500 font-medium">Secure access to StockMate</p>
            </div>
          </div>
          <Link
            to="/landing"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Back to Home →
          </Link>
        </div>
      </header>

      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-8 overflow-hidden"
        >
          <div className="pointer-events-none absolute -top-28 -right-28 w-56 h-56 rounded-full bg-gradient-to-br from-blue-100 to-blue-200" />
          <div className="pointer-events-none absolute -bottom-28 -left-28 w-56 h-56 rounded-full bg-gradient-to-br from-green-100 to-green-200" />

          {/* Title */}
          <div className="relative text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h2>
            <p className="text-gray-600">Login or create your account to continue</p>
          </div>

          {/* Tab Navigation */}
          <div className="relative mb-8">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={switchToLogin}
                className={`relative flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all duration-300 ${
                  activeTab === 'login'
                    ? 'text-blue-700 bg-white shadow border border-blue-100'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Login
              </button>
              <button
                onClick={switchToSignup}
                className={`relative flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all duration-300 ${
                  activeTab === 'signup'
                    ? 'text-green-700 bg-white shadow border border-green-100'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Animated Underline */}
            <motion.div
              className={`absolute -bottom-1 h-1 rounded-full ${
                activeTab === 'login' ? 'bg-blue-600' : 'bg-green-600'
              }`}
              variants={underlineVariants}
              animate={activeTab}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ width: '50%' }}
            />
          </div>

          {/* Form Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'login' && (
              <motion.div
                key="login"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label htmlFor="login-username" className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="login-username"
                        name="username"
                        type="text"
                        required
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                        placeholder="Enter your username"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="login-password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      type="button"
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03, boxShadow: '0 10px 25px rgba(37, 99, 235, 0.25)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg"
                  >
                    Login
                  </motion.button>
                </form>
              </motion.div>
            )}

            {activeTab === 'signup' && (
              <motion.div
                key="signup"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleSignup} className="space-y-6">
                  <div>
                    <label htmlFor="signup-username" className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="signup-username"
                        name="username"
                        type="text"
                        required
                        value={formData.username}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none"
                        placeholder="Choose a username"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="signup-email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="signup-password"
                        name="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none"
                        placeholder="Create a password"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="signup-confirm-password"
                        name="confirmPassword"
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 outline-none"
                        placeholder="Confirm your password"
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03, boxShadow: '0 10px 25px rgba(22, 163, 74, 0.25)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg"
                  >
                    Sign Up
                  </motion.button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={switchToLogin}
                      className="text-sm font-medium text-green-700 hover:text-green-800 transition-colors duration-200"
                    >
                      Already have an account? Login here.
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
