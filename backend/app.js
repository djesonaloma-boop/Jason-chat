
/* =====================================================
   JASON BUSINESS — app.js
   Frontend : inscription, connexion et session
   ===================================================== */

"use strict";

const JasonBusiness = (() => {
  const API_BASE = "/api";

  const KEYS = {
    token: "jasonBusinessToken",
    user: "jasonBusinessUser",
    phone: "jasonBusinessUserPhone",
    logged: "jasonBusinessLogged",
    adminToken: "jasonBusinessAdminToken"
  };

  async function request(path, options = {}) {
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {})
    };

    const token = localStorage.getItem(KEYS.token);
    if (token) headers.Authorization = `Bearer ${token}`;

    let response;

    try {
      response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers
      });
    } catch {
      throw new Error(
        "Connexion impossible. Vérifie ta connexion Internet et le déploiement du serveur."
      );
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.error || `Erreur du serveur (${response.status}).`
      );
    }

    return data;
  }

  function showMessage(element, message, type = "error") {
    if (!element) {
      alert(message);
      return;
    }

    element.textContent = message;
    element.className = `message ${type}`;
    element.style.display = "block";
  }

  function clearMessage(element) {
    if (!element) return;
    element.textContent = "";
    element.className = "message";
    element.style.display = "none";
  }

  function setLoading(button, loading, text = "Veuillez patienter...") {
    if (!button) return;

    if (loading) {
      button.dataset.originalText = button.textContent;
      button.disabled = true;
      button.textContent = text;
    } else {
      button.disabled = false;
      button.textContent =
        button.dataset.originalText || button.textContent;
      delete button.dataset.originalText;
    }
  }

  function saveSession(data) {
    /*
      Le backend doit renvoyer une session utilisateur vérifiée.
      Ne stocke jamais le mot de passe dans le navigateur.
    */
    if (data.token) {
      localStorage.setItem(KEYS.token, data.token);
    }

    if (data.user) {
      localStorage.setItem(KEYS.user, JSON.stringify(data.user));

      if (data.user.phone) {
        localStorage.setItem(KEYS.phone, data.user.phone);
      }
    }

    localStorage.setItem(KEYS.logged, "true");
  }

  function logout() {
    localStorage.removeItem(KEYS.token);
    localStorage.removeItem(KEYS.user);
    localStorage.removeItem(KEYS.phone);
    localStorage.removeItem(KEYS.logged);
    window.location.href = "login.html";
  }

  function getUser() {
    try {
      const user = localStorage.getItem(KEYS.user);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }

  function isLoggedIn() {
    return Boolean(
      localStorage.getItem(KEYS.token) &&
      localStorage.getItem(KEYS.logged) === "true"
    );
  }

  async function register(payload) {
    return request("/register", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  async function login(payload) {
    return request("/login", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  }

  async function loadProfile() {
    return request("/me/profile", {
      method: "GET"
    });
  }

  function initRegister() {
    const form = document.getElementById("registerForm");
    if (!form) return;

    const message = document.getElementById("message");
    const button = document.getElementById("registerBtn");

    form.addEventListener("submit", async event => {
      event.preventDefault();
      clearMessage(message);

      const name = document.getElementById("name")?.value.trim() || "";
      const phone = document.getElementById("phone")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const password = document.getElementById("password")?.value || "";
      const confirmPassword =
        document.getElementById("confirmPassword")?.value || "";
      const referral =
        document.getElementById("referral")?.value.trim() || "";
      const terms = document.getElementById("acceptTerms");

      if (!name || !phone || !password) {
        showMessage(message, "Remplis tous les champs obligatoires.");
        return;
      }

      if (password.length < 6) {
        showMessage(message, "Le mot de passe doit contenir au moins 6 caractères.");
        return;
      }

      if (password !== confirmPassword) {
        showMessage(message, "Les mots de passe ne correspondent pas.");
        return;
      }

      if (terms && !terms.checked) {
        showMessage(message, "Accepte les conditions d’utilisation.");
        return;
      }

      setLoading(button, true, "Création du compte...");

      try {
        const data = await register({
          name,
          phone,
          email,
          password,
          referral
        });

        if (data.token && data.user) {
          saveSession(data);
        }

        showMessage(
          message,
          data.message || "Inscription réussie.",
          "success"
        );

        setTimeout(() => {
          window.location.href = data.redirect || "dashboard.html";
        }, 700);
      } catch (error) {
        showMessage(message, error.message);
      } finally {
        setLoading(button, false);
      }
    });
  }

  function initLogin() {
    const form = document.getElementById("loginForm");
    if (!form) return;

    const message = document.getElementById("message");
    const button = document.getElementById("loginBtn");

    form.addEventListener("submit", async event => {
      event.preventDefault();
      clearMessage(message);

      const phone =
        document.getElementById("phone")?.value.trim() || "";
      const password =
        document.getElementById("password")?.value || "";

      if (!phone || !password) {
        showMessage(message, "Entre ton numéro et ton mot de passe.");
        return;
      }

      setLoading(button, true, "Connexion...");

      try {
        const data = await login({ phone, password });

        if (!data.token || !data.user) {
          throw new Error(
            "Le serveur n’a pas renvoyé une session utilisateur valide."
          );
        }

        saveSession(data);

        showMessage(
          message,
          data.message || "Connexion réussie.",
          "success"
        );

        setTimeout(() => {
          window.location.href = data.redirect || "dashboard.html";
        }, 500);
      } catch (error) {
        showMessage(message, error.message);
      } finally {
        setLoading(button, false);
      }
    });
  }

  async function initDashboard() {
    const logoutButton = document.getElementById("logoutBtn");

    if (logoutButton) {
      logoutButton.addEventListener("click", logout);
    }

    if (!isLoggedIn()) {
      window.location.href = "login.html";
      return;
    }

    try {
      const data = await loadProfile();

      const nameElement = document.getElementById("userName");
      const profile = data.profile || {};

      if (nameElement) {
        nameElement.textContent =
          profile.name || getUser()?.name || "Utilisateur";
      }
    } catch (error) {
      /*
        Une erreur de profil ne doit pas être présentée comme
        une authentification réussie. Vérifie la session côté serveur.
      */
      console.error("Chargement du profil impossible :", error.message);
    }
  }

  function init() {
    initRegister();
    initLogin();

    if (document.getElementById("logoutBtn") ||
        document.getElementById("userName")) {
      initDashboard();
    }
  }

  return {
    request,
    register,
    login,
    loadProfile,
    saveSession,
    getUser,
    isLoggedIn,
    logout,
    init
  };
})();

document.addEventListener("DOMContentLoaded", JasonBusiness.init);
