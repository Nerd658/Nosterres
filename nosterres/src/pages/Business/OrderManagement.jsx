import React, { useState } from 'react';
import { ordersData } from '../../donnees_fictives/businessOrderData.js';
import Button from '../../components/common/Button';
import { useNotification } from '../../context/NotificationContext';

/**
 * Composant de la page de gestion des commandes pour les utilisateurs Business.
 * Permet de visualiser et gérer les commandes reçues.
 */
const OrderManagement = () => {
  const [orders, setOrders] = useState(ordersData);
  const { showNotification } = useNotification();

  const getStatusClass = (status) => {
    switch (status) {
      case 'En attente':
        return 'bg-orange-200 text-orange-900';
      case 'Traitée':
        return 'bg-blue-200 text-blue-900';
      case 'Livrée':
        return 'bg-green-200 text-green-900';
      case 'Annulée':
        return 'bg-red-200 text-red-900';
      default:
        return 'bg-gray-200 text-gray-900';
    }
  };

  const handleViewDetails = (orderId) => {
    showNotification(`Voir les détails de la commande: ${orderId}`, 'info');
    // Logique pour afficher les détails de la commande (ex: modal, nouvelle page)
  };

  const handleUpdateStatus = (orderId, currentStatus) => {
    const newStatus = prompt(`Mettre à jour le statut de la commande ${orderId} (actuel: ${currentStatus}). Nouveau statut (En attente, Traitée, Livrée, Annulée):`);
    if (newStatus) {
      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      showNotification(`Statut de la commande ${orderId} mis à jour à: ${newStatus}`, 'success');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Gestion des commandes</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID Commande</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Client</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Montant</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.id}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.customerName}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.amount.toLocaleString()} FCFA</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${getStatusClass(order.status)}`}>
                      <span aria-hidden="true" className={`absolute inset-0 opacity-50 rounded-full ${getStatusClass(order.status)}`}></span>
                      <span className="relative">{order.status}</span>
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.date}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center space-x-3">
                      <Button
                        onClick={() => handleViewDetails(order.id)}
                        variant="secondary"
                        size="sm"
                        text={<i className="fas fa-eye"></i>}
                        ariaLabel="Voir détails"
                      />
                      <Button
                        onClick={() => handleUpdateStatus(order.id, order.status)}
                        variant="primary"
                        size="sm"
                        text={<i className="fas fa-sync-alt"></i>}
                        ariaLabel="Mettre à jour le statut"
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

export default OrderManagement;