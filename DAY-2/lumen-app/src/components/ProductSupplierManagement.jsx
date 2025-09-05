import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Plus, Edit, Trash2, Search, Filter, ArrowLeft, Eye, Truck, DollarSign, Calendar, Tag } from 'lucide-react';

const ProductSupplierManagement = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    cost: '',
    sku: '',
    supplierId: '',
    stock: 0,
    minStock: 0,
    maxStock: 0
  });

  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    status: 'active'
  });

  // Sample data
  useEffect(() => {
    setIsLoaded(true);
    const sampleProducts = [
      {
        id: 1,
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with advanced camera system',
        category: 'Electronics',
        price: 999,
        cost: 800,
        sku: 'IPH15P-001',
        supplierId: 1,
        supplierName: 'Apple Inc.',
        stock: 25,
        minStock: 5,
        maxStock: 100,
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        name: 'MacBook Air M2',
        description: 'Ultra-thin laptop with M2 chip',
        category: 'Electronics',
        price: 1199,
        cost: 950,
        sku: 'MBA-M2-001',
        supplierId: 1,
        supplierName: 'Apple Inc.',
        stock: 15,
        minStock: 3,
        maxStock: 50,
        createdAt: '2024-01-10'
      },
      {
        id: 3,
        name: 'Office Chair',
        description: 'Ergonomic office chair with lumbar support',
        category: 'Furniture',
        price: 299,
        cost: 200,
        sku: 'CHAIR-001',
        supplierId: 2,
        supplierName: 'Furniture Co.',
        stock: 8,
        minStock: 2,
        maxStock: 30,
        createdAt: '2024-01-12'
      }
    ];

    const sampleSuppliers = [
      {
        id: 1,
        name: 'Apple Inc.',
        contact: 'John Smith',
        email: 'john.smith@apple.com',
        phone: '+1 (555) 123-4567',
        address: '1 Apple Park Way',
        city: 'Cupertino',
        country: 'USA',
        status: 'active',
        createdAt: '2024-01-01'
      },
      {
        id: 2,
        name: 'Furniture Co.',
        contact: 'Sarah Johnson',
        email: 'sarah@furnitureco.com',
        phone: '+1 (555) 234-5678',
        address: '123 Furniture St',
        city: 'New York',
        country: 'USA',
        status: 'active',
        createdAt: '2024-01-05'
      },
      {
        id: 3,
        name: 'Tech Supplies Ltd.',
        contact: 'Mike Wilson',
        email: 'mike@techsupplies.com',
        phone: '+1 (555) 345-6789',
        address: '456 Tech Ave',
        city: 'San Francisco',
        country: 'USA',
        status: 'inactive',
        createdAt: '2024-01-08'
      }
    ];

    setProducts(sampleProducts);
    setSuppliers(sampleSuppliers);
    setFilteredProducts(sampleProducts);
    setFilteredSuppliers(sampleSuppliers);
  }, []);

  // Filter and search
  useEffect(() => {
    if (activeTab === 'products') {
      let filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
        return matchesSearch && matchesCategory;
      });
      setFilteredProducts(filtered);
    } else {
      let filtered = suppliers.filter(supplier => {
        const matchesSearch = supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
      });
      setFilteredSuppliers(filtered);
    }
  }, [searchTerm, filterCategory, activeTab, products, suppliers]);

  const handleAddProduct = (e) => {
    e.preventDefault();
    const supplier = suppliers.find(s => s.id === parseInt(newProduct.supplierId));
    const product = {
      ...newProduct,
      id: products.length + 1,
      supplierName: supplier ? supplier.name : 'Unknown',
      price: parseFloat(newProduct.price),
      cost: parseFloat(newProduct.cost),
      stock: parseInt(newProduct.stock),
      minStock: parseInt(newProduct.minStock),
      maxStock: parseInt(newProduct.maxStock),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts([...products, product]);
    setNewProduct({
      name: '',
      description: '',
      category: '',
      price: '',
      cost: '',
      sku: '',
      supplierId: '',
      stock: 0,
      minStock: 0,
      maxStock: 0
    });
    setIsAddModalOpen(false);
  };

  const handleAddSupplier = (e) => {
    e.preventDefault();
    const supplier = {
      ...newSupplier,
      id: suppliers.length + 1,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSuppliers([...suppliers, supplier]);
    setNewSupplier({
      name: '',
      contact: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      status: 'active'
    });
    setIsAddModalOpen(false);
  };

  const handleEditItem = (e) => {
    e.preventDefault();
    if (activeTab === 'products') {
      setProducts(products.map(item => 
        item.id === selectedItem.id ? { ...selectedItem } : item
      ));
    } else {
      setSuppliers(suppliers.map(item => 
        item.id === selectedItem.id ? { ...selectedItem } : item
      ));
    }
    setIsEditModalOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteItem = () => {
    if (activeTab === 'products') {
      setProducts(products.filter(item => item.id !== selectedItem.id));
    } else {
      setSuppliers(suppliers.filter(item => item.id !== selectedItem.id));
    }
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
  };

  const openEditModal = (item) => {
    setSelectedItem({ ...item });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  const getStockColor = (stock, minStock) => {
    if (stock <= minStock) return 'text-red-600';
    if (stock <= minStock * 2) return 'text-yellow-600';
    return 'text-green-600';
  };

  const categories = ['all', 'Electronics', 'Furniture', 'Clothing', 'Books', 'Other'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Loading Screen */}
      <div className={`fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-1000 ${
        isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="text-xl font-semibold text-gray-700 animate-pulse">Loading Products & Suppliers...</div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg border-b border-blue-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Link to="/admin" className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Product & Supplier Management</h1>
                <p className="text-sm text-gray-500 font-medium">Manage products, suppliers, and procurement</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Add {activeTab === 'products' ? 'Product' : 'Supplier'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex space-x-2 bg-gray-100 p-2 rounded-xl">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 py-4 px-6 rounded-xl text-lg font-bold transition-all duration-300 ${
                activeTab === 'products'
                  ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Package className="w-5 h-5 inline mr-3" />
              Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('suppliers')}
              className={`flex-1 py-4 px-6 rounded-xl text-lg font-bold transition-all duration-300 ${
                activeTab === 'suppliers'
                  ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Truck className="w-5 h-5 inline mr-3" />
              Suppliers ({suppliers.length})
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder={`Search ${activeTab} by name, description, or other details...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
              />
            </div>
            {activeTab === 'products' && (
              <div className="flex items-center space-x-3">
                <Filter className="w-6 h-6 text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-medium"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Products Table */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Product</th>
                    <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Category</th>
                    <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Price</th>
                    <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Stock</th>
                    <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Supplier</th>
                    <th className="px-8 py-6 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-semibold">
                            <Package className="w-5 h-5" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                            <div className="text-sm text-gray-500">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${product.price}</div>
                        <div className="text-sm text-gray-500">Cost: ${product.cost}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${getStockColor(product.stock, product.minStock)}`}>
                          {product.stock} units
                        </div>
                        <div className="text-sm text-gray-500">Min: {product.minStock}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {product.supplierName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openEditModal(product)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(product)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Suppliers Table */}
        {activeTab === 'suppliers' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                            <Truck className="w-5 h-5" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{supplier.name}</div>
                            <div className="text-sm text-gray-500">{supplier.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{supplier.contact}</div>
                        <div className="text-sm text-gray-500">{supplier.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{supplier.city}, {supplier.country}</div>
                        <div className="text-sm text-gray-500">{supplier.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(supplier.status)}`}>
                          {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openEditModal(supplier)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(supplier)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add New {activeTab === 'products' ? 'Product' : 'Supplier'}
              </h3>
              <form onSubmit={activeTab === 'products' ? handleAddProduct : handleAddSupplier}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeTab === 'products' ? (
                    <>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input
                          type="text"
                          required
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Category</option>
                          {categories.slice(1).map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                        <input
                          type="text"
                          required
                          value={newProduct.sku}
                          onChange={(e) => setNewProduct({...newProduct, sku: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cost ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={newProduct.cost}
                          onChange={(e) => setNewProduct({...newProduct, cost: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
                        <input
                          type="number"
                          required
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock</label>
                        <input
                          type="number"
                          required
                          value={newProduct.minStock}
                          onChange={(e) => setNewProduct({...newProduct, minStock: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Stock</label>
                        <input
                          type="number"
                          required
                          value={newProduct.maxStock}
                          onChange={(e) => setNewProduct({...newProduct, maxStock: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                        <select
                          value={newProduct.supplierId}
                          onChange={(e) => setNewProduct({...newProduct, supplierId: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Supplier</option>
                          {suppliers.map(supplier => (
                            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input
                          type="text"
                          required
                          value={newSupplier.name}
                          onChange={(e) => setNewSupplier({...newSupplier, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                        <input
                          type="text"
                          required
                          value={newSupplier.contact}
                          onChange={(e) => setNewSupplier({...newSupplier, contact: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          required
                          value={newSupplier.email}
                          onChange={(e) => setNewSupplier({...newSupplier, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          required
                          value={newSupplier.phone}
                          onChange={(e) => setNewSupplier({...newSupplier, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                          type="text"
                          required
                          value={newSupplier.address}
                          onChange={(e) => setNewSupplier({...newSupplier, address: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={newSupplier.city}
                          onChange={(e) => setNewSupplier({...newSupplier, city: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input
                          type="text"
                          required
                          value={newSupplier.country}
                          onChange={(e) => setNewSupplier({...newSupplier, country: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={newSupplier.status}
                          onChange={(e) => setNewSupplier({...newSupplier, status: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Add {activeTab === 'products' ? 'Product' : 'Supplier'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Edit {activeTab === 'products' ? 'Product' : 'Supplier'}
              </h3>
              <form onSubmit={handleEditItem}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeTab === 'products' ? (
                    <>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                        <input
                          type="text"
                          required
                          value={selectedItem.name}
                          onChange={(e) => setSelectedItem({...selectedItem, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={selectedItem.description}
                          onChange={(e) => setSelectedItem({...selectedItem, description: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows="3"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                          value={selectedItem.category}
                          onChange={(e) => setSelectedItem({...selectedItem, category: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {categories.slice(1).map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                        <input
                          type="text"
                          required
                          value={selectedItem.sku}
                          onChange={(e) => setSelectedItem({...selectedItem, sku: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={selectedItem.price}
                          onChange={(e) => setSelectedItem({...selectedItem, price: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cost ($)</label>
                        <input
                          type="number"
                          step="0.01"
                          required
                          value={selectedItem.cost}
                          onChange={(e) => setSelectedItem({...selectedItem, cost: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
                        <input
                          type="number"
                          required
                          value={selectedItem.stock}
                          onChange={(e) => setSelectedItem({...selectedItem, stock: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock</label>
                        <input
                          type="number"
                          required
                          value={selectedItem.minStock}
                          onChange={(e) => setSelectedItem({...selectedItem, minStock: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Max Stock</label>
                        <input
                          type="number"
                          required
                          value={selectedItem.maxStock}
                          onChange={(e) => setSelectedItem({...selectedItem, maxStock: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                        <select
                          value={selectedItem.supplierId}
                          onChange={(e) => setSelectedItem({...selectedItem, supplierId: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {suppliers.map(supplier => (
                            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                        <input
                          type="text"
                          required
                          value={selectedItem.name}
                          onChange={(e) => setSelectedItem({...selectedItem, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                        <input
                          type="text"
                          required
                          value={selectedItem.contact}
                          onChange={(e) => setSelectedItem({...selectedItem, contact: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          required
                          value={selectedItem.email}
                          onChange={(e) => setSelectedItem({...selectedItem, email: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          required
                          value={selectedItem.phone}
                          onChange={(e) => setSelectedItem({...selectedItem, phone: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                          type="text"
                          required
                          value={selectedItem.address}
                          onChange={(e) => setSelectedItem({...selectedItem, address: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          required
                          value={selectedItem.city}
                          onChange={(e) => setSelectedItem({...selectedItem, city: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input
                          type="text"
                          required
                          value={selectedItem.country}
                          onChange={(e) => setSelectedItem({...selectedItem, country: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select
                          value={selectedItem.status}
                          onChange={(e) => setSelectedItem({...selectedItem, status: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Update {activeTab === 'products' ? 'Product' : 'Supplier'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {isDeleteModalOpen && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Delete {activeTab === 'products' ? 'Product' : 'Supplier'}
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <strong>{selectedItem.name}</strong>? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteItem}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Delete {activeTab === 'products' ? 'Product' : 'Supplier'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductSupplierManagement;
