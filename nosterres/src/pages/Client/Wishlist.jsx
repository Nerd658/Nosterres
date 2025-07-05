import React, { useState, useEffect } from 'react';
import { useWishlist } from '../../context/WishlistContext';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import ProductCard from '../../components/common/ProductCard';
import { useNotification } from '../../context/NotificationContext';

/**
 * Composant de la page Liste de souhaits (Wishlist).
 * Affiche les produits que l'utilisateur a ajoutés à ses favoris.
 */
const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simule un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 500));
        // Simule une erreur de chargement 10% du temps
        if (Math.random() < 0.1) {
          throw new Error('Erreur lors du chargement de la liste de souhaits.');
        }
        // Les wishlistItems sont déjà gérés par le contexte, donc pas besoin de les set ici
      } catch (err) {
        setError(err.message);
        showNotification(err.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchWishlist();
  }, [showNotification]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-100 text-center">
        <p className="text-xl text-gray-700">Chargement de la liste de souhaits...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-100 text-center">
        <p className="text-xl text-red-500">Erreur: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-extrabold text-primary mb-10 text-center">Ma Liste de Souhaits</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center text-gray-600 py-20">
          <i className="far fa-heart text-8xl text-gray-300 mb-6"></i>
          <p className="text-2xl font-semibold mb-4">Votre liste de souhaits est vide.</p>
          <p className="text-lg mb-8">Ajoutez des produits que vous aimez pour les retrouver facilement ici !</p>
          <Link to="/produits">
            <Button
              text="Découvrir nos produits"
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg transform hover:scale-105"
            />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
