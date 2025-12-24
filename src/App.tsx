import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './page/Index';
import ProtectedRoutes from './components/ProtectedRoutes';
import Layout from './page/dashboard/Layout';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Index />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/dashboard' element={<Layout />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
