// src/components/usager/UsagerList.js
// --------------------------------------------------------
// Liste les usagers depuis l’API puis applique un filtre front-end.
// Bouton "Charger / Rechercher" pour rafraîchir.
// --------------------------------------------------------
import { useEffect, useState } from "react";
import { usagerApi } from "../../services/api";
import AsyncButton from "../async/AsyncButton";
import AsyncBlock from "../async/AsyncBlock";

export default function UsagerList({ filtre, onSelect, reloadFlag }) {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // fetch liste
  const charger = async () => {
    setErr("");
    setLoading(true);
    try {
      const data = await usagerApi.list();
      setRows(data || []);
    } catch {
      setErr("Erreur en chargeant les usagers.");
    } finally {
      setLoading(false);
    }
  };

  // recharge quand on sauve un usager (reloadFlag change)
  useEffect(() => { charger(); }, [reloadFlag]);

  const lower = (s) => (s || "").toLowerCase();
  const fNom = lower(filtre.nom);
  const fPrenom = lower(filtre.prenom);

  // filtre contains sur nom/prénom
  const filtered = rows.filter((u) => {
    const okNom = !fNom || lower(u.nom).includes(fNom);
    const okPrenom = !fPrenom || lower(u.prenom).includes(fPrenom);
    return okNom && okPrenom;
  });

  return (
    <>
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        <AsyncButton onClick={charger}>Charger / Rechercher</AsyncButton>
      </div>
      <AsyncBlock loading={loading} error={err}>
        <ul>
          {filtered.map((u) => (
            <li key={u.idUsager}>
              {u.prenom} {u.nom} — {u.mobile}
              <button style={{ marginLeft: 8 }} onClick={() => onSelect(u)}>Modifier</button>
            </li>
          ))}
        </ul>
      </AsyncBlock>
    </>
  );
}
