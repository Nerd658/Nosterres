import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Client/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Routes futures pour d'autres pages/profiles */}
        {/* <Route path="/catalog" element={<Catalog />} /> */}
        {/* <Route path="/cart" element={<Cart />} /> */}
        {/* <Route path="/livreur/dashboard" element={<DashboardLivreur />} /> */}
        {/* <Route path="/entreprise/dashboard" element={<DashboardEntreprise />} /> */}
      </Routes>
    </Router>
  );
};

export default App;