import React, { createContext, useState, useContext, useCallback } from 'react';
import ToastNotification from '../components/common/ToastNotification';

// Création du contexte de notification
export const NotificationContext = createContext();

/**
 * Fournisseur de notifications pour afficher des messages toast à l'échelle de l'application.
 * @param {object} children - Les composants enfants qui auront accès au contexte.
 */
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  /**
   * Affiche une notification toast.
   * @param {string} message - Le message à afficher.
   * @param {'success'|'error'|'info'} type - Le type de notification (détermine la couleur).
   */
  const showNotification = useCallback((message, type = 'info') => {
    setNotification({ message, type });
  }, []);

  const handleCloseNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <ToastNotification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
    </NotificationContext.Provider>
  );
};

/**
 * Hook personnalisé pour utiliser le contexte de notification.
 * @returns {object} L'objet de contexte de notification.
 */
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
