
/**
 * JASON BUSINESS — Configuration administrateur
 * Fichier : backend/admin-config.js
 *
 * SERVEUR UNIQUEMENT.
 * Ne jamais importer ce fichier dans un navigateur.
 */

"use strict";

const crypto = require("node:crypto");

const password = process.env.ADMIN_PASSWORD;
const tokenSigningKey = process.env.ADMIN_TOKEN_SIGNING_KEY;

if (!password || !tokenSigningKey) {
  throw new Error(
    "Configuration administrateur absente : définissez ADMIN_PASSWORD et ADMIN_TOKEN_SIGNING_KEY dans les variables d'environnement du serveur."
  );
}

if (tokenSigningKey.length < 32) {
  throw new Error(
    "ADMIN_TOKEN_SIGNING_KEY doit contenir au moins 32 caractères."
  );
}

module.exports = Object.freeze({
  password,
  tokenSigningKey
});
