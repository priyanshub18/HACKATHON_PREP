import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Landing from './components/Landing'
import Login from './components/Login'
import AdminLanding from './components/AdminLanding'
import UserManagement from './components/UserManagement'
import ProductSupplierManagement from './components/ProductSupplierManagement'
import StockManagement from './components/StockManagement'
import ManagerLanding from './components/ManagerLanding'
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route redirects to landing page */}
          <Route path="/" element={<Navigate to="/landing" replace />} />
          
          {/* Landing page route */}
          <Route path="/landing" element={<Landing />} />
          
          {/* Login page route */}
          <Route path="/login" element={<Login />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLanding />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/products" element={<ProductSupplierManagement />} />
          <Route path="/admin/stock" element={<StockManagement />} />

          {/* {Manager Pages} */}

          <Route path="/manager" element={<ManagerLanding />} />
          <Route path="/manager/products" element={<ProductSupplierManagement />} />
          <Route path="/manager/stock" element={<StockManagement />} />
          
          {/* Catch all route - redirect to landing if route not found */}
          <Route path="*" element={<Navigate to="/landing" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
