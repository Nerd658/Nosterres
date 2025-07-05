import React, { useState } from 'react';
import Button from '../../components/common/Button';
import { useNotification } from '../../context/NotificationContext';

/**
 * Données fictives pour le profil utilisateur.
 */
const userData = {
  name: 'Jean Dupont',
  email: 'jean.dupont@example.com',
  phone: '+221 77 123 45 67',
  address: "123 Rue de l'Exemple, Dakar, Sénégal",
};

const initialAddresses = [
  { id: 'addr1', label: 'Domicile', address: '123 Rue Principale, Ville, Pays', isDefault: true },
  { id: 'addr2', label: 'Bureau', address: '456 Avenue du Travail, Ville, Pays', isDefault: false },
];

/**
 * Composant de la page Profil utilisateur.
 * Permet à l'utilisateur de visualiser et modifier ses informations personnelles et ses adresses de livraison.
 */
const UserProfile = () => {
  const [formData, setFormData] = useState(userData);
  const [addresses, setAddresses] = useState(initialAddresses);
  const [newAddress, setNewAddress] = useState({
    label: '',
    address: '',
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
    showNotification('Profil mis à jour (simulé) !', 'success');
    console.log('Données du profil mises à jour:', formData);
    // Ici, vous enverriez les données à votre API backend
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddress.label || !newAddress.address) {
      showNotification('Veuillez remplir tous les champs de la nouvelle adresse.', 'error');
      return;
    }
    const addressToAdd = { ...newAddress, id: `addr${Date.now()}`, isDefault: false };
    setAddresses(prev => [...prev, addressToAdd]);
    showNotification('Nouvelle adresse ajoutée ! (simulé)', 'success');
    setNewAddress({ label: '', address: '' });
  };

  const handleDeleteAddress = (idToDelete) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette adresse ?')) {
      setAddresses(prev => prev.filter(addr => addr.id !== idToDelete));
      showNotification('Adresse supprimée ! (simulé)', 'info');
    }
  };

  const handleSetDefaultAddress = (idToSetDefault) => {
    setAddresses(prev => prev.map(addr => (
      addr.id === idToSetDefault ? { ...addr, isDefault: true } : { ...addr, isDefault: false }
    )));
    showNotification('Adresse par défaut mise à jour ! (simulé)', 'success');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-100 text-center">
        <p className="text-xl text-gray-700">Chargement du profil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-100 text-center">
        <p className="text-xl text-red-500">Erreur: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-extrabold text-primary mb-8 text-center">Mon Profil</h1>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Informations personnelles</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
          </div>
          <div className="mb-6">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Adresse de livraison (principale)</label>
            <textarea id="address" name="address" rows="3" value={formData.address} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"></textarea>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              text="Sauvegarder les modifications"
              variant="primary"
              size="lg"
              startIcon={<i className="fas fa-save mr-2"></i>}
            />
          </div>
        </form>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Mes Adresses de Livraison</h2>

        {addresses.length === 0 ? (
          <p className="text-gray-600 mb-6">Vous n'avez pas encore d'adresses enregistrées.</p>
        ) : (
          <div className="space-y-4 mb-6">
            {addresses.map(addr => (
              <div key={addr.id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm">
                <div>
                  <p className="font-semibold text-gray-800">{addr.label} {addr.isDefault && <span className="ml-2 px-2 py-0.5 bg-primary-light text-primary text-xs font-medium rounded-full">Par défaut</span>}</p>
                  <p className="text-gray-700">{addr.address}</p>
                </div>
                <div className="flex space-x-2 mt-3 md:mt-0">
                  {!addr.isDefault && (
                    <Button
                      onClick={() => handleSetDefaultAddress(addr.id)}
                      variant="secondary"
                      size="sm"
                      text="Définir par défaut"
                    />
                  )}
                  <Button
                    onClick={() => handleDeleteAddress(addr.id)}
                    variant="danger"
                    size="sm"
                    text={<i className="fas fa-trash-alt"></i>}
                    ariaLabel="Supprimer l'adresse"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        <h3 className="text-xl font-bold text-gray-800 mb-4">Ajouter une nouvelle adresse</h3>
        <form onSubmit={handleAddAddress} className="space-y-4">
          <div>
            <label htmlFor="newAddressLabel" className="block text-sm font-medium text-gray-700 mb-1">Libellé (ex: Domicile, Bureau)</label>
            <input type="text" id="newAddressLabel" name="label" value={newAddress.label} onChange={(e) => setNewAddress(prev => ({ ...prev, label: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" required />
          </div>
          <div>
            <label htmlFor="newAddressFull" className="block text-sm font-medium text-gray-700 mb-1">Adresse complète</label>
            <textarea id="newAddressFull" name="address" rows="3" value={newAddress.address} onChange={(e) => setNewAddress(prev => ({ ...prev, address: e.target.value }))} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" required></textarea>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              text="Ajouter l'adresse"
              variant="primary"
              size="md"
              startIcon={<i className="fas fa-plus-circle mr-2"></i>}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;