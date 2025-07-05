/**
 * Données fictives pour le tableau de bord d'un utilisateur Business.
 * Simule les statistiques clés et les activités récentes.
 */

export const dashboardData = {
  stats: {
    totalSales: 125000, // Chiffre d'affaires total
    totalOrders: 450,    // Nombre total de commandes
    totalProducts: 75,   // Nombre total de produits listés
    pendingOrders: 12,   // Commandes en attente de traitement
  },
  recentOrders: [
    {
      id: 'ORD001',
      customerName: 'Alice Dupont',
      amount: 15000,
      status: 'En attente',
      date: '2025-07-04',
    },
    {
      id: 'ORD002',
      customerName: 'Bob Martin',
      amount: 25000,
      status: 'Traitée',
      date: '2025-07-03',
    },
    {
      id: 'ORD003',
      customerName: 'Charlie Leblanc',
      amount: 8000,
      status: 'En attente',
      date: '2025-07-03',
    },
  ],
  productPerformance: [
    {
      id: 'PROD001',
      name: "Huile d'Argan Bio",
      sales: 50000,
      unitsSold: 120,
    },
    {
      id: 'PROD002',
      name: "Miel de Thym",
      sales: 30000,
      unitsSold: 80,
    },
    {
      id: 'PROD003',
      name: "Savon Noir",
      sales: 15000,
      unitsSold: 200,
    },
  ],
};
