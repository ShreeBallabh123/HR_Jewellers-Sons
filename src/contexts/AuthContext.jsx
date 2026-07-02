import React, { createContext, useState, useEffect } from 'react';
import { auth, signInAnonymously, onAuthStateChanged, signOut } from '../firebase/auth';
import { StorageService } from '../services/StorageService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminRole, setAdminRole] = useState(() => {
    return StorageService.get('hrj_admin_role', null);
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Persist admin role changes to local storage
  useEffect(() => {
    if (adminRole) {
      StorageService.set('hrj_admin_role', adminRole);
    } else {
      StorageService.remove('hrj_admin_role');
    }
  }, [adminRole]);

  // Login anonymously for regular visitors
  const loginAnonymously = async () => {
    try {
      await signInAnonymously(auth);
    } catch (err) {
      console.error("Anonymous authentication failed:", err);
    }
  };

  // Sign out user
  const logout = async () => {
    try {
      await signOut(auth);
      StorageService.remove('hrj_admin_role');
      setAdminRole(null);
    } catch (err) {
      console.error("Sign-out failed:", err);
    }
  };


  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        adminRole,
        setAdminRole,
        loginAnonymously,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
