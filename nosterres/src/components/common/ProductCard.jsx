import React from 'react';
import Button from './Button';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="relative">
            <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
            />
            {product.badge && (
            <div
                className={`absolute top-2 right-2 text-white text-xs px-2 py-1 rounded-full ${
                product.badge === 'Nouveau' ? 'bg-primary' : 'bg-red-500'
                }`}
            >
                {product.badge}
            </div>
            )}
        </div>
        <div className="p-4">
            <div className="flex justify-between items-start">
            <h3 className="font-medium">{product.name}</h3>
            <div className="flex items-center">
                <i className="fas fa-star text-yellow-400 text-sm"></i>
                <span className="text-sm ml-1">{product.rating}</span>
            </div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{product.description}</p>
            <div className="flex justify-between items-center mt-3">
            <div>
                <span className="font-bold text-primary">{product.price} FCFA</span>
                {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through ml-1">
                    {product.originalPrice} FCFA
                </span>
                )}
            </div>
            <div className="flex items-center space-x-2">
                <Button
                text={<i className="fas fa-minus text-xs"></i>}
                className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center hover:bg-green-200"
                ariaLabel="Réduire la quantité"
                />
                <span className="text-sm">1</span>
                <Button
                text={<i className="fas fa-plus text-xs"></i>}
                className="w-6 h-6 bg-primary-light text-primary rounded-full flex items-center justify-center hover:bg-green-200"
                ariaLabel="Augmenter la quantité"
                />
                <Button
                text="Ajouter"
                className="px-3 py-1 bg-primary text-white text-xs rounded-full hover:bg-primary-dark"
                ariaLabel={`Ajouter ${product.name} au panier`}
                />
            </div>
            </div>
            <a href="#" className="block text-center text-primary text-sm mt-2 hover:underline">
            Voir plus
            </a>
        </div>
        </div>
    );
};

export default ProductCard;