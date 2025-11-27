// src/components/chambre/Chambre.js
// --------------------------------------------------------
// Page "Chambres" en trois blocs: liste, recherche, modification.
// La recherche alimente la section "Modifier" en dessous.
// --------------------------------------------------------
import withAuthentication from "../login/withAuthentication";
import ListerChambre from "./ListerChambre";
import RechercherChambre from "./RechercherChambre";
import ModifierChambre from "./ModifierChambre";
import { useState } from "react";

function Chambre() {
  const [chambre, setChambre] = useState(null);

  return (
    <>
      <h2>Gestion chambres</h2>

      {/* Recherche par numéro -> passe l'objet trouvé à "Modifier" */}
      <section style={{ marginBottom: 20 }}>
        <h3>Rechercher par numéro</h3>
        <RechercherChambre onFound={setChambre} />
      </section>

      {/* Formulaire de modif visible seulement si une chambre est sélectionnée */}
      <section>
        <h3>Modifier</h3>
        <ModifierChambre chambre={chambre} onSaved={setChambre} />
      </section>

      {/* Liste simple des chambres */}
      <section style={{ marginBottom: 20 }}>
        <h3>Liste</h3>
        <ListerChambre />
      </section>
    </>
  );
}

export default withAuthentication(Chambre);
