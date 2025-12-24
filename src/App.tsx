import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './page/Index';
import ProtectedRoutes from './components/ProtectedRoutes';
import Layout from './page/dashboard/Layout';
import Locked from './page/Locked';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Index />} />

          <Route element={
            <ProtectedRoutes unlockDate={new Date("2025-12-28T00:00:00")} />
          }>
            <Route path='/dashboard' element={<Layout />} />
          </Route>

          <Route path='/locked' element={<Locked />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
