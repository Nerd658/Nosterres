# NosTerres

NosTerres est une application web moderne construite avec React, Vite et Tailwind CSS. Ce projet vise à fournir une plateforme pour connecter les agriculteurs locaux avec les consommateurs, en offrant une interface utilisateur riche et des fonctionnalités robustes.

## Table des matières

- [NosTerres](#nosterres)
  - [Table des matières](#table-des-matières)
  - [Pour commencer](#pour-commencer)
    - [Prérequis](#prérequis)
    - [Installation](#installation)
  - [Scripts disponibles](#scripts-disponibles)
  - [Structure du projet](#structure-du-projet)
  - [Dépendances](#dépendances)
  - [Contribuer](#contribuer)
  - [Licence](#licence)

## Pour commencer

Ces instructions vous permettront d'obtenir une copie du projet opérationnelle sur votre machine locale à des fins de développement et de test.

### Prérequis

Assurez-vous d'avoir les logiciels suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 14 ou ultérieure)
- [npm](https://www.npmjs.com/) (généralement fourni avec Node.js)

### Installation

1.  Clonez le dépôt :

    ```sh
    git clone https://github.com/votre-utilisateur/nosterres.git
    ```

2.  Accédez au répertoire du projet :

    ```sh
    cd nosterres
    ```

3.  Installez les dépendances :

    ```sh
    npm install
    ```

## Scripts disponibles

Dans le répertoire du projet, vous pouvez exécuter :

- `npm run dev` : Lance l'application en mode développement. Ouvrez [http://localhost:5173](http://localhost:5173) pour la voir dans le navigateur.

- `npm run build` : Construit l'application pour la production dans le dossier `dist`.

- `npm run lint` : Lance ESLint pour analyser le code à la recherche d'erreurs de style et de syntaxe.

- `npm run preview` : Sert le build de production localement pour prévisualiser l'application.

## Fonctionnalités

- **Page d'accueil** : Une page d'accueil riche avec une section de bienvenue, des catégories de produits, des produits en vedette et les plus vendus, des témoignages de clients et une section d'inscription à la newsletter.
- **Navigation intuitive** : Un en-tête et un pied de page complets, ainsi qu'une barre de catégories pour une navigation facile.
- **Cartes de produits** : Des cartes de produits détaillées avec des images, des descriptions, des prix, des évaluations et des options d'ajout au panier.
- **Recherche** : Une barre de recherche pour trouver facilement des produits.
- **Design réactif** : Une interface utilisateur qui s'adapte à différentes tailles d'écran, du mobile au bureau.

## Structure du projet

```
nosterres/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── TestimonialCard.jsx
│   │   └── layout/
│   │       ├── CategoriesBar.jsx
│   │       ├── Footer.jsx
│   │       └── Header.jsx
│   ├── pages/
│   │   └── Client/
│   │       └── Home.jsx
│   ├── styles/
│   ├── utils/
│   │   ├── products.json
│   │   └── testimonials.json
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Dépendances

Ce projet utilise les dépendances principales suivantes :

- **React** : Une bibliothèque JavaScript pour construire des interfaces utilisateur.
- **React DOM** : Fournit des méthodes spécifiques au DOM pour React.
- **React Router DOM** : Pour la navigation déclarative dans les applications React.
- **Tailwind CSS** : Un framework CSS "utility-first" pour un style rapide et personnalisé.
- **Vite** : Un outil de build qui vise à fournir une expérience de développement plus rapide et plus légère pour les projets web modernes.

Pour une liste complète des dépendances, veuillez consulter le fichier `package.json`.

## Contribuer

Les contributions sont ce qui fait de la communauté open source un endroit extraordinaire pour apprendre, inspirer et créer. Toutes les contributions que vous faites sont **grandement appréciées**.

Si vous avez une suggestion pour améliorer cela, veuillez forker le dépôt et créer une pull request. Vous pouvez également simplement ouvrir une issue avec le tag "enhancement".

1.  Forkez le projet
2.  Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3.  Commitez vos modifications (`git commit -m 'Add some AmazingFeature'`)
4.  Pushez vers la branche (`git push origin feature/AmazingFeature`)
5.  Ouvrez une Pull Request

## Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.