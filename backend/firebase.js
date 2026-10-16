import { initializeApp as initAdmin, cert, getApps as getAdminApps } from "firebase-admin/app";
import { getDatabase as getAdminDB } from "firebase-admin/database";
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyA24pBo8mBWiZssPtep--MMBdB7c8_Lu4U",
  authDomain: "starlink-investit.firebaseapp.com",
  databaseURL: "https://starlink-investit-default-rtdb.firebaseio.com",
  projectId: "starlink-investit",
  storageBucket: "starlink-investit.firebasestorage.app",
  messagingSenderId: "807081599583",
  appId: "1:807081599583:web:e00ec3959bc4acdae031ea"
};

// Client SDK pour frontend
export const app = getApps().length? getApps()[0] : initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const ROOT = "jasonBusiness";
export const FACE_ROOT = `${ROOT}/facebook_posts`;
export const USERS_ROOT = `${ROOT}/users`;
export const STORIES_ROOT = `${ROOT}/jasonface_stories`;
export const MESSAGES_ROOT = `${ROOT}/jasonface_messages`;

// Admin SDK pour backend/api
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");
export function getAdmin() {
  if (!getAdminApps().length && serviceAccount.project_id) {
    initAdmin({ credential: cert(serviceAccount), databaseURL: firebaseConfig.databaseURL });
  }
  return getAdminApps().length? getAdminDB() : null;
}
