import React, { useEffect, useState } from 'react';

/**
 * Composant de notification Toast.
 * Affiche un message temporaire à l'écran.
 * @param {object} props - Les propriétés du composant.
 * @param {string} props.message - Le message à afficher.
 * @param {'success'|'error'|'info'} props.type - Le type de notification (détermine la couleur).
 * @param {function} props.onClose - Fonction appelée lorsque la notification est fermée.
 */
const ToastNotification = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000); // La notification disparaît après 3 secondes

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColorClass = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  }[type] || 'bg-gray-500';

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white flex items-center space-x-3 transform transition-transform duration-300 ease-out ${bgColorClass}`}
      role="alert"
    >
      {type === 'success' && <i className="fas fa-check-circle text-xl"></i>}
      {type === 'error' && <i className="fas fa-times-circle text-xl"></i>}
      {type === 'info' && <i className="fas fa-info-circle text-xl"></i>}
      <p className="font-medium">{message}</p>
      <button onClick={() => {
        setIsVisible(false);
        onClose();
      }} className="ml-auto text-white opacity-75 hover:opacity-100 focus:outline-none">
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default ToastNotification;
