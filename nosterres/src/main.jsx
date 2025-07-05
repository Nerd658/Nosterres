import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext'; // Importation du CartProvider
import { AuthProvider } from './context/AuthContext'; // Importation du AuthProvider
import { NotificationProvider } from './context/NotificationContext'; // Importation du NotificationProvider
import { WishlistProvider } from './context/WishlistContext'; // Importation du WishlistProvider

createRoot(document.getElementById('root')).render(
  <NotificationProvider> {/* Enveloppement de l'application avec NotificationProvider */}
    <AuthProvider> {/* Enveloppement de l'application avec AuthProvider */}
      <CartProvider> {/* Enveloppement de l'application avec CartProvider */}
        <WishlistProvider> {/* Enveloppement de l'application avec WishlistProvider */}
          <App />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </NotificationProvider>,
);
