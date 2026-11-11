# Optimisations JASONBOOK

## Modifications faites sans changer l'apparence
- Le profil ne télécharge plus toute la branche `jasonbook/likes` en continu. Le nombre de J'aime utilise `likesCount` (ou le compteur numérique historique `likes`) déjà présent sur la publication.
- La liste des personnes qui ont aimé est chargée uniquement quand le modal est ouvert, pour la publication concernée, puis les profils correspondants sont lus individuellement.
- Le fil d'actualité utilise un seul écouteur pour les 40 publications récentes et la mise à jour des commentaires, au lieu de deux écouteurs sur la même requête.
- Les compteurs publics de la page d'accueil sont lus une fois, sans écouteurs permanents sur tous les utilisateurs et toutes les publications.
- Correction du point d'entrée API Vercel : le dossier réel est `api/` et le serveur réel est `backend/serveur.js` (respect de la casse).
- `npm start` sert aussi les pages HTML et les assets en local.

## Index Firebase à ajouter
Le fichier `database/performance-indexes.json` est un exemple de règles d'indexation. Il faut fusionner ces propriétés `.indexOn` avec les règles déjà en place dans Firebase Realtime Database. Ne remplace pas toutes tes règles par ce fichier : cela pourrait bloquer l'accès aux fonctionnalités.

## Important : Firebase est encore utilisé
Je n'ai pas supprimé Firebase et je n'ai pas remplacé la base par une base locale ou temporaire. Toutes les pages existantes utilisent encore Firebase. Le remplacer complètement exige une base persistante (par exemple Supabase/PostgreSQL), un projet configuré et des identifiants de connexion ; aucun identifiant de ce type n'était fourni dans le ZIP. Un serveur Vercel ne doit pas utiliser un fichier JSON local comme base durable, car son stockage local n'est pas persistant.

## Points à traiter avant une vraie mise en production
- Le code existant stocke les mots de passe en clair dans `jasonbook/users`. Il faut migrer les comptes vers Firebase Authentication avant de retirer ce champ.
- Le code admin contient un code secret côté navigateur : il est visible dans le HTML et ne constitue pas une protection. Les actions d'administration doivent être validées côté serveur.
- Plusieurs pages historiques lisent encore de grandes branches (`users`, `posts` ou `messages`). Leur optimisation dépend de la structure exacte des données et des règles/index disponibles ; elles n'ont pas été réécrites aveuglément pour éviter de casser les fonctions.
