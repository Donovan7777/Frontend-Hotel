// src/components/login/withAuthentication.js
// --------------------------------------------------------
// HOC de protection: si pas de token -> redirige vers /login.
// On lit le token dans localStorage (clé AUTH_TOKEN).
// --------------------------------------------------------
import { Navigate } from "react-router-dom";

const withAuthentication = (Component) => {
  const Wrapper = (props) => {
    // on vérifie juste présence d’un token non vide
    const token = localStorage.getItem("AUTH_TOKEN");
    const isAuthenticated = token && token.length > 0;

    return isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />;
  };

  return Wrapper;
};

export default withAuthentication;
