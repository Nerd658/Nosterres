import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';

/**
 * Données fictives pour le tableau de bord utilisateur.
 */
const dashboardOverviewData = {
  totalOrders: 5,
  totalWishlistItems: 10,
  lastLogin: '2025-07-05',
};

/**
 * Composant de la page Tableau de bord utilisateur.
 * Sert de hub central pour la gestion du compte client.
 */
const UserDashboard = () => {
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [overviewData, setOverviewData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simule un délai de chargement
        await new Promise(resolve => setTimeout(resolve, 500));
        // Simule une erreur de chargement 10% du temps
        if (Math.random() < 0.1) {
          throw new Error('Erreur lors du chargement des données du tableau de bord.');
        }
        setOverviewData(dashboardOverviewData);
      } catch (err) {
        setError(err.message);
        showNotification(err.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, [showNotification]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-100 text-center">
        <p className="text-xl text-gray-700">Chargement du tableau de bord...</p>
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
      <h1 className="text-4xl font-extrabold text-primary mb-8 text-center">Mon Compte</h1>

      {overviewData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Commandes passées</p>
              <p className="text-2xl font-bold text-blue-600">{overviewData.totalOrders}</p>
            </div>
            <i className="fas fa-shopping-bag text-4xl text-blue-400"></i>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Articles en favoris</p>
              <p className="text-2xl font-bold text-red-600">{overviewData.totalWishlistItems}</p>
            </div>
            <i className="fas fa-heart text-4xl text-red-400"></i>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between md:col-span-2">
            <div>
              <p className="text-sm font-medium text-gray-500">Dernière connexion</p>
              <p className="text-2xl font-bold text-gray-800">{overviewData.lastLogin}</p>
            </div>
            <i className="fas fa-sign-in-alt text-4xl text-gray-400"></i>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Carte pour le profil */}
        <Link to="/mon-profil" className="block bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
          <i className="fas fa-user-circle text-6xl text-primary mb-4"></i>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Mon Profil</h2>
          <p className="text-gray-600">Gérez vos informations personnelles et vos adresses.</p>
        </Link>

        {/* Carte pour l'historique des commandes */}
        <Link to="/historique-commandes" className="block bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
          <i className="fas fa-history text-6xl text-primary mb-4"></i>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Historique des Commandes</h2>
          <p className="text-gray-600">Consultez vos commandes passées et leur statut.</p>
        </Link>

        {/* Carte pour la liste de souhaits */}
        <Link to="/wishlist" className="block bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
          <i className="fas fa-heart text-6xl text-primary mb-4"></i>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Ma Liste de Souhaits</h2>
          <p className="text-gray-600">Retrouvez les produits que vous avez aimés.</p>
        </Link>

        {/* Ajoutez d'autres cartes ici si nécessaire (ex: Mes Avis, Mes Paiements) */}
      </div>
    </div>
  );
};
export default UserDashboard;
