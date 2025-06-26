import React from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import CategoriesBar from '../../components/layout/CategoriesBar';
import Button from '../../components/common/Button';
import ProductCard from '../../components/common/ProductCard';
import TestimonialCard from '../../components/common/TestimonialCard';
import products from '../../utils/products.json';
import testimonials from '../../utils/testimonials.json';

// Données statiques pour les catégories et avantages
const categories = [
  { name: 'Fruits & Légumes', icon: 'fa-apple-alt', description: 'Fraîcheur garantie' },
  { name: 'Épicerie', icon: 'fa-utensils', description: 'Saveurs locales' },
  { name: 'Cosmétiques', icon: 'fa-spa', description: 'Naturels & bio' },
  { name: 'Textile', icon: 'fa-tshirt', description: 'Artisanat local' },
  { name: 'Artisanat', icon: 'fa-gem', description: 'Créations uniques' },
];

const benefits = [
  { 
    title: 'Livraison rapide', 
    icon: 'fa-truck', 
    description: 'Recevez vos commandes en moins de 48h dans les grandes villes' 
  },
  { 
    title: 'Paiement sécurisé', 
    icon: 'fa-shield-alt', 
    description: 'Transactions 100% sécurisées avec nos partenaires bancaires' 
  },
  { 
    title: 'Produits authentiques', 
    icon: 'fa-leaf', 
    description: 'Directement des producteurs et artisans locaux' 
  },
  { 
    title: 'Support client', 
    icon: 'fa-headset', 
    description: 'Assistance 7j/7 via WhatsApp, email et téléphone' 
  },
];

const Home = () => {
  return (
    <div className="text-gray-800">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#DFF5E3] via-[#B8E4C1] to-[#A8D5BA] py-12 md:py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              Découvrez le meilleur du local, livré chez vous
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Des produits authentiques, sélectionnés avec soin pour vous offrir qualité et fraîcheur.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                text="Explorer la boutique"
                className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark font-medium shadow-md"
              />
              <Button
                text="Comment ça marche ?"
                className="px-6 py-3 bg-white text-green-600 border border-green-600 rounded-full hover:bg-green-50 font-medium"
              />
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary-light rounded-full opacity-50"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-light rounded-full opacity-50"></div>
              <img
                src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                alt="Produits locaux"
                className="relative rounded-xl shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Nos Catégories</h2>
          <CategoriesBar categories={categories} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Produits en vedette</h2>
            <Button 
              text="Voir tout" 
              className="text-primary font-medium hover:underline bg-transparent border-none" 
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id || index} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Produit les plus vendus</h2>
            <Button 
              text="Voir tout" 
              className="text-primary font-medium hover:underline bg-transparent border-none" 
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id || index} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Pourquoi choisir Noterres ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center px-4">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`fas ${benefit.icon} text-2xl text-primary`}></i>
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Ce que disent nos clients</h2>
          <div className="relative max-w-4xl mx-auto">
            <div className="carousel-container overflow-hidden">
              <div className="carousel-track flex transition-transform duration-300 ease-in-out" id="testimonial-track">
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id || index} className="carousel-item min-w-full px-4">
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>
            <button 
              className="carousel-prev absolute left-0 top-1/2 transform -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md hover:bg-green-50"
              aria-label="Témoignage précédent"
            >
              <i className="fas fa-chevron-left text-primary"></i>
            </button>
            <button 
              className="carousel-next absolute right-0 top-1/2 transform -translate-y-1/2 -mr-4 bg-white p-2 rounded-full shadow-md hover:bg-green-50"
              aria-label="Témoignage suivant"
            >
              <i className="fas fa-chevron-right text-primary"></i>
            </button>
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot w-2 h-2 rounded-full bg-gray-300 hover:bg-primary ${index === 0 ? 'bg-primary' : ''}`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Restez informés</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Abonnez-vous à notre newsletter pour recevoir nos offres exclusives et découvrir nos nouveaux produits.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 py-3 px-4 rounded-l-full focus:outline-none text-gray-800"
              aria-label="Adresse email pour la newsletter"
            />
            <Button
              text="S'abonner"
              className="bg-primary-dark hover:bg-green-900 px-6 py-3 rounded-r-full font-medium text-white"
            />
          </div>
          <p className="text-sm mt-4 text-green-100">Nous ne partagerons jamais votre email avec des tiers.</p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;