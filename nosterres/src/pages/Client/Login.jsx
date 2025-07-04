import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Composant de la page de connexion.
 * Permet aux utilisateurs de se connecter avec leur email et mot de passe.
 */
const Login = () => {
  // États pour stocker les valeurs des champs email et mot de passe
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // État pour gérer les messages d'erreur ou de succès
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook pour la navigation
  const { login } = useAuth(); // Utilisation du hook useAuth pour accéder à la fonction login

  /**
   * Gère la soumission du formulaire de connexion.
   * @param {Event} e - L'événement de soumission du formulaire.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Connexion réussie ! Bienvenue.');
        // Utiliser la fonction login du contexte pour stocker le token et le nom d'utilisateur
        if (data.token && data.username) {
          login(data.token, data.username);
        }
        // Stocker l'ID utilisateur séparément si nécessaire pour d'autres logiques (ex: panier)
        if (data.userId) {
          localStorage.setItem('userId', data.userId);
        }
        // Rediriger l'utilisateur après un délai pour qu'il voie le message
        setTimeout(() => {
          navigate('/'); // Redirige vers la page d'accueil
        }, 1500);
      } else {
        setMessage(data.message || 'Email ou mot de passe incorrect.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setMessage('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg w-full max-w-md">
        <h3 className="text-2xl font-bold text-center text-green-600">Connexion</h3>
        <form onSubmit={handleSubmit} className="mt-4">
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
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
            >
              Se connecter
            </button>
            <a href="#" className="inline-block align-baseline font-bold text-sm text-green-600 hover:text-green-800">
              Mot de passe oublié ?
            </a>
          </div>
          {message && (
            <p className={`mt-4 text-center text-sm ${message.includes('réussie') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;