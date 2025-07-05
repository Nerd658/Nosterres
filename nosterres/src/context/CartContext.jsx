import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

/**
 * Fusionne le panier invité avec le panier utilisateur.
 * La quantité des articles communs est additionnée.
 * @param {Array} guestCart - Le panier de la session invité.
 * @param {Array} userCart - Le panier de l'utilisateur (peut être vide).
 * @returns {Array} Le panier fusionné.
 */
const mergeCarts = (guestCart, userCart) => {
  if (!guestCart || guestCart.length === 0) {
    return userCart;
  }
  const merged = [...userCart];

  guestCart.forEach(guestItem => {
    const existingItemIndex = merged.findIndex(
      (userItem) => userItem.product.id === guestItem.product.id
    );

    if (existingItemIndex > -1) {
      merged[existingItemIndex].quantity += guestItem.quantity;
    } else {
      merged.push(guestItem);
    }
  });
  return merged;
};

export const CartProvider = ({ children }) => {
  const { userId } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const previousUserId = useRef(userId);

  // Effet N°1: Chargement initial et gestion des transitions utilisateur (connexion/déconnexion)
  useEffect(() => {
    const currentUserId = userId;
    const prevUserId = previousUserId.current;

    // Ne s'exécute que si l'ID utilisateur a réellement changé.
    if (currentUserId === prevUserId) {
      return;
    }

    // Cas N°1: Un utilisateur se connecte.
    if (currentUserId) {
      const guestCartKey = 'cartItems_guest';
      const userCartKey = `cartItems_${currentUserId}`;

      try {
        const guestCartData = localStorage.getItem(guestCartKey);
        const guestCart = guestCartData ? JSON.parse(guestCartData) : [];

        const userCartData = localStorage.getItem(userCartKey);
        const userCart = userCartData ? JSON.parse(userCartData) : [];

        const mergedCart = mergeCarts(guestCart, userCart);
        setCartItems(mergedCart);

        // Nettoyer le panier invité après la fusion.
        localStorage.removeItem(guestCartKey);

      } catch (error) {
        console.error("CartContext: Erreur lors de la transition de connexion:", error);
      }
    }
    // Cas N°2: Un utilisateur se déconnecte.
    else {
      // Le panier de l'utilisateur qui se déconnecte est déjà sauvegardé.
      // On charge simplement le panier "invité" pour la nouvelle session.
      const guestCartKey = 'cartItems_guest';
      try {
        const guestCartData = localStorage.getItem(guestCartKey);
        setCartItems(guestCartData ? JSON.parse(guestCartData) : []);
      } catch (error) {
        console.error("CartContext: Erreur lors du chargement du panier invité après déconnexion:", error);
        setCartItems([]);
      }
    }

    // Mettre à jour la référence de l'ID pour la prochaine transition.
    previousUserId.current = currentUserId;

  }, [userId]); // Se déclenche uniquement quand `userId` change.

  // Effet N°2: Sauvegarde du panier dans le localStorage à chaque modification des articles.
  useEffect(() => {
    // Ne rien faire si le composant vient de se monter et que le panier est vide,
    // pour éviter d'écraser un panier existant dans le localStorage.
    if (previousUserId.current === undefined && cartItems.length === 0) {
        return;
    }

    const cartKey = `cartItems_${userId || 'guest'}`;
    try {
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    } catch (error) {
      console.error("CartContext: Erreur lors de la sauvegarde du panier:", error);
    }
  }, [cartItems]); // Se déclenche uniquement quand `cartItems` change.

  // --- Fonctions de manipulation du panier (inchangées) ---

  const addToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
