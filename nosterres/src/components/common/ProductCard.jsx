import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useCart } from '../../context/CartContext'; // Importation du hook useCart
import { useNotification } from '../../context/NotificationContext'; // Importation du hook useNotification
import { useWishlist } from '../../context/WishlistContext'; // Importation du hook useWishlist

const getBadgeClass = (badge) => {
  if (badge === 'Nouveau') return 'bg-primary';
  if (badge.startsWith('-')) return 'bg-red-500';
  return 'bg-gray-500';
};

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = React.useState(1);
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showNotification(`Ajout de ${quantity} ${product.name} au panier.`, 'success');
  };

  const handleToggleWishlist = () => {
    if (isFavorite) {
      removeFromWishlist(product.id);
      showNotification(`${product.name} retiré des favoris.`, 'info');
    } else {
      addToWishlist(product);
      showNotification(`${product.name} ajouté aux favoris !`, 'success');
    }
  };

  return (
    <div className="product-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="relative">
        <Link to={`/produits/${product.id}`}>
          <img
            src={product.image}
            alt={`Image de ${product.name}`}
            className="w-full h-48 object-cover"
          />
        </Link>
        {product.badge && (
          <div
            className={`absolute top-2 right-2 text-white text-xs px-2 py-1 rounded-full ${getBadgeClass(product.badge)}`}
          >
            {product.badge}
          </div>
        )}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-2 left-2 p-2 rounded-full bg-white shadow-md text-gray-400 hover:text-red-500 transition-colors duration-200"
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <i className={`fas fa-heart ${isFavorite ? 'text-red-500' : ''}`}></i>
        </button>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-800"><Link to={`/produits/${product.id}`} className="hover:text-primary transition-colors duration-200">{product.name}</Link></h3>
          <div className="flex items-center flex-shrink-0 ml-2">
            <i className="fas fa-star text-yellow-400 text-sm"></i>
            <span className="text-sm ml-1 text-gray-600">{product.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-1 flex-grow">{product.description}</p>
        <div className="flex justify-between items-center mt-3">
          <div>
            <span className="font-bold text-primary text-lg">{product.price} FCFA</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-1">
                {product.originalPrice} FCFA
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              ariaLabel="Réduire la quantité"
              variant="secondary"
              size="sm"
              className="w-6 h-6 rounded-full"
              text={<i className="fas fa-minus"></i>}
            />
            <span className="text-sm font-medium w-4 text-center">{quantity}</span>
            <Button
              onClick={() => setQuantity(q => q + 1)}
              ariaLabel="Augmenter la quantité"
              variant="secondary"
              size="sm"
              className="w-6 h-6 rounded-full"
              text={<i className="fas fa-plus"></i>}
            />
          </div>
        </div>
        <Button
          onClick={handleAddToCart}
          text="Ajouter au panier"
          ariaLabel={`Ajouter ${product.name} au panier`}
          variant="primary"
          size="md"
          className="w-full mt-4"
          startIcon={<i className="fas fa-shopping-cart text-sm"></i>}
        />
      </div>
    </div>
  );
};

export default ProductCard;
