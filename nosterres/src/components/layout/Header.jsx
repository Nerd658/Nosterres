import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { useCart } from '../../context/CartContext'; // Importation du hook useCart
import { useAuth } from '../../context/AuthContext'; // Importation du hook useAuth

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { getTotalItems } = useCart(); // Utilisation du hook useCart
    const { isLoggedIn, username, logout } = useAuth(); // Utilisation du hook useAuth

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleOutsideClick = (event) => {
        const dropdown = document.getElementById('mobile-menu-dropdown');
        const button = document.getElementById('mobile-menu-button');
        if (dropdown && button && !button.contains(event.target) && !dropdown.contains(event.target)) {
        setIsMobileMenuOpen(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center mr-2">
                <i className="fas fa-leaf text-green-600 text-xl"></i>
            </div>
            <span className="text-xl font-bold text-primary">Nosterres</span>
            </div>

            {/* Barre de recherche (cachée sur mobile) */}
            <div className="hidden md:flex flex-1 mx-6">
            <div className="relative w-full max-w-xl">
                <input
                type="text"
                placeholder="Rechercher des produits..."
                className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary"
                aria-label="Rechercher des produits"
                />
                <button
                className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-primary"
                aria-label="Lancer la recherche"
                >
                <i className="fas fa-search"></i>
                </button>
            </div>
            </div>

            {/* Icônes de navigation */}
            <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-2">
                {isLoggedIn ? (
                    <>
                        <span className="px-4 py-2 text-gray-600 font-medium">Bienvenue, {username}</span>
                        <Button
                            text="Déconnexion"
                            className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark font-medium"
                            onClick={logout}
                        />
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <Button
                                text="Login"
                                className="px-4 py-2 text-gray-600 bg-white font-medium"
                            />
                        </Link>
                        <Link to="/register">
                            <Button
                                text="Signup"
                                className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark font-medium"
                            />
                        </Link>
                    </>
                )}
            </div>
            <button className="p-2 text-gray-600 hover:text-primary relative" aria-label="Favoris">
                <i className="far fa-heart text-xl"></i>
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
                </span>
            </button>
            <button className="p-2 text-gray-600 hover:text-primary relative" aria-label="Panier">
                <i className="fas fa-shopping-cart text-xl"></i>
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {getTotalItems()} {/* Affichage dynamique du nombre d'articles */}
                </span>
            </button>
            {/* Bouton menu mobile */}
            <div className="relative">
                <button
                id="mobile-menu-button"
                className="p-2 text-gray-600 hover:text-primary"
                onClick={toggleMobileMenu}
                aria-label="Ouvrir le menu mobile"
                >
                <i className="fas fa-bars text-xl"></i>
                </button>
                {/* Menu déroulant mobile */}
                <div
                id="mobile-menu-dropdown"
                className={`${
                    isMobileMenuOpen ? 'block' : 'hidden'
                } absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50`}
                >
                {isLoggedIn ? (
                    <>
                        <span className="block px-4 py-2 text-gray-700">Bienvenue, {username}</span>
                        <a href="#" onClick={logout} className="block px-4 py-2 text-gray-700 hover:bg-green-50">
                            Déconnexion
                        </a>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-green-50">
                            Login
                        </Link>
                        <Link to="/register" className="block px-4 py-2 text-gray-700 hover:bg-green-50">
                            Signup
                        </Link>
                    </>
                )}
                <div className="border-t border-gray-100 my-1"></div>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-green-50">
                    Paramètres
                </a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-green-50">
                    Mon historique
                </a>
                <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-green-50">
                    Tableau de bord
                </a>
                </div>
            </div>
            </div>
        </div>

        {/* Barre de recherche mobile */}
        <div className="md:hidden px-4 pb-3">
            <div className="relative">
            <input
                type="text"
                placeholder="Rechercher des produits..."
                className="w-full py-2 px-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary"
                aria-label="Rechercher des produits (mobile)"
            />
            <button
                className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-primary"
                aria-label="Lancer la recherche (mobile)"
            >
                <i className="fas fa-search"></i>
            </button>
            </div>
        </div>
        </header>
    );
};

export default Header;