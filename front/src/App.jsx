import { useState } from 'react';
import './App.css'  
import { ThemeProvider } from './components/themeprovider'
import Sidebar2 from './components/Sidebar2';
import Sidebar1 from './components/Sidebar';

function App() {
  const [showLogoutBox, setShowLogoutBox] = useState(false);

  const toggleLogoutBox = () => {
    setShowLogoutBox(!showLogoutBox);
  };

  const handleLogout = () => {
    console.log('User logged out');
    // Add your logout logic here (e.g., clearing session, redirecting, etc.)
  };
/*
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <GoogleOAuthProviderWrapper>
        <Router>
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <div className="flex-grow">
                <ModeToggle />
              </div>
              <div className="relative">
                <div
                  className="hover:bg-gray-200 hover:scale-105 hover:border hover:border-gray-400 transition-all duration-300 rounded-full p-2 cursor-pointer"
                  onClick={toggleLogoutBox}
                >
                  <AvatarDemo />
                </div>

                {showLogoutBox && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <ul>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <AuthContainer />
          </div>
        </Router>
      </GoogleOAuthProviderWrapper>
    </ThemeProvider>
  );
  */
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Sidebar2/>
    </ThemeProvider>
  );
}

export default App;

