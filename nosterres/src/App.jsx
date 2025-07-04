import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Client/Home';
import Login from './pages/Client/Login';
import Register from './pages/Client/Register';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Routes futures pour d'autres pages/profiles */}
        {/* <Route path="/catalog" element={<Catalog />} /> */}
        {/* <Route path="/cart" element={<Cart />} /> */}
        {/* <Route path="/livreur/dashboard" element={<DashboardLivreur />} /> */}
        {/* <Route path="/entreprise/dashboard" element={<DashboardEntreprise />} /> */}
      </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;