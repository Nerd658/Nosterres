import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/common/Button';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import { useWishlist } from '../../context/WishlistContext';
import allProducts from '../../utils/products.json'; // Utilisation de tous les produits comme source de données fictives
import { productReviews as initialProductReviews } from '../../donnees_fictives/productReviewsData.js'; // Données fictives des commentaires

/**
 * Composant de la page de détail d'un produit.
 * Affiche les informations détaillées d'un produit spécifique.
 */
const ProductDetail = () => {
  const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nouvel état de chargement
  const [error, setError] = useState(null); // Nouvel état d'erreur
  const [newReview, setNewReview] = useState({
    userName: '',
    rating: 5,
    comment: '',
  });

  const isFavorite = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simule la récupération des données du produit par son ID avec un délai
        await new Promise(resolve => setTimeout(resolve, 500)); // Délai de 0.5 seconde
        const foundProduct = allProducts.find(p => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
          setReviews(initialProductReviews.filter(review => review.productId === id));
        } else {
          throw new Error(`Produit avec l'ID ${id} non trouvé.`);
        }
      } catch (err) {
        setError(err.message);
        showNotification(err.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [id, showNotification]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      showNotification(`${quantity} ${product.name} ajouté(s) au panier !`, 'success');
    }
  };

  const handleToggleWishlist = () => {
    if (product) {
      if (isFavorite) {
        removeFromWishlist(product.id);
        showNotification(`${product.name} retiré des favoris.`, 'info');
      } else {
        addToWishlist(product);
        showNotification(`${product.name} ajouté aux favoris !`, 'success');
      }
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({
      ...prev, [name]: value
    }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.userName || !newReview.comment) {
      showNotification('Veuillez remplir tous les champs du commentaire.', 'error');
      return;
    }
    const submittedReview = {
      productId: id,
      id: `REV${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      ...newReview,
    };
    setReviews(prev => [...prev, submittedReview]);
    showNotification('Votre commentaire a été ajouté avec succès ! (simulé)', 'success');
    setNewReview({ userName: '', rating: 5, comment: '' }); // Réinitialiser le formulaire
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Chargement du produit...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-red-500">Erreur: {error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-700">Produit non trouvé.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex mb-8">
        {/* Image du produit */}
        <div className="md:w-1/2 p-4 flex items-center justify-center relative">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full h-auto rounded-lg shadow-md"
          />
          <button
            onClick={handleToggleWishlist}
            className="absolute top-6 left-6 p-3 rounded-full bg-white shadow-md text-gray-400 hover:text-red-500 transition-colors duration-200"
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <i className={`fas fa-heart text-2xl ${isFavorite ? 'text-red-500' : ''}`}></i>
          </button>
        </div>

        {/* Détails du produit */}
        <div className="md:w-1/2 p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-4">{product.description}</p>

          <div className="flex items-baseline mb-6">
            <span className="text-primary text-3xl font-bold mr-2">{product.price.toLocaleString()} FCFA</span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-xl">{product.originalPrice.toLocaleString()} FCFA</span>
            )}
          </div>

          {/* Quantité et ajout au panier */}
          <div className="flex items-center space-x-4 mb-6">
            <label htmlFor="quantity" className="text-lg font-medium text-gray-700">Quantité :</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <Button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                ariaLabel="Réduire la quantité"
                variant="secondary"
                size="sm"
                className="w-8 h-8 rounded-none rounded-l-md"
                text={<i className="fas fa-minus"></i>}
              />
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-l border-r border-gray-300 py-1 focus:outline-none"
                min="1"
              />
              <Button
                onClick={() => setQuantity(prev => prev + 1)}
                ariaLabel="Augmenter la quantité"
                variant="secondary"
                size="sm"
                className="w-8 h-8 rounded-none rounded-r-md"
                text={<i className="fas fa-plus"></i>}
              />
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            text="Ajouter au panier"
            variant="primary"
            size="lg"
            className="w-full py-3"
            startIcon={<i className="fas fa-shopping-cart mr-2"></i>}
          />

          {/* Informations supplémentaires (ex: stock, catégorie) */}
          <div className="mt-6 text-gray-700">
            <p className="mb-2"><span className="font-semibold">Catégorie :</span> {product.category}</p>
            <p><span className="font-semibold">Disponibilité :</span> {product.stock > 0 ? `En stock (${product.stock} unités)` : 'Hors stock'}</p>
          </div>
        </div>
      </div>

      {/* Section des commentaires et évaluations */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Avis des clients</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-600 mb-6">Soyez le premier à laisser un commentaire pour ce produit !</p>
        ) : (
          <div className="mb-8">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-4 mb-4 last:border-b-0 last:mb-0">
                <div className="flex items-center mb-2">
                  <p className="font-semibold text-gray-800 mr-2">{review.userName}</p>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fas fa-star ${i < review.rating ? '' : 'text-gray-300'}`}></i>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-auto">{review.date}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        )}

        {/* Formulaire de soumission de commentaire */}
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Laisser un commentaire</h3>
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Votre Nom</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={newReview.userName}
              onChange={handleReviewChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Votre Note</label>
            <select
              id="rating"
              name="rating"
              value={newReview.rating}
              onChange={handleReviewChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md shadow-sm"
            >
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>{num} Étoile(s)</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Votre Commentaire</label>
            <textarea
              id="comment"
              name="comment"
              rows="4"
              value={newReview.comment}
              onChange={handleReviewChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
              required
            ></textarea>
          </div>
          <Button
            type="submit"
            text="Soumettre le commentaire"
            variant="primary"
            size="md"
            startIcon={<i className="fas fa-comment-alt mr-2"></i>}
          />
        </form>
      </div>
    </div>
  );
};

export default ProductDetail;