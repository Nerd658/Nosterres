import React, { useState } from 'react';
import { productsData } from '../../donnees_fictives/businessProductData.js';
import Button from '../../components/common/Button';
import { useNotification } from '../../context/NotificationContext';

/**
 * Composant de la page de gestion des produits pour les utilisateurs Business.
 * Permet de lister, ajouter, modifier et supprimer des produits.
 */
const ProductManagement = () => {
  const [products, setProducts] = useState(productsData);
  const { showNotification } = useNotification();

  const handleEdit = (productId) => {
    showNotification(`Modifier le produit avec l'ID: ${productId}`, 'info');
    // Logique de navigation ou d'ouverture de modal pour l'édition
  };

  const handleDelete = (productId) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le produit avec l'ID: ${productId} ?`)) {
      setProducts(products.filter(product => product.id !== productId));
      showNotification(`Produit ${productId} supprimé.`, 'success');
    }
  };

  const handleAddProduct = () => {
    showNotification('Ajouter un nouveau produit', 'info');
    // Logique de navigation ou d'ouverture de modal pour l'ajout
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Gestion des produits</h1>

      <div className="flex justify-end mb-6">
        <Button
          onClick={handleAddProduct}
          text="Ajouter un nouveau produit"
          variant="primary"
          size="md"
          startIcon={<i className="fas fa-plus-circle mr-2"></i>}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Image</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nom du produit</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Catégorie</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Prix</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.category}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.price.toLocaleString()} FCFA</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.stock}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${product.status === 'Actif' ? 'text-green-900' : 'text-red-900'}`}>
                      <span aria-hidden="true" className={`absolute inset-0 opacity-50 rounded-full ${product.status === 'Actif' ? 'bg-green-200' : 'bg-red-200'}`}></span>
                      <span className="relative">{product.status}</span>
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center space-x-3">
                      <Button
                        onClick={() => handleEdit(product.id)}
                        variant="secondary"
                        size="sm"
                        text={<i className="fas fa-edit"></i>}
                        ariaLabel="Modifier"
                      />
                      <Button
                        onClick={() => handleDelete(product.id)}
                        variant="danger"
                        size="sm"
                        text={<i className="fas fa-trash-alt"></i>}
                        ariaLabel="Supprimer"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;