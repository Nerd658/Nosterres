import React from 'react';

/**
 * Composant de la page "Qui sommes-nous ?".
 * Présente l'entreprise, sa mission et ses valeurs.
 */
const About = () => {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-extrabold text-primary mb-8 text-center">Qui sommes-nous ?</h1>

      <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Notre Histoire</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Noterres est née d'une passion profonde pour les produits locaux et le désir de connecter les consommateurs avec les artisans et producteurs de nos régions. Fondée en 2023, notre plateforme a pour mission de valoriser le savoir-faire traditionnel et de promouvoir une consommation plus juste et durable.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Nous croyons en la richesse de notre terroir et nous nous engageons à vous offrir des produits authentiques, frais et de qualité, directement de la ferme à votre table, de l'atelier à votre foyer.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Nos Valeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <i className="fas fa-leaf text-5xl text-primary mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Authenticité</h3>
            <p className="text-gray-600">Nous sélectionnons des produits qui racontent une histoire, issus de méthodes traditionnelles et respectueuses.</p>
          </div>
          <div className="text-center p-4">
            <i className="fas fa-handshake text-5xl text-primary mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Soutien Local</h3>
            <p className="text-gray-600">Nous mettons en avant les producteurs et artisans locaux, contribuant ainsi à l'économie de nos régions.</p>
          </div>
          <div className="text-center p-4">
            <i className="fas fa-heart text-5xl text-primary mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Qualité & Fraîcheur</h3>
            <p className="text-gray-600">Nous garantissons des produits d'une qualité irréprochable, pour une expérience gustative et sensorielle unique.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
