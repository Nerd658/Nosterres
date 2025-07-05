import React from 'react';

/**
 * Données fictives pour la FAQ.
 */
const faqData = [
  {
    question: 'Comment passer une commande ?',
    answer: 'Pour passer une commande, parcourez nos produits, ajoutez les articles souhaités à votre panier, puis suivez les étapes de validation de commande.',
  },
  {
    question: 'Quels sont les modes de paiement acceptés ?',
    answer: 'Nous acceptons les paiements par carte bancaire (Visa, MasterCard) et via des plateformes de paiement mobile.',
  },
  {
    question: 'Quels sont les délais de livraison ?',
    answer: 'Les délais de livraison varient en fonction de votre localisation et de la disponibilité des produits. Généralement, les livraisons sont effectuées sous 24 à 48 heures.',
  },
  {
    "question": "Puis-je modifier ou annuler ma commande après l'avoir passée ?",
    answer: "Une fois la commande confirmée, il est difficile de la modifier ou de l'annuler. Veuillez nous contacter immédiatement si vous avez besoin d'aide.",
  },
  {
    "question": "Comment puis-je suivre ma commande ?",
    "answer": "Vous recevrez un email de confirmation d'expédition avec un numéro de suivi une fois votre commande expédiée.",
  },
];

/**
 * Composant de la page FAQ.
 * Affiche une liste de questions fréquemment posées et leurs réponses.
 */
const FAQ = () => {
  const [openQuestion, setOpenQuestion] = React.useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-extrabold text-primary mb-8 text-center">Foire aux Questions (FAQ)</h1>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto">
        {faqData.map((item, index) => (
          <div key={index} className="border-b border-gray-200 last:border-b-0 py-4">
            <button
              className="flex justify-between items-center w-full text-left font-semibold text-lg text-gray-800 focus:outline-none"
              onClick={() => toggleQuestion(index)}
            >
              {item.question}
              <i className={`fas ${openQuestion === index ? 'fa-chevron-up' : 'fa-chevron-down'} text-primary`}></i>
            </button>
            {openQuestion === index && (
              <p className="mt-2 text-gray-600 leading-relaxed animate-fade-in-down">{item.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
