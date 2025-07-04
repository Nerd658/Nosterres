import React, { createContext, useState, useContext, useEffect } from 'react';

// Création du contexte du panier
export const CartContext = createContext();

// Fournisseur du contexte du panier
export const CartProvider = ({ children }) => {
  // État local pour stocker les articles du panier
  // Initialise l'état avec les données du localStorage ou un tableau vide
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Erreur lors du chargement du panier depuis le localStorage:", error);
      return [];
    }
  });

  // Utilise useEffect pour sauvegarder les cartItems dans le localStorage à chaque modification
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du panier dans le localStorage:", error);
    }
  }, [cartItems]);

  // Fonction pour ajouter un produit au panier
  const addToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      // Vérifie si le produit est déjà dans le panier
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex > -1) {
        // Si le produit existe, met à jour la quantité
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        // Sinon, ajoute le nouveau produit au panier
        return [...prevItems, { product, quantity }];
      }
    });
  };

  // Fonction pour supprimer un produit du panier
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId)
    );
  };

  // Fonction pour mettre à jour la quantité d'un produit dans le panier
  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ).filter(item => item.quantity > 0) // Supprime l'article si la quantité tombe à 0
    );
  };

  // Calcule le nombre total d'articles dans le panier (pour l'affichage dans l'en-tête)
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Valeur du contexte qui sera fournie aux composants enfants
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

// Hook personnalisé pour utiliser le panier plus facilement
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
