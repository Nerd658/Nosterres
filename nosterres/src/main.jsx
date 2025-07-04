import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext'; // Importation du CartProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider> {/* Enveloppement de l'application avec CartProvider */}
      <App />
    </CartProvider>
  </StrictMode>,
);
