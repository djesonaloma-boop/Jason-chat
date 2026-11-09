# Base de données
Le front-end existant est connecté à Firebase Realtime Database, projet `starlink-investit`, racine `jasonbook`.
Les données sont actuellement sous `jasonbook/users`, `jasonbook/posts`, etc.
`schema.sql` est un schéma de référence si tu migres plus tard vers SQL.
Important : ne stocke jamais les mots de passe en clair. Pour une mise en production, active Firebase Authentication et des règles Realtime Database strictes. Le backend fourni est une API de santé/description, pas encore une API complète d'authentification.
