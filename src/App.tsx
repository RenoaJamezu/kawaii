import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './page/Index';
import ProtectedRoutes from './components/ProtectedRoutes';
import Layout from './page/dashboard/Layout';
import LoveLetter from './page/dashboard/LoveLetter';
import Music from './page/dashboard/Music';
import Gallery from './page/dashboard/Gallery';
import Note from './page/dashboard/Note';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Index />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/dashboard' element={<Layout />}>
              <Route path='love-letter' element={<LoveLetter />} />
              <Route path='music' element={<Music />} />
              <Route path='note' element={<Note />} />
              <Route path='gallery' element={<Gallery />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
