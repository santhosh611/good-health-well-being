import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  // Store all users in a dictionary: { [username]: { password, ...userData } }
  const [users, setUsers] = useLocalStorage('vitalvibe_users_db', {});
  // Store simply the logged in username
  const [activeSession, setActiveSession] = useLocalStorage('vitalvibe_active_session', null);

  const userData = activeSession ? users[activeSession] : null;

  const signup = (name, password, data) => {
    if (users[name]) {
      throw new Error("User already exists!");
    }
    const newUserData = { name, password, ...data };
    setUsers(prev => ({ ...prev, [name]: newUserData }));
    setActiveSession(name);
  };

  const login = (name, password) => {
    const user = users[name];
    if (!user) throw new Error("User not found!");
    if (user.password !== password) throw new Error("Incorrect password!");
    setActiveSession(name);
  };

  const logout = () => {
    setActiveSession(null);
  };

  // Helper to update active user's data
  const updateUserData = (updater) => {
    if (!activeSession) return;
    setUsers(prev => {
      const currentUser = prev[activeSession];
      const newData = typeof updater === 'function' ? updater(currentUser) : { ...currentUser, ...updater };
      return { ...prev, [activeSession]: newData };
    });
  };

  const addExercise = (exercise) => {
    updateUserData(prev => ({
      ...prev,
      exercises: [...(prev?.exercises || []), exercise]
    }));
  };

  const removeExercise = (index) => {
    updateUserData(prev => {
      const newExercises = [...(prev?.exercises || [])];
      newExercises.splice(index, 1);
      return { ...prev, exercises: newExercises };
    });
  };

  const addFood = (food) => {
    updateUserData(prev => ({
      ...prev,
      foods: [...(prev?.foods || []), food]
    }));
  };

  const removeFood = (index) => {
    updateUserData(prev => {
      const newFoods = [...(prev?.foods || [])];
      newFoods.splice(index, 1);
      return { ...prev, foods: newFoods };
    });
  };

  const addWater = (amount = 1) => {
    updateUserData(prev => ({
      ...prev,
      waterDrank: (prev?.waterDrank || 0) + amount
    }));
  };

  const resetDaily = () => {
    updateUserData(prev => ({
      ...prev,
      waterDrank: 0,
      exercises: [],
      foods: []
    }));
  }

  return (
    <UserContext.Provider value={{ 
      userData, 
      signup, 
      login, 
      logout,
      updateUserData, 
      addExercise, 
      removeExercise, 
      addFood, 
      removeFood, 
      addWater, 
      resetDaily 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
