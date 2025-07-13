import { Routes, Route } from 'react-router-dom';
import LandingPg from './pages/LandingPg/LandingPg';
import RegForm from './components/RegForm/RegForm';
import Dashboard from './pages/Dashboard/Dashboard';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Profile from './pages/Profile/Profile';

function App() {
  return( <>
     <Routes>
       <Route path="/" element={<LandingPg />} />
       <Route path="/register" element={<RegForm />} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/cart" element={<Cart />} />
       <Route path="/checkout" element={<Checkout />} />
       <Route path="/profile" element={<Profile />} />
    </Routes>
    </>
  )
}

export default App
