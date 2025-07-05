import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import { useNotification } from '../../context/NotificationContext';

/**
 * Données fictives pour l'historique des commandes.
 */
const orderHistoryData = [
  {
    id: 'ORD2025001',
    date: '2025-06-15',
    total: 25000,
    status: 'Livrée',
    products: [
      { name: "Huile d'Argan Bio", quantity: 1, price: 15000 },
      { name: "Miel de Thym", quantity: 1, price: 10000 },
    ],
  },
  {
    id: 'ORD2025002',
    date: '2025-05-20',
    total: 12000,
    status: 'Livrée',
    products: [
      { name: "Savon Noir", quantity: 2, price: 6000 },
    ],
  },
  {
    id: 'ORD2025003',
    date: '2025-04-01',
    total: 30000,
    status: 'Annulée',
    products: [
      { name: "Tapis Berbère", quantity: 1, price: 30000 },
    ],
  },
];

/**
 * Composant de la page Historique des commandes.
 * Affiche la liste des commandes passées par l'utilisateur.
 */
const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simule un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 500));
        // Simule une erreur de chargement 10% du temps
        if (Math.random() < 0.1) {
          throw new Error('Erreur lors du chargement de l\'historique des commandes.');
        }
        setOrders(orderHistoryData);
      } catch (err) {
        setError(err.message);
        showNotification(err.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrderHistory();
  }, [showNotification]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Livrée':
        return 'text-green-900 bg-green-200';
      case 'Annulée':
        return 'text-red-900 bg-red-200';
      default:
        return 'text-orange-900 bg-orange-200';
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-100 text-center">
        <p className="text-xl text-gray-700">Chargement de l'historique des commandes...</p>
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
      <h1 className="text-4xl font-extrabold text-primary mb-8 text-center">Mon Historique de Commandes</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-600 py-20">
          <i className="fas fa-box-open text-8xl text-gray-300 mb-6"></i>
          <p className="text-2xl font-semibold mb-4">Vous n'avez pas encore passé de commande.</p>
          <p className="text-lg mb-8">Commencez à explorer nos produits dès maintenant !</p>
          <Link to="/produits">
            <Button
              text="Découvrir nos produits"
              className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg transform hover:scale-105"
            />
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID Commande</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Détails</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.id}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.date}</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.total.toLocaleString()} FCFA</td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${getStatusClass(order.status)}`}>
                        <span aria-hidden="true" className="absolute inset-0 opacity-50 rounded-full"></span>
                        <span className="relative">{order.status}</span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <ul className="list-disc list-inside">
                        {order.products.map((product, prodIndex) => (
                          <li key={prodIndex}>{product.name} (x{product.quantity})</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
