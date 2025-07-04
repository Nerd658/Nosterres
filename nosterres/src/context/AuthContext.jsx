import React, { createContext, useState, useEffect, useContext } from 'react';

// Création du contexte d'authentification
export const AuthContext = createContext(null);

/**
 * Fournisseur d'authentification pour gérer l'état de connexion de l'utilisateur.
 * @param {object} children - Les composants enfants qui auront accès au contexte.
 */
export const AuthProvider = ({ children }) => {
  // État pour savoir si l'utilisateur est connecté
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // État pour stocker le nom d'utilisateur
  const [username, setUsername] = useState(null);

  // Effet pour vérifier l'état de connexion au chargement de l'application
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
  }, []);

  /**
   * Fonction de connexion.
   * Met à jour l'état de connexion et le nom d'utilisateur.
   * @param {string} userToken - Le token d'authentification.
   * @param {string} userName - Le nom d'utilisateur.
   */
  const login = (userToken, userName) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('username', userName);
    setIsLoggedIn(true);
    setUsername(userName);
  };

  /**
   * Fonction de déconnexion.
   * Supprime le token et le nom d'utilisateur du localStorage et met à jour l'état.
   */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId'); // Supprime aussi l'ID utilisateur
    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personnalisé pour utiliser le contexte d'authentification.
 * @returns {object} L'objet de contexte d'authentification.
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
