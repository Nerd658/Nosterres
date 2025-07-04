# BACKEND_AUTH.md

---

## 🎯 Objectif

Créer un mini backend **Express + SQLite3** pour gérer une **authentification basique**, en local, sans hachage de mot de passe pour l’instant.  
**Trois endpoints seulement :**
1. `/api/register` ➜ inscription
2. `/api/login` ➜ connexion
3. `/api/logout` ➜ logout (note : logout = côté Front = suppression du token)

---

## ⚙️ Stack technique

- Node.js + Express
- SQLite3 (fichier `database.sqlite`)
- JWT pour générer les tokens de session
- `dotenv` pour stocker la clé JWT

---

## ✅ Fonctionnalités

### ✔️ 1) Inscription ➜ `POST /api/register`
- Reçoit : `username`, `email`, `password`
- Vérifie que l’email est unique (`UNIQUE` dans la table)
- Sauvegarde le mot de passe **en clair** (juste pour le test)
- Renvoie un message de succès

**Table `users` :**
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  email TEXT UNIQUE,
  password TEXT
);

---

### ✔️ 2) Connexion ➜ `POST /api/login`
- Vérifie que l’email existe.
- Vérifie que le mot de passe correspond.
- Si ok ➜ génère un JWT (`userId`, `email`).
- Renvoie :
  {
    "success": true,
    "message": "Connexion réussie",
    "token": "<JWT_TOKEN>",
    "user": {
      "id": 1,
      "username": "nerd",
      "email": "nerd@example.com"
    }
  }

---

### ✔️ 3) Logout ➜ `POST /api/logout`
- Comme c’est du JWT ➜ aucun token n’est stocké côté serveur.
- Le logout se fait **côté client** ➜ il suffit de supprimer le token du `localStorage` ou du cookie.
- L’endpoint peut juste renvoyer un :
  {
    "success": true,
    "message": "Déconnexion réussie"
  }

---

## 🔑 Exemple de flow côté Front

1️⃣ User envoie son `email` + `password` à `/api/login`  
2️⃣ Si OK ➜ token JWT est stocké dans le `localStorage`  
3️⃣ Pour accéder à un endpoint protégé ➜ envoyer `Authorization: Bearer <token>`  
4️⃣ Logout ➜ **côté Front :** tu supprimes le token.

---

## 📁 Structure attendue

/project
  /node_modules
  /database.sqlite
  .env
  index.js
  package.json

**Exemple `.env` :**
JWT_SECRET=MaSuperCleSecrete123

---

## 🧩 Exemple de requêtes `curl`

# Register
curl -X POST http://localhost:3000/api/register \\
-H "Content-Type: application/json" \\
-d '{"username":"nerd","email":"nerd@example.com","password":"1234"}'

# Login
curl -X POST http://localhost:3000/api/login \\
-H "Content-Type: application/json" \\
-d '{"email":"nerd@example.com","password":"1234"}'

# Logout
curl -X POST http://localhost:3000/api/logout

---

## ⚠️ Remarque Sécurité

> ⚠️ Mot de passe en clair ➜ jamais en production.  
> Pour du test local c’est OK ➜ upgrade plus tard avec `bcrypt` pour le hash.

---

## ✅ Résultat

- Lancement local :
  npm install
  node index.js

- API accessible sur `http://localhost:3000`

---

**Mot-clé : _Express SQLite JWT Auth POC_**
"""