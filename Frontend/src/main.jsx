import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import AuthProvider from './context/AuthProvider.jsx'
import { BioProvider } from './context/BioProvider.jsx'
import { AdminProvider } from './context/AdminProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BioProvider>
          <AdminProvider>
            <App />
          </AdminProvider>
        </BioProvider>
      </AuthProvider>
    </BrowserRouter >
  </StrictMode>,
)
