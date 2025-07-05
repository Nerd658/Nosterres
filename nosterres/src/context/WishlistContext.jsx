import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

// Création du contexte de la liste de souhaits
export const WishlistContext = createContext();

/**
 * Fournisseur de la liste de souhaits pour gérer les produits favoris de l'utilisateur.
 * Les favoris sont stockés dans le localStorage et sont spécifiques à chaque utilisateur.
 */
export const WishlistProvider = ({ children }) => {
  const { userId } = useAuth();

  // Fonction utilitaire pour obtenir la clé de stockage de la liste de souhaits
  const getWishlistStorageKey = useCallback(() => {
    return `wishlistItems_${userId || 'guest'}`;
  }, [userId]);

  // État local pour stocker les articles de la liste de souhaits
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      // Charger la liste de souhaits au démarrage, en fonction de l'ID utilisateur initial
      const initialUserId = localStorage.getItem('userId');
      const key = `wishlistItems_${initialUserId || 'guest'}`;
      const localData = localStorage.getItem(key);
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("WishlistContext: Erreur lors du chargement initial de la liste de souhaits:", error);
      return [];
    }
  });

  // Effet pour sauvegarder la liste de souhaits dans le localStorage à chaque modification
  useEffect(() => {
    try {
      const key = getWishlistStorageKey();
      localStorage.setItem(key, JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("WishlistContext: Erreur lors de la sauvegarde de la liste de souhaits:", error);
    }
  }, [wishlistItems, getWishlistStorageKey]);

  // Effet pour charger la liste de souhaits lorsque l'ID utilisateur change (connexion/déconnexion)
  useEffect(() => {
    const key = getWishlistStorageKey();
    try {
      const localData = localStorage.getItem(key);
      setWishlistItems(localData ? JSON.parse(localData) : []);
    } catch (error) {
      console.error("WishlistContext: Erreur lors du rechargement de la liste de souhaits pour le nouvel utilisateur:", error);
      setWishlistItems([]);
    }
  }, [userId, getWishlistStorageKey]);

  /**
   * Ajoute un produit à la liste de souhaits.
   * @param {object} product - Le produit à ajouter.
   */
  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      if (!prevItems.some(item => item.id === product.id)) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  /**
   * Supprime un produit de la liste de souhaits.
   * @param {string} productId - L'ID du produit à supprimer.
   */
  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  /**
   * Vérifie si un produit est dans la liste de souhaits.
   * @param {string} productId - L'ID du produit à vérifier.
   * @returns {boolean} True si le produit est dans la liste, false sinon.
   */
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const contextValue = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    getTotalWishlistItems: () => wishlistItems.length,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

/**
 * Hook personnalisé pour utiliser le contexte de la liste de souhaits.
 * @returns {object} L'objet de contexte de la liste de souhaits.
 */
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
