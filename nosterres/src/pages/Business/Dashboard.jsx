import React from 'react';
import { dashboardData } from '../../donnees_fictives/businessDashboardData.js';

/**
 * Composant de la page Tableau de bord pour les utilisateurs Business.
 * Affiche un aperçu des activités et des statistiques du vendeur.
 */
const Dashboard = () => {
  const { stats, recentOrders, productPerformance } = dashboardData;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Tableau de bord Business</h1>

      {/* Section des statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Chiffre d'affaires total</p>
            <p className="text-2xl font-bold text-green-600">{stats.totalSales.toLocaleString()} FCFA</p>
          </div>
          <i className="fas fa-money-bill-wave text-4xl text-green-400"></i>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Commandes totales</p>
            <p className="text-2xl font-bold text-blue-600">{stats.totalOrders}</p>
          </div>
          <i className="fas fa-shopping-bag text-4xl text-blue-400"></i>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Produits listés</p>
            <p className="text-2xl font-bold text-purple-600">{stats.totalProducts}</p>
          </div>
          <i className="fas fa-box-open text-4xl text-purple-400"></i>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Commandes en attente</p>
            <p className="text-2xl font-bold text-red-600">{stats.pendingOrders}</p>
          </div>
          <i className="fas fa-hourglass-half text-4xl text-red-400"></i>
        </div>
      </div>

      {/* Section des commandes récentes */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Commandes récentes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID Commande</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Client</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Montant</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.id}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.customerName}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.amount.toLocaleString()} FCFA</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className={`relative inline-block px-3 py-1 font-semibold leading-tight ${order.status === 'En attente' ? 'text-orange-900' : 'text-green-900'}`}>
                      <span aria-hidden="true" className={`absolute inset-0 opacity-50 rounded-full ${order.status === 'En attente' ? 'bg-orange-200' : 'bg-green-200'}`}></span>
                      <span className="relative">{order.status}</span>
                    </span>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section des performances des produits */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Performance des produits</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Produit</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ventes</th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Unités vendues</th>
              </tr>
            </thead>
            <tbody>
              {productPerformance.map((product) => (
                <tr key={product.id}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.name}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.sales.toLocaleString()} FCFA</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.unitsSold}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;