import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './components/Landing'
import Login from './components/Login'
import AdminLanding from './components/AdminLanding'
import UserManagement from './components/UserManagement'
import ProductSupplierManagement from './components/ProductSupplierManagement'
import StockManagement from './components/StockManagement'
import ManagerLanding from './components/ManagerLanding'
import StaffLanding from './components/StaffLanding'
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Default route redirects to landing page */}
            <Route path="/" element={<Navigate to="/landing" replace />} />
            
            {/* Public routes */}
            <Route path="/landing" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Admin routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLanding />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <UserManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/products" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <ProductSupplierManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/stock" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <StockManagement />
                </ProtectedRoute>
              } 
            />

            {/* Protected Manager routes */}
            <Route 
              path="/manager" 
              element={
                <ProtectedRoute requiredRoles={['manager', 'admin']}>
                  <ManagerLanding />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/manager/products" 
              element={
                <ProtectedRoute requiredRoles={['manager', 'admin']}>
                  <ProductSupplierManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/manager/stock" 
              element={
                <ProtectedRoute requiredRoles={['manager', 'admin']}>
                  <StockManagement />
                </ProtectedRoute>
              } 
            />

            {/* Protected Staff routes */}
            <Route 
              path="/staff" 
              element={
                <ProtectedRoute requiredRoles={['staff', 'manager', 'admin']}>
                  <StaffLanding />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/staff/stock" 
              element={
                <ProtectedRoute requiredRoles={['staff', 'manager', 'admin']}>
                  <StockManagement />
                </ProtectedRoute>
              } 
            />

            {/* Catch all route - redirect to landing if route not found */}
            <Route path="*" element={<Navigate to="/landing" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
