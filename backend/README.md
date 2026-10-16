
# JASON BUSINESS — Backend Firebase Admin

Backend Node.js et Express utilisant Firebase Admin SDK pour gérer les opérations côté serveur.

## 1. Structure du projet

```text
jason-business/
├── api/
│   └── index.js
├── backend/
│   ├── app.js
│   ├── server.js
│   ├── firebase.js
│   ├── admin-config.js
│   └── serviceAccountKey.json
├── index.html
├── login.html
├── register.html
├── dashboard.html
├── app.js
├── package.json
├── vercel.json
├── .gitignore
└── README.md
```

## 2. Installation

1. Installez Node.js LTS sur un ordinateur ou un environnement serveur compatible.
2. Ouvrez un terminal dans le dossier du projet.
3. Installez les dépendances :

```bash
npm install
```

4. Dans Firebase Console, ouvrez les paramètres du projet, puis Comptes de service.
5. Générez une clé privée pour le compte de service.
6. Placez le fichier JSON obtenu dans :

```text
backend/serviceAccountKey.json
```

7. Vérifiez la configuration Firebase dans `backend/firebase.js`.

## 3. Configuration administrateur

Le fichier `backend/admin-config.js` doit utiliser des secrets fournis au serveur :

- `ADMIN_PASSWORD`
- `ADMIN_TOKEN_SIGNING_KEY`

Ces valeurs ne doivent jamais apparaître dans les pages HTML, `app.js`, les dépôts publics ou les réponses de l'API.

Pour un déploiement public, utilisez des mots de passe forts et une clé de signature aléatoire privée.

## 4. Démarrer le serveur local

Dans un environnement Node.js compatible :

```bash
npm start
```

Le script `start` doit être défini dans `package.json`.

Le serveur local utilise `backend/server.js`, qui charge `backend/app.js`.

## 5. Routes actuellement prévues

| Méthode | Route | Fonction |
|---|---|---|
| GET | `/api/health` | Vérifier que le backend répond |
| POST | `/api/admin/login` | Connexion administrateur |
| GET | `/api/admin/session` | Vérifier la session administrateur |
| GET | `/api/me/profile` | Lire le profil de l'utilisateur connecté |
| GET | `/api/admin/stats` | Lire les statistiques administrateur |

Les routes doivent être protégées par une authentification et des contrôles d'accès adaptés.

## 6. Inscription et connexion des utilisateurs

Le frontend `register.html` et `app.js` ne peuvent pas créer les comptes Firebase simplement en envoyant un formulaire.

Pour activer l'inscription, le backend doit encore proposer des routes dédiées, par exemple :

- `POST /api/register`
- `POST /api/login`

Ces routes doivent vérifier les données reçues, créer ou authentifier l'utilisateur avec Firebase Authentication, puis enregistrer son profil dans Realtime Database.

Ne stockez jamais les mots de passe en clair dans Realtime Database ou dans `localStorage`.

## 7. Sécurité Firebase

- Gardez `serviceAccountKey.json` exclusivement côté serveur.
- N'attribuez jamais le rôle administrateur à partir d'une valeur fournie par le navigateur.
- Vérifiez les jetons Firebase ID côté serveur.
- Vérifiez les autorisations avant chaque lecture ou écriture.
- Configurez les règles Realtime Database pour refuser les accès directs non autorisés.
- Ne renvoyez jamais les secrets ou les données privées d'autres utilisateurs.
- Ajoutez une limitation des tentatives de connexion et une validation stricte des entrées.
- Utilisez HTTPS en production.

## 8. Déploiement Vercel

Vercel exécute les fonctions API dans un environnement serverless. Le lancement avec `app.listen()` est destiné au serveur local.

Configurez un point d'entrée API compatible Vercel et vérifiez les chemins des fichiers ainsi que les dépendances.

Ne supposez pas que `serviceAccountKey.json` sera présent en production si le déploiement ne l'inclut pas explicitement. Préférez des secrets configurés côté serveur.

## 9. Migration du frontend

Certaines anciennes pages peuvent encore utiliser Firebase Web SDK directement.

Migrez progressivement chaque opération de lecture et d'écriture vers des routes API protégées avant de retirer les anciens blocs Firebase. Vérifiez chaque page après migration pour éviter de casser les fonctions existantes.

## 10. Vérification

Après le déploiement, vérifiez que :

- le backend démarre correctement ;
- `/api/health` renvoie un résultat positif ;
- les connexions refusent les identifiants incorrects ;
- les profils ne sont accessibles qu'à leur propriétaire ;
- les routes administrateur refusent les utilisateurs non autorisés ;
- l'inscription et la connexion fonctionnent de bout en bout.

---

**JASON BUSINESS — Web • Design • Digital • IA**

Créateur : Jason Aloma 🇨🇩
