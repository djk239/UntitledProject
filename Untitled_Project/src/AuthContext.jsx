import { createContext, useContext, useState, useEffect } from 'react';
import { getAccessToken, removeTokens } from './api';

// Create the context for auth
const AuthContext = createContext();

// Create provider component
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // checks token on mount
  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = await getAccessToken();
      setIsLoggedIn(!!token);
    };

    // Initial check on component mount
    checkTokenValidity();

    // Check token validity every minute
    const interval = setInterval(checkTokenValidity, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Functions to handle login/logout
  const handleLog = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    removeTokens();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, handleLog, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

// custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}