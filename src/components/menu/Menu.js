// src/components/menu/Menu.js
// --------------------------------------------------------
// Menu principal + <Outlet/> pour les pages.
// Liens: Admin / Client / Connexion
// Bouton "Déconnexion": toujours cliquable (même si pas loggé).
// --------------------------------------------------------
import { Component } from "react";
import { Outlet, Link } from "react-router-dom";

class Menu extends Component {
  render() {
    const isAuthenticated = !!localStorage.getItem("AUTH_TOKEN");

    return (
      <>
        <h1>Interface admin</h1>

        <nav style={{ marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }}>
          <Link to="/admin">Admin</Link>
          <span>|</span>

          <Link to="/client">Client</Link>
          <span>|</span>

          <Link to="/login">Connexion</Link>
          <span>|</span>

          {/* Déconnexion: on déclenche un clear + reload */}
          <button
            type="button"
            onClick={this.logout}
            style={{
              background: "transparent",
              border: "none",
              color: "purple",
              textDecoration: "underline",
              padding: 0,
              cursor: "pointer"   // jamais "not-allowed"
            }}
            title={isAuthenticated ? "Se déconnecter" : "Se déconnecter (aucun token stocké)"}
          >
            Déconnexion
          </button>
        </nav>

        <Outlet />
      </>
    );
  }

  // retire le token puis on force une navigation vers /login
  logout = () => {
    try {
      localStorage.removeItem("AUTH_TOKEN");
    } finally {
      window.location.assign("/login");
    }
  };
}

export default Menu;
