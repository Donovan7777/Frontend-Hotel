// src/components/reservation/RechercheReservation.js
// --------------------------------------------------------
// Charge toutes les réservations puis filtre en front (nom/prénom).
// Permet de sélectionner une ligne pour la modifier en dessous.
// Affiche aussi le # de chambre dans la liste.
// --------------------------------------------------------
import { useState } from "react";
import { reservationApi } from "../../services/api";
import AsyncButton from "../async/AsyncButton";
import AsyncBlock from "../async/AsyncBlock";
import ModificationReservation from "./ModificationReservation";

export default function RechercheReservation() {
  const [reservations, setReservations] = useState([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [sel, setSel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // Va chercher la liste (API)
  const charger = async () => {
    setErr("");
    setLoading(true);
    try {
      const data = await reservationApi.list();
      setReservations(data || []);
    } catch (e) {
      setErr("Erreur en chargeant les réservations.");
    } finally {
      setLoading(false);
    }
  };

  // Filtrage simple côté front (contains, case-insensitive)
  const filtre = reservations.filter((r) => {
    const n = nom.trim().toLowerCase();
    const p = prenom.trim().toLowerCase();
    const rNom = (r.usager?.nom || "").toLowerCase();
    const rPrenom = (r.usager?.prenom || "").toLowerCase();
    const okNom = !n || rNom.includes(n);
    const okPrenom = !p || rPrenom.includes(p);
    return okNom && okPrenom;
  });

  return (
    <>
      <div style={{ marginBottom: 8 }}>
        <AsyncButton onClick={charger}>Charger / Rechercher</AsyncButton>
      </div>

      <label>Nom: </label>
      <input value={nom} onChange={(e) => setNom(e.target.value)} />
      <label style={{ marginLeft: 10 }}>Prénom: </label>
      <input value={prenom} onChange={(e) => setPrenom(e.target.value)} />

      <AsyncBlock loading={loading} error={err}>
        <ul style={{ marginTop: 12 }}>
          {filtre.map((r) => (
            <li key={r.idReservation}>
              {r.usager?.prenom} {r.usager?.nom} — {r.dateDebut} → {r.dateFin} — {r.prixParJour}$ —{" "}
              chambre #{r.chambre?.numero_chambre ?? "?"}
              <button style={{ marginLeft: 8 }} onClick={() => setSel(r)}>Modifier</button>
            </li>
          ))}
        </ul>
      </AsyncBlock>

      <hr />
      <h4>Modifier</h4>
      {!sel && <p>Choisis une réservation dans la liste ci-haut.</p>}
      {sel && <ModificationReservation reservation={sel} onSaved={() => { setSel(null); charger(); }} />}
    </>
  );
}
