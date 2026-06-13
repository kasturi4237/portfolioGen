import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.875rem',
          background: '#fff',
          color: '#3D3758',
          border: '1.5px solid #EDE8F8',
          boxShadow: '0 4px 24px rgba(123,107,232,.12)'
        },
        success: { iconTheme: { primary: '#8EC4A4', secondary: '#fff' } },
        error: { iconTheme: { primary: '#E89898', secondary: '#fff' } }
      }}
    />
  </React.StrictMode>
)
