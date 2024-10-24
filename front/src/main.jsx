import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { SidebarProvider } from '../src/components/ui/sidebar.jsx'
import App from './App.jsx'
import './index.css'
import Sidebar2 from './components/Sidebar2.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </StrictMode>,
)
