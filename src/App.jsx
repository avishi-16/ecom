import { Routes, Route } from 'react-router-dom';
import LandingPg from './pages/LandingPg/LandingPg';
import RegForm from './components/RegForm/RegForm';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return( <>
     <Routes>
       <Route path="/" element={<LandingPg />} />
       <Route path="/register" element={<RegForm />} />
       <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </>
  )
}

export default App
