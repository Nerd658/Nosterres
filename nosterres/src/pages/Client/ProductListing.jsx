import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/common/ProductCard';
import allProducts from '../../utils/products.json'; // Utilisation de tous les produits
import { useNotification } from '../../context/NotificationContext';

/**
 * Composant de la page de liste des produits.
 * Affiche tous les produits disponibles pour les clients avec des options de filtrage et de tri.
 */
const ProductListing = () => {
  const { showNotification } = useNotification();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Catégories fictives pour le filtrage
  const categories = [
    { label: 'Toutes les catégories', value: 'all' },
    { label: 'Alimentation', value: 'Alimentation' },
    { label: 'Produits de beauté', value: 'Produits de beauté' },
    { label: 'Artisanat', value: 'Artisanat' },
    { label: 'Boissons', value: 'Boissons' },
  ];

  // Simule le chargement des produits
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simule un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 500));
        // Simule une erreur de chargement 10% du temps
        if (Math.random() < 0.1) {
          throw new Error('Erreur lors du chargement des produits.');
        }
        setProducts(allProducts);
      } catch (err) {
        setError(err.message);
        showNotification(err.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [showNotification]);

  useEffect(() => {
    let productsToFilter = [...products];

    // Filtrage par catégorie
    if (selectedCategory !== 'all') {
      productsToFilter = productsToFilter.filter(product => product.category === selectedCategory);
    }

    // Tri des produits
    if (sortBy === 'price-asc') {
      productsToFilter.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      productsToFilter.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      productsToFilter.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      productsToFilter.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredProducts(productsToFilter);
  }, [products, selectedCategory, sortBy]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-6 bg-gray-100 min-h-screen text-center">
        <p className="text-xl text-gray-700">Chargement des produits...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 bg-gray-100 min-h-screen text-center">
        <p className="text-xl text-red-500">Erreur: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Tous nos produits</h1>

      {/* Options de filtrage et de tri */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        {/* Filtrer par catégorie */}
        <div className="w-full md:w-1/2 lg:w-1/4">
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-1">Filtrer par catégorie :</label>
          <select
            id="category-filter"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md shadow-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Trier par */}
        <div className="w-full md:w-1/2 lg:w-1/4">
          <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-1">Trier par :</label>
          <select
            id="sort-by"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md shadow-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Par défaut</option>
            <option value="price-asc">Prix : du moins cher au plus cher</option>
            <option value="price-desc">Prix : du plus cher au moins cher</option>
            <option value="name-asc">Nom : A-Z</option>
            <option value="name-desc">Nom : Z-A</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-600 py-20">
          <i className="fas fa-box-open text-8xl text-gray-300 mb-6"></i>
          <p className="text-2xl font-semibold mb-4">Aucun produit ne correspond à vos critères.</p>
          <p className="text-lg">Essayez d'ajuster vos filtres ou votre tri.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id || index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductListing;