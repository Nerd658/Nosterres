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
  // État pour stocker l'ID de l'utilisateur
  const [userId, setUserId] = useState(null);

  // Effet pour vérifier l'état de connexion au chargement de l'application
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId'); // Récupérer l'ID utilisateur
    if (token && storedUsername && storedUserId) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
      setUserId(storedUserId); // Mettre à jour l'état userId
    }
  }, []);

  /**
   * Fonction de connexion.
   * Met à jour l'état de connexion, le nom d'utilisateur et l'ID utilisateur.
   * @param {string} userToken - Le token d'authentification.
   * @param {string} userName - Le nom d'utilisateur.
   * @param {string} id - L'ID de l'utilisateur.
   */
  const login = (userToken, userName, id) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('username', userName);
    localStorage.setItem('userId', id); // Stocker l'ID utilisateur
    setIsLoggedIn(true);
    setUsername(userName);
    setUserId(id); // Mettre à jour l'état userId
  };

  /**
   * Fonction de déconnexion.
   * Supprime le token, le nom d'utilisateur et l'ID utilisateur du localStorage et met à jour l'état.
   */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUsername(null);
    setUserId(null); // Réinitialiser l'état userId
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, userId, login, logout }}>
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
