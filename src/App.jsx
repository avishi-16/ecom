import { Routes, Route } from 'react-router-dom';
import LandingPg from './pages/LandingPg/LandingPg';
import RegForm from './components/RegForm/RegForm';
import Dashboard from './pages/Dashboard/Dashboard';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Profile from './pages/Profile/Profile';
import Logout from './components/Logout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return( <>
     <Routes>
       <Route path="/" element={<LandingPg />} />
       <Route path="/register" element={<RegForm />} />
       <Route path="/logout" element={<Logout />} />
       <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
    </Routes>
    </>
  )
}

export default App
