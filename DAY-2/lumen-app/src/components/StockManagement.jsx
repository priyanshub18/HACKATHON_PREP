import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Plus, Edit, Trash2, Search, Filter, ArrowLeft, Eye, AlertTriangle, TrendingUp, TrendingDown, Package, Calendar, ArrowUp, ArrowDown } from 'lucide-react';

const StockManagement = () => {
  const [stockItems, setStockItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMovementModalOpen, setIsMovementModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [newStockItem, setNewStockItem] = useState({
    productId: '',
    productName: '',
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    reorderPoint: 0,
    location: '',
    status: 'active'
  });

  const [stockMovement, setStockMovement] = useState({
    itemId: '',
    type: 'in',
    quantity: 0,
    reason: '',
    notes: ''
  });

  // Sample data
  useEffect(() => {
    setIsLoaded(true);
    const sampleStockItems = [
      {
        id: 1,
        productId: 1,
        productName: 'iPhone 15 Pro',
        sku: 'IPH15P-001',
        currentStock: 25,
        minStock: 5,
        maxStock: 100,
        reorderPoint: 10,
        location: 'Warehouse A - Shelf 1',
        status: 'active',
        lastUpdated: '2024-01-20',
        movements: [
          { id: 1, type: 'in', quantity: 50, reason: 'Purchase Order', date: '2024-01-15', notes: 'Initial stock' },
          { id: 2, type: 'out', quantity: 25, reason: 'Sales', date: '2024-01-18', notes: 'Customer orders' }
        ]
      },
      {
        id: 2,
        productId: 2,
        productName: 'MacBook Air M2',
        sku: 'MBA-M2-001',
        currentStock: 15,
        minStock: 3,
        maxStock: 50,
        reorderPoint: 5,
        location: 'Warehouse A - Shelf 2',
        status: 'active',
        lastUpdated: '2024-01-20',
        movements: [
          { id: 3, type: 'in', quantity: 30, reason: 'Purchase Order', date: '2024-01-10', notes: 'New shipment' },
          { id: 4, type: 'out', quantity: 15, reason: 'Sales', date: '2024-01-19', notes: 'Bulk order' }
        ]
      },
      {
        id: 3,
        productId: 3,
        productName: 'Office Chair',
        sku: 'CHAIR-001',
        currentStock: 2,
        minStock: 2,
        maxStock: 30,
        reorderPoint: 5,
        location: 'Warehouse B - Section 3',
        status: 'low_stock',
        lastUpdated: '2024-01-20',
        movements: [
          { id: 5, type: 'in', quantity: 20, reason: 'Purchase Order', date: '2024-01-12', notes: 'Furniture delivery' },
          { id: 6, type: 'out', quantity: 18, reason: 'Sales', date: '2024-01-19', notes: 'Office setup' }
        ]
      },
      {
        id: 4,
        productId: 4,
        productName: 'Wireless Mouse',
        sku: 'WM-001',
        currentStock: 0,
        minStock: 10,
        maxStock: 100,
        reorderPoint: 15,
        location: 'Warehouse B - Section 1',
        status: 'out_of_stock',
        lastUpdated: '2024-01-20',
        movements: [
          { id: 7, type: 'in', quantity: 50, reason: 'Purchase Order', date: '2024-01-05', notes: 'Bulk purchase' },
          { id: 8, type: 'out', quantity: 50, reason: 'Sales', date: '2024-01-18', notes: 'High demand' }
        ]
      }
    ];
    setStockItems(sampleStockItems);
    setFilteredItems(sampleStockItems);
  }, []);

  // Filter and search
  useEffect(() => {
    let filtered = stockItems.filter(item => {
      const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
    setFilteredItems(filtered);
  }, [searchTerm, filterStatus, stockItems]);

  const handleAddStockItem = (e) => {
    e.preventDefault();
    const item = {
      ...newStockItem,
      id: stockItems.length + 1,
      sku: `SKU-${Date.now()}`,
      currentStock: parseInt(newStockItem.currentStock),
      minStock: parseInt(newStockItem.minStock),
      maxStock: parseInt(newStockItem.maxStock),
      reorderPoint: parseInt(newStockItem.reorderPoint),
      lastUpdated: new Date().toISOString().split('T')[0],
      movements: []
    };
    setStockItems([...stockItems, item]);
    setNewStockItem({
      productId: '',
      productName: '',
      currentStock: 0,
      minStock: 0,
      maxStock: 0,
      reorderPoint: 0,
      location: '',
      status: 'active'
    });
    setIsAddModalOpen(false);
  };

  const handleEditStockItem = (e) => {
    e.preventDefault();
    setStockItems(stockItems.map(item => 
      item.id === selectedItem.id ? { ...selectedItem } : item
    ));
    setIsEditModalOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteStockItem = () => {
    setStockItems(stockItems.filter(item => item.id !== selectedItem.id));
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
  };

  const handleStockMovement = (e) => {
    e.preventDefault();
    const movement = {
      id: Date.now(),
      type: stockMovement.type,
      quantity: parseInt(stockMovement.quantity),
      reason: stockMovement.reason,
      date: new Date().toISOString().split('T')[0],
      notes: stockMovement.notes
    };

    setStockItems(stockItems.map(item => {
      if (item.id === parseInt(stockMovement.itemId)) {
        const newStock = stockMovement.type === 'in' 
          ? item.currentStock + parseInt(stockMovement.quantity)
          : item.currentStock - parseInt(stockMovement.quantity);
        
        let newStatus = 'active';
        if (newStock <= 0) newStatus = 'out_of_stock';
        else if (newStock <= item.minStock) newStatus = 'low_stock';
        else if (newStock >= item.maxStock) newStatus = 'overstock';

        return {
          ...item,
          currentStock: Math.max(0, newStock),
          status: newStatus,
          lastUpdated: new Date().toISOString().split('T')[0],
          movements: [...item.movements, movement]
        };
      }
      return item;
    }));

    setStockMovement({
      itemId: '',
      type: 'in',
      quantity: 0,
      reason: '',
      notes: ''
    });
    setIsMovementModalOpen(false);
  };

  const openEditModal = (item) => {
    setSelectedItem({ ...item });
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const openMovementModal = (item) => {
    setStockMovement({ ...stockMovement, itemId: item.id });
    setIsMovementModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      case 'overstock': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'In Stock';
      case 'low_stock': return 'Low Stock';
      case 'out_of_stock': return 'Out of Stock';
      case 'overstock': return 'Overstock';
      default: return 'Unknown';
    }
  };

  const getStockLevel = (current, min, max) => {
    if (current <= 0) return { level: 'out', color: 'text-red-600' };
    if (current <= min) return { level: 'low', color: 'text-yellow-600' };
    if (current >= max) return { level: 'high', color: 'text-blue-600' };
    return { level: 'normal', color: 'text-green-600' };
  };

  const stats = {
    totalItems: stockItems.length,
    lowStock: stockItems.filter(item => item.status === 'low_stock').length,
    outOfStock: stockItems.filter(item => item.status === 'out_of_stock').length,
    overstock: stockItems.filter(item => item.status === 'overstock').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Loading Screen */}
      <div className={`fixed inset-0 bg-white z-50 flex items-center justify-center transition-opacity duration-1000 ${
        isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="text-xl font-semibold text-gray-700 animate-pulse">Loading Stock Management...</div>
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
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Stock Management</h1>
                <p className="text-sm text-gray-500 font-medium">Track inventory levels and stock movements</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMovementModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <ArrowUp className="w-5 h-5" />
                <span>Stock Movement</span>
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5" />
                <span>Add Item</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Total Items</p>
                <p className="text-4xl font-bold text-gray-900">{stats.totalItems}</p>
                <p className="text-xs text-blue-600 font-medium mt-1">All products</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Package className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Low Stock</p>
                <p className="text-4xl font-bold text-yellow-600">{stats.lowStock}</p>
                <p className="text-xs text-yellow-600 font-medium mt-1">Needs attention</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <AlertTriangle className="w-7 h-7 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Out of Stock</p>
                <p className="text-4xl font-bold text-red-600">{stats.outOfStock}</p>
                <p className="text-xs text-red-600 font-medium mt-1">Urgent restock needed</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <AlertTriangle className="w-7 h-7 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Overstock</p>
                <p className="text-4xl font-bold text-blue-600">{stats.overstock}</p>
                <p className="text-xs text-blue-600 font-medium mt-1">Consider reducing</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search stock items by name, SKU, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Filter className="w-6 h-6 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-medium"
              >
                <option value="all">All Status</option>
                <option value="active">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="overstock">Overstock</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stock Items Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Product</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Stock Level</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Location</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-8 py-6 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">Last Updated</th>
                  <th className="px-8 py-6 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => {
                  const stockLevel = getStockLevel(item.currentStock, item.minStock, item.maxStock);
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                            <Package className="w-5 h-5" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                            <div className="text-sm text-gray-500">SKU: {item.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          <span className={stockLevel.color}>{item.currentStock}</span> units
                        </div>
                        <div className="text-sm text-gray-500">
                          Min: {item.minStock} | Max: {item.maxStock}
                        </div>
                        <div className="text-xs text-gray-400">
                          Reorder at: {item.reorderPoint}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                          {getStatusText(item.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(item.lastUpdated).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => openMovementModal(item)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                            title="Stock Movement"
                          >
                            {stockMovement.type === 'in' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => openEditModal(item)}
                            className="text-green-600 hover:text-green-900 p-1 rounded"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(item)}
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Stock Item Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Stock Item</h3>
              <form onSubmit={handleAddStockItem}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                      type="text"
                      required
                      value={newStockItem.productName}
                      onChange={(e) => setNewStockItem({...newStockItem, productName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
                    <input
                      type="text"
                      required
                      value={newStockItem.productId}
                      onChange={(e) => setNewStockItem({...newStockItem, productId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
                    <input
                      type="number"
                      required
                      value={newStockItem.currentStock}
                      onChange={(e) => setNewStockItem({...newStockItem, currentStock: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock</label>
                    <input
                      type="number"
                      required
                      value={newStockItem.minStock}
                      onChange={(e) => setNewStockItem({...newStockItem, minStock: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Stock</label>
                    <input
                      type="number"
                      required
                      value={newStockItem.maxStock}
                      onChange={(e) => setNewStockItem({...newStockItem, maxStock: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Point</label>
                    <input
                      type="number"
                      required
                      value={newStockItem.reorderPoint}
                      onChange={(e) => setNewStockItem({...newStockItem, reorderPoint: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      required
                      value={newStockItem.location}
                      onChange={(e) => setNewStockItem({...newStockItem, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={newStockItem.status}
                      onChange={(e) => setNewStockItem({...newStockItem, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
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
                    Add Stock Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Stock Movement Modal */}
        {isMovementModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Movement</h3>
              <form onSubmit={handleStockMovement}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                    <select
                      value={stockMovement.itemId}
                      onChange={(e) => setStockMovement({...stockMovement, itemId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Product</option>
                      {stockItems.map(item => (
                        <option key={item.id} value={item.id}>{item.productName}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Movement Type</label>
                    <select
                      value={stockMovement.type}
                      onChange={(e) => setStockMovement({...stockMovement, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="in">Stock In</option>
                      <option value="out">Stock Out</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      required
                      value={stockMovement.quantity}
                      onChange={(e) => setStockMovement({...stockMovement, quantity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                    <select
                      value={stockMovement.reason}
                      onChange={(e) => setStockMovement({...stockMovement, reason: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Reason</option>
                      <option value="Purchase Order">Purchase Order</option>
                      <option value="Sales">Sales</option>
                      <option value="Return">Return</option>
                      <option value="Adjustment">Adjustment</option>
                      <option value="Transfer">Transfer</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={stockMovement.notes}
                      onChange={(e) => setStockMovement({...stockMovement, notes: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsMovementModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Record Movement
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Stock Item</h3>
              <form onSubmit={handleEditStockItem}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <input
                      type="text"
                      required
                      value={selectedItem.productName}
                      onChange={(e) => setSelectedItem({...selectedItem, productName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
                    <input
                      type="text"
                      required
                      value={selectedItem.productId}
                      onChange={(e) => setSelectedItem({...selectedItem, productId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
                    <input
                      type="number"
                      required
                      value={selectedItem.currentStock}
                      onChange={(e) => setSelectedItem({...selectedItem, currentStock: e.target.value})}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Point</label>
                    <input
                      type="number"
                      required
                      value={selectedItem.reorderPoint}
                      onChange={(e) => setSelectedItem({...selectedItem, reorderPoint: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      required
                      value={selectedItem.location}
                      onChange={(e) => setSelectedItem({...selectedItem, location: e.target.value})}
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
                    Update Stock Item
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Stock Item</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <strong>{selectedItem.productName}</strong>? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteStockItem}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  Delete Stock Item
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StockManagement;
