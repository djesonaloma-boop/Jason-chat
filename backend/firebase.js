
/**
 * JASON BUSINESS — Firebase Admin SDK
 * Fichier : backend/firebase.js
 *
 * IMPORTANT :
 * - Serveur uniquement, jamais dans le navigateur.
 * - Ne publie jamais serviceAccountKey.json.
 */

const fs = require("node:fs");
const path = require("node:path");
const admin = require("firebase-admin");

const serviceAccountPath = path.join(
  __dirname,
  "serviceAccountKey.json"
);

if (!admin.apps.length) {
  if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(
      "Clé Firebase absente : ajoutez backend/serviceAccountKey.json depuis Firebase Console > Paramètres du projet > Comptes de service."
    );
  }

  const serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, "utf8")
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:
      "https://starlink-investit-default-rtdb.firebaseio.com",
    storageBucket:
      "starlink-investit.firebasestorage.app"
  });
}

const auth = admin.auth();
const database = admin.database();
const storage = admin.storage();

module.exports = {
  admin,
  auth,
  database,
  storage
};
