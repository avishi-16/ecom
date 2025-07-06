import { Routes, Route } from 'react-router-dom';
import LandingPg from './pages/LandingPg/LandingPg';
import RegForm from './components/RegForm/RegForm';

function App() {
  return( <>
     <Routes>
       <Route path="/" element={<LandingPg />} />
       <Route path="/register" element={<RegForm />} />
    </Routes>
    </>
  )
}

export default App
