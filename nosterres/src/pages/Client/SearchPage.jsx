import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import allProducts from '../../utils/products.json'; // Source de données pour les produits
import { useNotification } from '../../context/NotificationContext';

/**
 * Composant de la page de résultats de recherche.
 * Affiche les produits correspondant au terme de recherche.
 */
const SearchPage = () => {
  const location = useLocation();
  const { showNotification } = useNotification();
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      setError(null);
      const queryParams = new URLSearchParams(location.search);
      const query = queryParams.get('query') || '';
      setSearchTerm(query);

      try {
        // Simule un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 500));
        // Simule une erreur de chargement 10% du temps
        if (Math.random() < 0.1) {
          throw new Error('Erreur lors du chargement des résultats de recherche.');
        }

        if (query) {
          const filteredProducts = allProducts.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
          );
          setSearchResults(filteredProducts);
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        setError(err.message);
        showNotification(err.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [location.search, showNotification]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-100 text-center">
        <p className="text-xl text-gray-700">Chargement des résultats de recherche...</p>
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
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Résultats de recherche pour "{searchTerm}"
      </h1>

      {searchResults.length === 0 ? (
        <div className="text-center text-gray-600 py-20">
          <i className="fas fa-box-open text-8xl text-gray-300 mb-6"></i>
          <p className="text-2xl font-semibold mb-4">Aucun produit trouvé pour votre recherche.</p>
          <p className="text-lg">Essayez un autre terme ou explorez nos catégories.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((product, index) => (
            <ProductCard key={product.id || index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
