import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Shield, Package, Users, Bell, Search, BarChart3, TrendingUp, Download, PieChart } from 'lucide-react';

const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());

  const observerRef = useRef();

  useEffect(() => {
    // Page load animation
    setIsLoaded(true);
    
   
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for section animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
    //   clearInterval(glitchInterval);
      window.removeEventListener('scroll', handleScroll);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Loading Screen */}
      <div className={`fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-1000 ${
        isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="text-xl font-semibold text-gray-700 animate-pulse">Loading StockMate...</div>
        </div>
      </div>

      {/* Header / Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className={`font-bold text-2xl transition-all duration-500 ${
              isScrolled ? 'text-gray-900' : 'text-white drop-shadow-lg'
            }`}>
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                StockMate
              </span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className={`transition-all duration-300 hover:scale-110 hover:text-blue-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'
                }`}
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`transition-all duration-300 hover:scale-110 hover:text-blue-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className={`transition-all duration-300 hover:scale-110 hover:text-blue-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'
                }`}
              >
                Contact
              </button>
              <Link 
                to="/admin"
                className={`transition-all duration-300 hover:scale-110 hover:text-blue-600 ${
                  isScrolled ? 'text-gray-700' : 'text-white drop-shadow-md'
                }`}
              >
                Admin Panel
              </Link>
            </nav>
            
            <Link to="/login" className="group relative bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl font-semibold text-sm tracking-wide uppercase hover:from-green-700 hover:to-green-800 hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden border border-green-500/20 hover:border-green-400/40 inline-block">
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 min-h-screen px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
             
                Smart Inventory Management
             
              <br />
              <span className="text-blue-600 animate-bounce">for Growing Businesses</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
              Manage products, suppliers, and stock seamlessly with real-time alerts and insights. 
              Streamline your operations and make data-driven decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up animation-delay-500">
              <Link to="/login" className="group relative bg-gradient-to-r from-green-600 to-green-700 text-white px-10 py-4 rounded-2xl text-lg font-bold tracking-wide hover:from-green-700 hover:to-green-800 hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden border border-green-500/30 hover:border-green-400/50 shadow-lg hover:shadow-green-500/25 inline-block">
                <span className="relative z-10 flex items-center gap-3">
                  Get Started
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </Link>
              <button className="group relative bg-white text-gray-800 px-10 py-4 rounded-2xl text-lg font-bold tracking-wide hover:bg-gray-50 hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-gray-500/20">
                <span className="relative z-10 flex items-center gap-3">
                  Learn More
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
            
            {/* Enhanced Illustration */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-12 shadow-2xl max-w-4xl mx-auto border border-blue-100 hover:shadow-3xl transition-all duration-500 group">
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <BarChart3 className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-gray-600 font-medium">Analytics Dashboard</p>
                </div>
                <div className="text-center group-hover:scale-110 transition-transform duration-300 animation-delay-200">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Package className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-gray-600 font-medium">Product Management</p>
                </div>
                <div className="text-center group-hover:scale-110 transition-transform duration-300 animation-delay-400">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-gray-600 font-medium">Stock Insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 bg-gradient-to-br from-gray-50 to-blue-50 transition-all duration-1000 ${
        visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              Everything You Need to Manage Inventory
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Powerful features designed to streamline your inventory operations and boost efficiency
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Enhanced Feature Cards with Glowing Borders */}
            <div className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-blue-200 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  Secure Authentication & Roles
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Multi-level access control with secure login and role-based permissions for your team members.
                </p>
              </div>
            </div>
            
            <div className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-green-200 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-green-400 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                  Product Management
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Comprehensive product catalog with detailed tracking, categorization, and inventory levels.
                </p>
              </div>
            </div>
            
            <div className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-blue-200 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  Supplier Management
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Maintain detailed supplier profiles, track performance, and manage procurement efficiently.
                </p>
              </div>
            </div>
            
            <div className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-green-200 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-green-400 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                  Alerts & Notifications
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Real-time notifications for low stock, reorder points, and important inventory changes.
                </p>
              </div>
            </div>
            
            <div className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-blue-200 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  Search & Filtering
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Advanced search capabilities with powerful filters to quickly find products and data.
                </p>
              </div>
            </div>
            
            <div className="group relative bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-green-200 hover:border-green-400 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 rounded-xl border-2 border-green-400 group-hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                  Reporting Dashboard
                  <span className="ml-2 text-sm bg-gradient-to-r from-green-100 to-green-200 text-green-700 px-2 py-1 rounded-full animate-pulse">
                    Premium
                  </span>
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  Comprehensive analytics and reporting with customizable dashboards and insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className={`py-20 transition-all duration-1000 
         opacity-100 translate-y-0'
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
              Advanced Features for Scale
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in-up animation-delay-200">
              Take your inventory management to the next level with intelligent insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 hover:scale-105 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                Demand Forecasting
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                AI-powered predictions to optimize stock levels and prevent stockouts or overstock situations.
              </p>
            </div>
            
            <div className="group text-center p-8 hover:scale-105 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
                Data Import/Export
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Seamlessly import existing data and export reports in multiple formats including CSV and Excel.
              </p>
            </div>
            
            <div className="group text-center p-8 hover:scale-105 transition-all duration-500">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <PieChart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                Interactive Dashboard
              </h3>
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Real-time visual insights with customizable widgets and interactive charts for better decision making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className={`py-20 bg-gradient-to-br from-gray-50 to-blue-50 transition-all duration-1000 
         'opacity-100 translate-y-0' 
      `}>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Start Managing Smarter Today
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed animate-fade-in-up animation-delay-200">
            Join hundreds of businesses already using StockMate to streamline their inventory operations.
            Get started in minutes, not hours.
          </p>
          <Link to="/login" className="group relative bg-gradient-to-r from-green-600 to-green-700 text-white px-16 py-5 rounded-2xl text-xl font-bold tracking-wide hover:from-green-700 hover:to-green-800 hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden animate-fade-in-up animation-delay-400 border border-green-500/30 hover:border-green-400/50 shadow-xl hover:shadow-green-500/30 inline-block">
            <span className="relative z-10 flex items-center gap-3">
              Get Started Free
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </Link>
          <p className="text-gray-500 mt-4 animate-fade-in-up animation-delay-600">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gradient-to-r from-gray-900 to-gray-800 py-12 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="font-bold text-2xl text-white mb-4 md:mb-0">
              <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                StockMate
              </span>
            </div>
            
            <div className="flex space-x-8 mb-4 md:mb-0">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:scale-110">About</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:scale-110">Privacy</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:scale-110">Terms</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:scale-110">Contact</a>
            </div>
            
            <p className="text-gray-400 text-sm">
              © 2025 StockMate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;