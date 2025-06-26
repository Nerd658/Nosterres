import React from 'react';
import Button from '../common/Button';

const Footer = () => {
    return (
        <footer className="bg-primary-black text-white py-12">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo et description */}
            <div>
                <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center mr-2">
                    <i className="fas fa-leaf text-primary text-xl"></i>
                </div>
                <span className="text-xl font-bold text-white">Noterres</span>
                </div>
                <p className="text-sm text-gray-200">
                Noterres, votre plateforme e-commerce locale, connecte les producteurs et artisans directement à vous pour des produits authentiques et de qualité.
                </p>
            </div>

            {/* Liens utiles */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
                <ul className="space-y-2">
                <li>
                    <a href="#" className="text-gray-200 hover:text-primary-light hover:underline">
                    À propos
                    </a>
                </li>
                <li>
                    <a href="#" className="text-gray-200 hover:text-primary-light hover:underline">
                    FAQ
                    </a>
                </li>
                <li>
                    <a href="#" className="text-gray-200 hover:text-primary-light hover:underline">
                    Conditions générales
                    </a>
                </li>
                <li>
                    <a href="#" className="text-gray-200 hover:text-primary-light hover:underline">
                    Politique de confidentialité
                    </a>
                </li>
                </ul>
            </div>

            {/* Contact */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Contactez-nous</h3>
                <ul className="space-y-2">
                <li className="flex items-center">
                    <i className="fas fa-envelope mr-2 text-primary-light"></i>
                    <a href="mailto:contact@noterres.com" className="text-gray-200 hover:text-primary-light hover:underline">
                    contact@noterres.com
                    </a>
                </li>
                <li className="flex items-center">
                    <i className="fas fa-phone mr-2 text-primary-light"></i>
                    <span className="text-gray-200">+225 01 23 45 67 89</span>
                </li>
                <li className="flex items-center">
                    <i className="fas fa-map-marker-alt mr-2 text-primary-light"></i>
                    <span className="text-gray-200">Abidjan, Côte d'Ivoire</span>
                </li>
                </ul>
            </div>

            {/* Newsletter */}
            <div>
                <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                <p className="text-sm text-gray-200 mb-4">
                Abonnez-vous pour recevoir nos offres exclusives.
                </p>
                <div className="flex">
                <input
                    type="email"
                    placeholder="Votre email"
                    className="flex-1 py-2 px-4 rounded-l-full focus:outline-none text-gray-800"
                    aria-label="S'abonner à la newsletter"
                />
                <Button
                    text="S'abonner"
                    className="px-4 py-2 bg-primary text-white rounded-r-full hover:bg-green-700"
                    ariaLabel="S'abonner à la newsletter"
                />
                </div>
            </div>
            </div>

            {/* Mentions légales */}
            <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-sm text-gray-200">
                &copy; 2025 Noterres. Tous droits réservés.
            </p>
            </div>
        </div>
        </footer>
    );
};

export default Footer;