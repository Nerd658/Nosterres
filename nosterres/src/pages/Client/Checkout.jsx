import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';

const Checkout = () => {
  const { cartItems, getTotalItems, clearCart } = useCart();
  const { showNotification } = useNotification();
  const { userId } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    phone: '',
  });

  const [savedAddresses, setSavedAddresses] = useState(() => {
    const storedAddresses = localStorage.getItem(`userAddresses_${userId || 'guest'}`);
    return storedAddresses
      ? JSON.parse(storedAddresses)
      : [
          {
            id: 'addr_home',
            label: 'Domicile',
            firstName: 'Jean',
            lastName: 'Dupont',
            address: "123 Rue de l'Exemple",
            city: 'Dakar',
            zipCode: '10000',
            country: 'Sénégal',
            phone: '+221771234567',
          },
          {
            id: 'addr_work',
            label: 'Bureau',
            firstName: 'Jean',
            lastName: 'Dupont',
            address: '456 Avenue du Travail',
            city: 'Dakar',
            zipCode: '10000',
            country: 'Sénégal',
            phone: '+221771234567',
          },
        ];
  });

  const [selectedAddressId, setSelectedAddressId] = useState(
    savedAddresses.length > 0 ? savedAddresses[0].id : 'new_address'
  );
  const [showNewAddressForm, setShowNewAddressForm] = useState(savedAddresses.length === 0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
  });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    localStorage.setItem(`userAddresses_${userId || 'guest'}`, JSON.stringify(savedAddresses));
  }, [savedAddresses, userId]);

  useEffect(() => {
    if (selectedAddressId && selectedAddressId !== 'new_address') {
      const selected = savedAddresses.find(addr => addr.id === selectedAddressId);
      if (selected) {
        setShippingInfo(selected);
      }
    } else if (selectedAddressId === 'new_address') {
      setShippingInfo({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zipCode: '',
        country: '',
        phone: '',
      });
    }
  }, [selectedAddressId, savedAddresses]);

  const getItemSubtotal = (item) => item.product.price * item.quantity;

  const getCartTotal = () =>
    cartItems.reduce((total, item) => total + getItemSubtotal(item), 0);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectAddress = (addressId) => {
    setSelectedAddressId(addressId);
    const selected = savedAddresses.find(addr => addr.id === addressId);
    if (selected) {
      setShippingInfo(selected);
      setShowNewAddressForm(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      const { firstName, lastName, address, city, zipCode, country, phone } = shippingInfo;
      if (!firstName || !lastName || !address || !city || !zipCode || !country || !phone) {
        showNotification('Veuillez remplir tous les champs de livraison.', 'error');
        return;
      }
      const phoneRegex = /^\+?[0-9]{8,15}$/;
      if (!phoneRegex.test(phone)) {
        showNotification('Veuillez entrer un numéro de téléphone valide.', 'error');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({ ...prev, [name]: value }));
  };

  const processPayment = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.2;
        resolve({
          success,
          message: success
            ? 'Paiement réussi !'
            : 'Échec du paiement. Veuillez vérifier vos informations.',
        });
      }, 1500);
    });
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      showNotification('Veuillez sélectionner une méthode de paiement.', 'error');
      return;
    }

    if (paymentMethod === 'credit_card') {
      const { cardNumber, expiryDate, cvc } = cardDetails;
      if (!cardNumber || !expiryDate || !cvc) {
        showNotification('Veuillez remplir tous les champs de la carte de crédit.', 'error');
        return;
      }
      if (!/^[0-9]{16}$/.test(cardNumber.replace(/\s/g, ''))) {
        showNotification('Numéro de carte invalide (16 chiffres requis).', 'error');
        return;
      }
      if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(expiryDate)) {
        showNotification("Date d'expiration invalide (MM/AA).", 'error');
        return;
      }
      if (!/^[0-9]{3,4}$/.test(cvc)) {
        showNotification('CVC invalide (3 ou 4 chiffres).', 'error');
        return;
      }

      showNotification('Traitement du paiement...', 'info');
      const paymentResult = await processPayment();

      if (!paymentResult.success) {
        showNotification(paymentResult.message, 'error');
        return;
      }
    }

    showNotification('Commande passée avec succès ! Un email de confirmation vous a été envoyé.', 'success');
    clearCart();
    setIsOrderPlaced(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  // ✅ Bloc corrigé
  if (cartItems.length === 0 && !isOrderPlaced) {
    return (
      <div className="container mx-auto px-4 py-8 text-center min-h-[calc(100vh-200px)]">
        <i className="fas fa-shopping-bag text-8xl text-gray-300 mb-6"></i>
        <h1 className="text-3xl font-bold text-primary mb-4">Votre panier est vide.</h1>
        <p className="text-lg text-gray-600 mb-8">
          Veuillez ajouter des articles à votre panier avant de passer à la caisse.
        </p>
        <Link to="/cart">
          <Button
            text="Retour au panier"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg transform hover:scale-105"
          />
        </Link>
      </div>
    );
  }

  // ✅ Bloc corrigé
  if (isOrderPlaced) {
    return (
      <div className="container mx-auto px-4 py-8 text-center min-h-[calc(100vh-200px)]">
        <i className="fas fa-check-circle text-8xl text-green-500 mb-6"></i>
        <h1 className="text-3xl font-bold text-primary mb-4">Commande passée avec succès !</h1>
        <p className="text-lg text-gray-600 mb-8">
          Merci pour votre achat. Un email de confirmation a été envoyé.
        </p>
        <Link to="/">
          <Button
            text="Retour à l'accueil"
            className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg transform hover:scale-105"
          />
        </Link>
      </div>
    );
  }

  // Ton checkout complet reste pareil :
  return (
    <div className="container mx-auto px-4 py-8 min-h-[calc(100vh-200px)]">
      {/* ... ton contenu complet ... */}
      {/* Je ne réécris pas tout car il est inchangé ! */}
    </div>
  );
};

export default Checkout;
