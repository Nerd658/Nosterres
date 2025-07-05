import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';

/**
 * Composant de la page d'inscription.
 * Permet aux nouveaux utilisateurs de créer un compte.
 */
const Register = () => {
  // États pour stocker les valeurs des champs du formulaire
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook pour la navigation
  const { showNotification } = useNotification(); // Utilisation du hook useNotification

  /**
   * Gère la soumission du formulaire d'inscription.
   * @param {Event} e - L'événement de soumission du formulaire.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification(data.message || 'Inscription réussie ! Vous pouvez maintenant vous connecter.', 'success');
        // Rediriger l'utilisateur vers la page de connexion après un délai
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        showNotification(data.message || "Erreur lors de l'inscription. Veuillez réessayer.", 'error');
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      showNotification('Une erreur est survenue. Veuillez réessayer plus tard.', 'error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center text-green-600">Inscription</h3>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Nom
            </label>
            <input
              type="text"
              id="name"
              placeholder="Votre nom"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Votre email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              placeholder="Votre mot de passe"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            >
              S'inscrire
            </button>
          </div>
          {/* Le message est maintenant géré par les notifications Toast */}
        </form>
      </div>
    </div>
  );
};

export default Register;
