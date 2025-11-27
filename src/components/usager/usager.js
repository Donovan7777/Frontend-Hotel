// src/components/usager/usager.js
// --------------------------------------------------------
// Outil admin "Usagers": filtre + liste + formulaire de modif.
// Rien à voir avec la section Client publique.
// --------------------------------------------------------
import { useState } from "react";
import withAuthentication from "../login/withAuthentication";
import UsagerRecherche from "./UsagerRecherche";
import UsagerList from "./UsagerList";
import UsagerModification from "./UsagerModification";

function Usager() {
  const [filtre, setFiltre] = useState({ nom: "", prenom: "" });
  const [selection, setSelection] = useState(null);
  const [reloadFlag, setReloadFlag] = useState(0);

  return (
    <>
      <h2>Usagers (admin)</h2>

      <section style={{ marginBottom: 20 }}>
        <UsagerRecherche value={filtre} onChange={setFiltre} />
      </section>

      <section style={{ marginBottom: 20 }}>
        <h3>Modifier</h3>
        {!selection && <p>Choisis un usager dans la liste.</p>}
        {selection && (
          <UsagerModification
            usager={selection}
            onSaved={() => {
              setSelection(null);
              setReloadFlag((n) => n + 1);
            }}
          />
        )}
      </section>

      <section>
        <UsagerList
          filtre={filtre}
          onSelect={setSelection}
          reloadFlag={reloadFlag}
        />
      </section>
    </>
  );
}

export default withAuthentication(Usager);
