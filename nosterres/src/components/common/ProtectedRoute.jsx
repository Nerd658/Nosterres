import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Composant de protection de route.
 * Redirige l'utilisateur vers la page de connexion s'il n'est pas authentifié.
 * @param {object} children - Les composants enfants à protéger.
 */
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
