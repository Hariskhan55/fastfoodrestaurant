import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Mock admin credentials
  const adminCredentials = {
    email: 'admin@fastfood.com',
    password: 'admin123'
  };
  
  // Load user from localStorage on initial render
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
        setCurrentUser(null);
      }
    }
    setLoading(false);
  }, []);
  
  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('user');
    }
  }, [currentUser]);
  
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        if (email === adminCredentials.email && password === adminCredentials.password) {
          const user = {
            id: 1,
            email,
            name: 'Admin User',
            role: 'admin'
          };
          setCurrentUser(user);
          resolve(user);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };
  
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };
  
  const isAdmin = () => {
    return currentUser?.role === 'admin';
  };
  
  const value = {
    currentUser,
    login,
    logout,
    isAdmin,
    loading
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;