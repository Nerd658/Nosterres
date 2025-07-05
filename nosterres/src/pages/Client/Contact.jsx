import React, { useState } from 'react';
import Button from '../../components/common/Button';
import { useNotification } from '../../context/NotificationContext';

/**
 * Composant de la page Contact.
 * Permet aux utilisateurs d'envoyer un message via un formulaire de contact.
 */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const { showNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showNotification('Message envoyé (simulé) ! Nous vous répondrons bientôt.', 'success');
    console.log('Données du formulaire de contact:', formData);
    // Ici, vous enverriez les données à votre API backend
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-extrabold text-primary mb-8 text-center">Contactez-nous</h1>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
        <p className="text-gray-700 leading-relaxed mb-6 text-center">
          Une question, une suggestion, un problème ? N'hésitez pas à nous contacter via le formulaire ci-dessous.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Votre Nom</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Votre Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Votre Message</label>
            <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"></textarea>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              text="Envoyer le message"
              variant="primary"
              size="lg"
              startIcon={<i className="fas fa-paper-plane mr-2"></i>}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
