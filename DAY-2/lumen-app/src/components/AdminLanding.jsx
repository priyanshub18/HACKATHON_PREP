import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Package, BarChart3, Settings, LogOut, Shield, TrendingUp, AlertCircle, Plus, Eye, Clock, DollarSign, Activity, Bell, Search, Filter } from 'lucide-react';

const AdminLanding = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalSuppliers: 0,
    lowStockItems: 0,
    monthlyRevenue: 0
  });

  useEffect(() => {
    setIsLoaded(true);
    // Simulate loading stats
    setTimeout(() => {
      setStats({
        totalUsers: 24,
        totalProducts: 156,
        totalSuppliers: 8,
        lowStockItems: 12,
        monthlyRevenue: 78920
      });
    }, 1000);
  }, []);

  const adminFeatures = [
    {
      title: "User Management",
      description: "Manage user accounts, roles, and permissions",
      icon: Users,
      link: "/admin/users",
      color: "from-blue-500 to-blue-600",
      hoverColor: "hover:from-blue-600 hover:to-blue-700",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      title: "Product & Supplier Management",
      description: "Manage products, suppliers, and procurement",
      icon: Package,
      link: "/admin/products",
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      title: "Stock Management",
      description: "Track inventory levels, stock movements, and alerts",
      icon: BarChart3,
      link: "/admin/stock",
      color: "from-purple-500 to-purple-600",
      hoverColor: "hover:from-purple-600 hover:to-purple-700",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  const quickActions = [
    {
      title: "Add New User",
      icon: Plus,
      color: "bg-blue-500 hover:bg-blue-600",
      link: "/admin/users"
    },
    {
      title: "Add Product",
      icon: Package,
      color: "bg-green-500 hover:bg-green-600",
      link: "/admin/products"
    },
    {
      title: "View Reports",
      icon: BarChart3,
      color: "bg-purple-500 hover:bg-purple-600",
      link: "/admin/stock"
    },
    {
      title: "System Settings",
      icon: Settings,
      color: "bg-gray-500 hover:bg-gray-600",
      link: "/admin"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Loading Screen */}
      <div className={`fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-1000 ${
        isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="text-xl font-semibold text-gray-700 animate-pulse">Loading Admin Panel...</div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-500 font-medium">StockMate Management System</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@stockmate.com</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">AU</span>
                </div>
              </div>
              <button className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 group">
                <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
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
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-bold mb-2">Welcome back, Admin!</h2>
                <p className="text-red-100 text-lg">Manage your inventory system efficiently with our comprehensive admin tools.</p>
              </div>
              <div className="hidden lg:block">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <Activity className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-1000 delay-200 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Total Users</p>
                <p className="text-4xl font-bold text-gray-900">{stats.totalUsers}</p>
                <p className="text-xs text-blue-600 font-medium mt-1">+3 new this week</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Total Products</p>
                <p className="text-4xl font-bold text-gray-900">{stats.totalProducts}</p>
                <p className="text-xs text-green-600 font-medium mt-1">+15% from last month</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Package className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Active Suppliers</p>
                <p className="text-4xl font-bold text-gray-900">{stats.totalSuppliers}</p>
                <p className="text-xs text-purple-600 font-medium mt-1">+1 new this month</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-7 h-7 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Low Stock Items</p>
                <p className="text-4xl font-bold text-red-600">{stats.lowStockItems}</p>
                <p className="text-xs text-red-600 font-medium mt-1">Needs attention</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <AlertCircle className="w-7 h-7 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={`mb-8 transition-all duration-1000 delay-300 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Link
                  key={index}
                  to={action.link}
                  className={`${action.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 flex flex-col items-center text-center`}
                >
                  <IconComponent className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold text-sm">{action.title}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Management Sections */}
        <div className={`mb-8 transition-all duration-1000 delay-400 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Management Sections</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Link
                  key={index}
                  to={feature.link}
                  className={`group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border ${feature.borderColor} hover:scale-105 overflow-hidden`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-red-400 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-red-600 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 mb-6 text-lg">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-red-600 font-semibold group-hover:text-red-700 transition-colors duration-300 text-lg">
                      <span>Manage Now</span>
                      <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className={`mt-8 transition-all duration-1000 delay-800 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h3>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-6 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                  <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-900">New user registered</p>
                    <p className="text-sm text-gray-600">John Doe joined the system as a new admin user</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500 font-medium">2 minutes ago</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1 ml-auto"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-900">Product updated</p>
                    <p className="text-sm text-gray-600">iPhone 15 Pro stock updated - 50 units added</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500 font-medium">15 minutes ago</span>
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-auto"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl border border-yellow-200">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-900">Low stock alert</p>
                    <p className="text-sm text-gray-600">MacBook Air running low - only 3 units left</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500 font-medium">1 hour ago</span>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1 ml-auto"></div>
                  </div>
                </div>
                <div className="flex items-center space-x-6 p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-gray-900">System maintenance</p>
                    <p className="text-sm text-gray-600">Database backup completed successfully</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500 font-medium">2 hours ago</span>
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-1 ml-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLanding;
