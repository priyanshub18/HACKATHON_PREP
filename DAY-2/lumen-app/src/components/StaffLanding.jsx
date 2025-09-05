import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, BarChart3, LogOut, TrendingUp, AlertCircle, Plus, Eye, Search, Filter, Download, RefreshCw, ArrowUpDown, CheckCircle, XCircle } from 'lucide-react';

const StaffLanding = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockItems: 0,
    outOfStockItems: 0,
    recentMovements: 0
  });

  useEffect(() => {
    setIsLoaded(true);
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalProducts: 156,
        lowStockItems: 12,
        outOfStockItems: 3,
        recentMovements: 24
      });
    }, 1000);
  }, []);

  const stockFeatures = [
    {
      title: "Stock Overview",
      description: "View current inventory levels and stock status",
      icon: BarChart3,
      link: "/staff/stock-overview",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Stock Movements",
      description: "Track incoming and outgoing stock transactions",
      icon: ArrowUpDown,
      link: "/staff/stock-movements",
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "Low Stock Alerts",
      description: "Monitor items that need restocking",
      icon: AlertCircle,
      link: "/staff/low-stock",
      color: "from-red-500 to-red-600",
      hoverColor: "hover:from-red-600 hover:to-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    }
  ];

  const quickActions = [
    { title: "Add Stock", icon: Plus, action: "addStock", color: "from-green-500 to-green-600" },
    { title: "Remove Stock", icon: XCircle, action: "removeStock", color: "from-red-500 to-red-600" },
    { title: "Search Items", icon: Search, action: "searchItems", color: "from-blue-500 to-blue-600" },
    { title: "Generate Report", icon: Download, action: "generateReport", color: "from-purple-500 to-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Loading Screen */}
      <div className={`fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-1000 ${
        isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="text-xl font-semibold text-gray-700 animate-pulse">Loading Stock Dashboard...</div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Stock Management</h1>
                <p className="text-sm text-gray-500">Staff Dashboard - Inventory Control</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <RefreshCw className="w-5 h-5" />
              </button>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Staff User</p>
                <p className="text-xs text-gray-500">staff@stockmate.com</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className={`mb-8 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Staff!</h2>
          <p className="text-gray-600">Monitor and manage your inventory efficiently with our stock management tools.</p>
        </div>

        {/* Stats Overview */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-1000 delay-200 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.lowStockItems}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-3xl font-bold text-red-600">{stats.outOfStockItems}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recent Movements</p>
                <p className="text-3xl font-bold text-green-600">{stats.recentMovements}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Stock Management Sections */}
        <div className={`mb-8 transition-all duration-1000 delay-400 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Stock Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stockFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className={`group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border ${feature.borderColor} hover:scale-105 overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  <div className={`absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mb-4">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-300">
                      <span>Access Now</span>
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`transition-all duration-1000 delay-600 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Stock Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <button
                  key={index}
                  className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:scale-105"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-all duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                    {action.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Stock Activity */}
        <div className={`mt-8 transition-all duration-1000 delay-800 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Stock Activity</h3>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Stock Added</p>
                    <p className="text-xs text-gray-500">50 units of iPhone 15 Pro added to inventory</p>
                  </div>
                  <span className="text-xs text-gray-400">2 minutes ago</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Stock Removed</p>
                    <p className="text-xs text-gray-500">12 units of MacBook Air sold</p>
                  </div>
                  <span className="text-xs text-gray-400">15 minutes ago</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Low Stock Alert</p>
                    <p className="text-xs text-gray-500">Samsung Galaxy S24 running low (5 units left)</p>
                  </div>
                  <span className="text-xs text-gray-400">1 hour ago</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Out of Stock</p>
                    <p className="text-xs text-gray-500">AirPods Pro completely out of stock</p>
                  </div>
                  <span className="text-xs text-gray-400">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffLanding;
