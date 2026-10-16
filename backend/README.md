# JASON FACE
Réseau social comme Facebook créé par JASON BUSINESS

## Structure
- public/index.html -> Fil d'actualité JASON FACE
- public/dashboard.html -> Admin (code 10092007)
- public/messager.html -> Messages privés
- public/story.html -> Stories
- public/parametres.html -> Paramètres
- backend/firebase.js -> Connexion Firebase starlink-investit
- api/[...path].js -> API Vercel
- serveur.js -> Serveur Express

## Firebase
ROOT: jasonBusiness
- users/{phone}
- facebook_posts/{id}
- jasonface_stories/{id}
- jasonface_messages/{id}

## Deploy Vercel
1. Upload tout sur GitHub
2. Connecte à Vercel
3. Ajoute env FIREBASE_SERVICE_ACCOUNT si tu utilises Admin SDK
4. Deploy

## Admin
Code: 10092007
