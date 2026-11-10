# Sécurité obligatoire

La version d'origine enregistre le mot de passe en clair dans `jasonbook/users/{uid}/password`. Ne déploie pas avec de vrais utilisateurs dans cet état. Migre vers Firebase Authentication, supprime le champ `password` de la base et utilise re-authentification + `updatePassword()`. L'admin ne doit jamais pouvoir lire les mots de passe.

La liste blanche de `admin-config.js` est une barrière d'interface uniquement. Les actions admin (suppression, suspension, modération, validation boost) doivent être vérifiées côté serveur via Firebase Admin SDK et custom claim `admin: true`.

Exemple volontairement restrictif de départ pour Realtime Database (à adapter/tester avant activation) :
```json
{"rules":{".read":false,".write":false,"jasonbook":{"users":{"$uid":{".read":"auth != null && auth.uid === $uid",".write":"auth != null && auth.uid === $uid"}}}}}
```
Cette règle bloque les autres fonctionnalités tant que les permissions détaillées ne sont pas définies.

## Modération des images et vidéos
Le filtre intégré à `creer-post.html` bloque quelques termes explicites dans le texte seulement. Il ne sait pas détecter la nudité dans les pixels d'une photo ou d'une vidéo. Pour un vrai refus automatique des médias, ajoute un service de modération d'images/vidéos côté serveur et bloque la publication tant que le contrôle n'est pas terminé. Ne considère pas ce filtre textuel comme une modération complète.
