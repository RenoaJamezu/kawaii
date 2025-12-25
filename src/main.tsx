import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import AnimatedBackground from './components/AnimatedBackground.tsx'
import { AudioPlayerProvider } from './context/AudioPlayerContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AudioPlayerProvider>
        <AnimatedBackground>
          <App />
        </AnimatedBackground>
      </AudioPlayerProvider>
    </AuthProvider>
  </StrictMode>,
)
