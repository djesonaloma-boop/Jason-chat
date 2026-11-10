# JASONBOOK — Réseau social
Projet assemblé à partir des pages HTML fournies, avec organisation Backend/, Assets/, Database/ et Api/.

## Inscription
Le formulaire demande désormais prénom, nom (sans post-nom), date de naissance, téléphone ou email, pays, ville et mot de passe. L'âge minimum côté interface est de 13 ans.

## Déploiement
1. Décompresse le ZIP et importe le dossier dans un dépôt GitHub.
2. Dans Vercel, importe le dépôt. Le fichier `vercel.json` configure l'API.
3. Pour exécuter localement : `npm install`, puis `npm start`.
4. Ouvre `index.html` via un serveur web, pas directement en `file://`.

## Modules inclus
Pages HTML originales conservées : profils, amis, groupes, messages, stories, vidéos, photos, marketplace, événements, notifications, sondages, souvenirs, paramètres, aide, etc. Le mode sombre est partagé entre les pages via `Assets/theme.js` et `Assets/theme.css`.

## Important — limites et sécurité
Ce ZIP est une base fonctionnelle/évolutive, pas une copie officielle de Facebook et pas une implémentation exhaustive de chaque fonction Facebook. Les modules dépendent de la configuration Firebase et des règles de sécurité. Le code initial utilisait un stockage de mot de passe côté base Firebase en clair : ne déploie pas avec de vrais utilisateurs avant migration vers Firebase Authentication, règles de sécurité, contrôle serveur et procédure de récupération sécurisée. Vercel ne conserve pas les fichiers locaux comme une base persistante ; garde Firebase ou connecte une base externe persistante.


## Nouveautés
- Thème commun violet/or selon le profil (`assets/brand.css`) et zoom tactile désactivé.
- `admin.html` : modération utilisateurs, publications, lives, signalements et demandes de boost.
- `admin-config.js` : UID administrateur à configurer.
- `booster.html` : demande de promotion et validation manuelle.
- Paramètres : changement du mot de passe avec ancien/nouveau/confirmation.

## Configuration admin
Crée ton compte, récupère son UID Firebase et remplace `REMPLACE_PAR_TON_UID_ADMIN` dans `admin-config.js`. Cette protection côté navigateur n'est PAS une sécurité serveur. Voir `SECURITY.md` avant toute mise en ligne.
## Android Studio
Utilise une WebView HTTPS avec JavaScript et DOM Storage, limite la navigation au domaine officiel, et demande les permissions caméra/micro au moment nécessaire. Pour une application publiée, configure aussi les téléchargements et le retour Android.
