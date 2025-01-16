import { useState } from 'react';
import './App.css'  
import { ThemeProvider } from './components/themeprovider'
import Sidebar2 from './components/Sidebar2';

function App() {
  const [showLogoutBox, setShowLogoutBox] = useState(false);

  const toggleLogoutBox = () => {
    setShowLogoutBox(!showLogoutBox);
  };

  const handleLogout = () => {
    console.log('User logged out');
    // Add your logout logic here (e.g., clearing session, redirecting, etc.)
    localStorage.removeItem('authToken');
    window.location.href = '/login'; // Redirect to login
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Sidebar2/>
    </ThemeProvider>
  );
}

export default App;

