import React, { useState } from 'react';
import { profileData } from '../../donnees_fictives/businessProfileData.js';
import Button from '../../components/common/Button';
import { useNotification } from '../../context/NotificationContext';

/**
 * Composant de la page des paramètres de profil pour les utilisateurs Business.
 * Permet de gérer les informations du compte et de l'entreprise.
 */
const ProfileSettings = () => {
  const [formData, setFormData] = useState(profileData);
  const { showNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      // Gérer les champs imbriqués comme bankDetails.bankName
      const [parent, child] = name.split('.');
      setFormData(prevData => ({
        ...prevData,
        [parent]: {
          ...prevData[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showNotification('Modifications sauvegardées (simulé) !', 'success');
    console.log('Données du profil sauvegardées:', formData);
    // Ici, vous enverriez les données à votre API backend
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Paramètres du profil Business</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Informations de l'entreprise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Nom de l'entreprise</label>
              <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
            </div>
            <div>
              <label htmlFor="siret" className="block text-sm font-medium text-gray-700">Numéro SIRET</label>
              <input type="text" id="siret" name="siret" value={formData.siret} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Adresse</label>
              <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone</label>
              <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description de l'entreprise</label>
              <textarea id="description" name="description" rows="3" value={formData.description} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"></textarea>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Informations bancaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">Nom de la banque</label>
              <input type="text" id="bankName" name="bankDetails.bankName" value={formData.bankDetails.bankName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
            </div>
            <div>
              <label htmlFor="rib" className="block text-sm font-medium text-gray-700">RIB</label>
              <input type="text" id="rib" name="bankDetails.rib" value={formData.bankDetails.rib} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
            </div>
            <div>
              <label htmlFor="bic" className="block text-sm font-medium text-gray-700">BIC/SWIFT</label>
              <input type="text" id="bic" name="bankDetails.bic" value={formData.bankDetails.bic} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500" />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              text="Sauvegarder les modifications"
              variant="primary"
              size="md"
              startIcon={<i className="fas fa-save mr-2"></i>}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;