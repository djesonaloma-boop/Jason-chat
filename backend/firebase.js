
/* Configuration Web Firebase de JASON BUSINESS */
const firebaseConfig = {
  apiKey: "COLLE_TA_FIREBASE_API_KEY",
  authDomain: "TON_PROJECT_ID.firebaseapp.com",
  databaseURL: "COLLE_TON_URL_REALTIME_DATABASE",
  projectId: "TON_PROJECT_ID",
  storageBucket: "TON_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "TON_MESSAGING_SENDER_ID",
  appId: "TON_APP_ID"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.database();
