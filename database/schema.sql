-- Schéma de référence pour une base SQL auto-hébergée.
-- Le site fourni utilise actuellement Firebase Realtime Database (voir firebaseConfig dans les pages).
CREATE TABLE IF NOT EXISTS users (
  uid TEXT PRIMARY KEY, prenom TEXT NOT NULL, nom TEXT NOT NULL,
  date_naissance DATE NOT NULL, email TEXT UNIQUE, telephone TEXT UNIQUE,
  pays TEXT, ville TEXT, bio TEXT DEFAULT '', photo_profil TEXT DEFAULT '',
  photo_couverture TEXT DEFAULT '', created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY, author_uid TEXT NOT NULL, content TEXT,
  media_url TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS friendships (
  user_uid TEXT NOT NULL, friend_uid TEXT NOT NULL, status TEXT NOT NULL,
  PRIMARY KEY(user_uid, friend_uid)
);
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY, sender_uid TEXT NOT NULL, receiver_uid TEXT NOT NULL,
  body TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
