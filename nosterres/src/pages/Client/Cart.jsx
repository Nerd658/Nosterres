import React from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';

/**
 * Composant de la page Panier.
 * Affiche les articles ajoutés au panier, permet de modifier les quantités, de supprimer des articles
 * et de passer à la caisse.
 */
const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Calcul du sous-total pour un article donné
  const getItemSubtotal = (item) => {
    return item.product.price * item.quantity;
  };

  // Calcul du total général du panier
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + getItemSubtotal(item), 0);
  };

  // Gère l'incrémentation de la quantité
  const handleIncrement = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  // Gère la décrémentation de la quantité
  const handleDecrement = (productId, currentQuantity) => {
    if (currentQuantity > 1) { // Empêche la quantité de descendre en dessous de 1
      updateQuantity(productId, currentQuantity - 1);
    } else { // Si la quantité est 1 et qu'on décrémente, on supprime l'article
      removeFromCart(productId);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)]"> {/* Ajout d'une hauteur minimale */}
      <h1 className="text-4xl font-extrabold text-primary mb-10 text-center">Votre Panier</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 py-20">
          <i className="fas fa-shopping-cart text-8xl text-gray-300 mb-6"></i> {/* Icône de panier vide */}
          <p className="text-2xl font-semibold mb-4">Votre panier est désespérément vide.</p>
          <p className="text-lg mb-8">Il est temps de remplir ce panier avec de délicieux produits locaux !</p>
          <Link to="/">
            <Button
              text="Découvrir nos produits"
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg transform hover:scale-105"
            />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Liste des articles du panier */}
          <div className="lg:w-2/3 bg-white shadow-xl rounded-xl p-8">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex flex-col sm:flex-row items-center border-b border-gray-200 py-6 last:border-b-0 hover:bg-gray-50 transition duration-200 rounded-md px-2">
                <img
                  src={item.product.image || 'https://via.placeholder.com/120'} // Placeholder si pas d'image
                  alt={item.product.name}
                  className="w-28 h-28 object-cover rounded-lg mr-6 mb-4 sm:mb-0 shadow-md"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">{item.product.name}</h2>
                  <p className="text-primary font-bold text-2xl">{item.product.price.toLocaleString()} FCFA</p>
                </div>
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                  <button
                    onClick={() => handleDecrement(item.product.id, item.quantity)}
                    className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold transition duration-200"
                    aria-label="Diminuer la quantité"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-lg font-semibold text-gray-800">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item.product.id, item.quantity)}
                    className="bg-primary text-white hover:bg-primary-dark rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold transition duration-200"
                    aria-label="Augmenter la quantité"
                  >
                    +
                  </button>
                </div>
                <p className="text-xl font-bold text-gray-700 w-32 text-right ml-6 hidden sm:block">
                  {(item.product.price * item.quantity).toLocaleString()} FCFA
                </p>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-500 hover:text-red-700 transition duration-300 ml-6"
                  aria-label="Supprimer l'article"
                >
                  <i className="fas fa-trash-alt text-2xl"></i>
                </button>
              </div>
            ))}
          </div>

          {/* Résumé du panier */}
          <div className="lg:w-1/3 bg-white shadow-xl rounded-xl p-8 h-fit">
            <h2 className="text-3xl font-bold text-primary mb-6 border-b pb-4">Résumé de la commande</h2>
            <div className="flex justify-between items-center text-lg font-medium text-gray-700 mb-4">
              <span>Sous-total:</span>
              <span>{getCartTotal().toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between items-center text-lg font-medium text-gray-700 mb-6">
              <span>Frais de livraison:</span>
              <span className="text-green-600 font-semibold">Gratuit</span>
            </div>
            <div className="flex justify-between items-center text-3xl font-extrabold text-primary border-t pt-4 mt-4">
              <span>Total:</span>
              <span>{getCartTotal().toLocaleString()} FCFA</span>
            </div>
            <Link to="/checkout" className="block mt-8">
              <Button
                text="Passer à la caisse"
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-4 rounded-full transition duration-300 text-lg shadow-lg transform hover:scale-105"
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
