/**
 * Données fictives pour la gestion des commandes d'un utilisateur Business.
 * Simule une liste de commandes avec leurs détails.
 */

export const ordersData = [
  {
    id: 'ORD001',
    customerName: 'Alice Dupont',
    customerEmail: 'alice.dupont@example.com',
    amount: 15000,
    status: 'En attente',
    date: '2025-07-04',
    products: [
      { id: 'PROD001', name: "Huile d'Argan Bio", quantity: 1, price: 15000 },
    ],
  },
  {
    id: 'ORD002',
    customerName: 'Bob Martin',
    customerEmail: 'bob.martin@example.com',
    amount: 25000,
    status: 'Traitée',
    date: '2025-07-03',
    products: [
      { id: 'PROD002', name: "Miel de Thym", quantity: 2, price: 10000 },
      { id: 'PROD003', name: "Savon Noir", quantity: 1, price: 5000 },
    ],
  },
  {
    id: 'ORD003',
    customerName: 'Charlie Leblanc',
    customerEmail: 'charlie.leblanc@example.com',
    amount: 8000,
    status: 'En attente',
    date: '2025-07-03',
    products: [
      { id: 'PROD004', name: "Épices Ras el Hanout", quantity: 1, price: 3500 },
      { id: 'PROD003', name: 'Savon Noir', quantity: 1, price: 4500 },
    ],
  },
  {
    id: 'ORD004',
    customerName: 'Diana Prince',
    customerEmail: 'diana.prince@example.com',
    amount: 30000,
    status: 'Livrée',
    date: '2025-07-02',
    products: [
      { id: 'PROD001', name: "Huile d'Argan Bio", quantity: 2, price: 15000 },
    ],
  },
];
