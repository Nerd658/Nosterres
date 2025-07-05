import React from 'react';

/**
 * Composant de la page Tableau de bord pour les livreurs.
 * Affiche un aperçu des livraisons en cours et des statistiques.
 */
const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Tableau de bord Livreur</h1>
      <p className="mt-2 text-gray-600">Bienvenue sur votre tableau de bord. Gérez vos livraisons ici.</p>
      {/* Contenu spécifique au tableau de bord livreur */}
    </div>
  );
};

export default Dashboard;
