// src/components/chambre/RechercherChambre.js
// --------------------------------------------------------
// Recherche par numéro de chambre (GET /chambres/{numero}).
// Si trouvé, on passe l’objet au parent avec onFound().
// --------------------------------------------------------
import { useState } from "react";
import { chambreApi } from "../../services/api";
import AsyncButton from "../async/AsyncButton";

export default function RechercherChambre({ onFound }) {
  const [no, setNo] = useState("");
  const [msg, setMsg] = useState("");

  // Lance la requête; informe le parent du résultat
  const run = async () => {
    setMsg("");
    try {
      const ch = await chambreApi.getByNumero(no);
      onFound?.(ch);
      setMsg("Trouvée ✅");
    } catch {
      onFound?.(null);
      setMsg("Introuvable.");
    }
  };

  return (
    <>
      <label>Numéro :</label>{" "}
      <input value={no} onChange={(e) => setNo(e.target.value)} />
      <AsyncButton onClick={run} style={{ marginLeft: 8 }}>
        Rechercher
      </AsyncButton>
      {msg && <p>{msg}</p>}
    </>
  );
}
