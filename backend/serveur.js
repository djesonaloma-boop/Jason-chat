
/**
 * JASON BUSINESS — Serveur local Express
 * Fichier : backend/server.js
 *
 * Lancement local :
 * node backend/server.js
 *
 * Sur Vercel, utilise le point d'entrée API prévu
 * pour le déploiement serverless.
 */

"use strict";

const app = require("./app");

const PORT = Number(process.env.PORT) || 3000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `JASON BUSINESS backend disponible sur le port ${PORT}`
  );
});

server.on("error", error => {
  if (error.code === "EADDRINUSE") {
    console.error(`Le port ${PORT} est déjà utilisé.`);
  } else {
    console.error("Erreur de démarrage du serveur :", error.message);
  }

  process.exitCode = 1;
});

function shutdown(signal) {
  console.log(`\n${signal} reçu : arrêt du serveur...`);

  server.close(error => {
    if (error) {
      console.error("Erreur pendant l'arrêt :", error.message);
      process.exitCode = 1;
    }

    process.exit();
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
