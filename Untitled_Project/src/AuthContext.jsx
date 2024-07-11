import { createContext, useContext, useState, useEffect } from 'react';
import { getAccessToken, removeTokens } from './api';

// Create the context
const AuthContext = createContext();

// Create a provider component
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = await getAccessToken();
      setIsLoggedIn(!token);
    };

    // Initial check on component mount
    checkTokenValidity();

    // Check token validity every minute
    const interval = setInterval(checkTokenValidity, 60000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

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

// Create a custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}