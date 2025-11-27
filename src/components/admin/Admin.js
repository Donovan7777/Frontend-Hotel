// src/components/admin/Admin.js
// --------------------------------------------------------
// Page d'accueil admin (protégée).
// Petit menu pour accéder aux sections de gestion.
// Le lien "Usagers" va bien vers /usagers (c’est l’outil d’admin).
// --------------------------------------------------------
import { Link } from "react-router-dom";
import withAuthentication from "../login/withAuthentication";

function Admin() {
  return (
    <>
      <h2>Interface admin</h2>
      <p>Salut! T'es loggé!!! tu peux gérer l'hôtel ici</p>

      <ul>
        <li><Link to="/chambre">Gérer les chambres</Link></li>
        <li><Link to="/reservations">Rechercher / modifier réservations</Link></li>
        <li><Link to="/reservations/creer">Créer une réservation</Link></li>
        {/* Section usagers (admin), pas la section client */}
        <li><Link to="/usagers">Rechercher / modifier usagers</Link></li>
      </ul>
    </>
  );
}

export default withAuthentication(Admin);
