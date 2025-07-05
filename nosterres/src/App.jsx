import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Client/Home';
import Login from './pages/Authentication/Login';
import Register from './pages/Authentication/Register';
import Cart from './pages/Client/Cart'; // Importation de la page Panier
import Checkout from './pages/Client/Checkout'; // Importation de la page Checkout
import ProductDetail from './pages/Client/ProductDetail'; // Importation de la page de détail produit
import ProductListing from './pages/Client/ProductListing'; // Importation de la page de liste des produits
import About from './pages/Client/About'; // Importation de la page Qui sommes-nous ?
import Contact from './pages/Client/Contact'; // Importation de la page Contact
import FAQ from './pages/Client/FAQ'; // Importation de la page FAQ
import OrderHistory from './pages/Client/OrderHistory'; // Importation de la page Historique des commandes
import UserProfile from './pages/Client/UserProfile'; // Importation de la page Profil utilisateur
import SearchPage from './pages/Client/SearchPage'; // Importation de la page de recherche
import Wishlist from './pages/Client/Wishlist'; // Importation de la page Liste de souhaits
import UserDashboard from './pages/Client/UserDashboard'; // Importation de la page Tableau de bord utilisateur
import ProtectedRoute from './components/common/ProtectedRoute'; // Importation du composant ProtectedRoute
import BusinessDashboard from './pages/Business/Dashboard';
import BusinessProductManagement from './pages/Business/ProductManagement';
import BusinessOrderManagement from './pages/Business/OrderManagement';
import BusinessProfileSettings from './pages/Business/ProfileSettings';
import LivreurDashboard from './pages/Livreur/Dashboard';
import LivreurDeliveryManagement from './pages/Livreur/DeliveryManagement';
import Header from './components/layout/Header'; // Importation du Header
import Footer from './components/layout/Footer'; // Importation du Footer
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header /> {/* Le Header sera affiché sur toutes les pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} /> {/* Route pour la page Panier */}
          <Route path="/produits/:id" element={<ProductDetail />} /> {/* Route pour la page de détail produit */}
          <Route path="/produits" element={<ProductListing />} /> {/* Route pour la page de liste des produits */}
          <Route path="/about" element={<About />} /> {/* Route pour la page Qui sommes-nous ? */}
          <Route path="/contact" element={<Contact />} /> {/* Route pour la page Contact */}
          <Route path="/faq" element={<FAQ />} /> {/* Route pour la page FAQ */}

          {/* Routes protégées pour les clients */}
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} /> {/* Route pour la page Checkout */}
          <Route path="/historique-commandes" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} /> {/* Route pour l'historique des commandes */}
          <Route path="/mon-profil" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} /> {/* Route pour le profil utilisateur */}
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} /> {/* Route pour la page Liste de souhaits */}
          <Route path="/mon-compte" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} /> {/* Route pour le tableau de bord utilisateur */}

          <Route path="/search" element={<SearchPage />} /> {/* Route pour la page de recherche */}

          {/* Routes protégées pour le profil Business */}
          <Route path="/business/dashboard" element={<ProtectedRoute><BusinessDashboard /></ProtectedRoute>} />
          <Route path="/business/products" element={<ProtectedRoute><BusinessProductManagement /></ProtectedRoute>} />
          <Route path="/business/orders" element={<ProtectedRoute><BusinessOrderManagement /></ProtectedRoute>} />
          <Route path="/business/settings" element={<ProtectedRoute><BusinessProfileSettings /></ProtectedRoute>} />

          {/* Routes protégées pour le profil Livreur */}
          <Route path="/livreur/dashboard" element={<ProtectedRoute><LivreurDashboard /></ProtectedRoute>} />
          <Route path="/livreur/deliveries" element={<ProtectedRoute><LivreurDeliveryManagement /></ProtectedRoute>} />

          {/* Routes futures pour d'autres pages/profiles */}
        </Routes>
        <Footer /> {/* Le Footer sera affiché sur toutes les pages */}
      </Router>
    </AuthProvider>
  );
};

export default App;