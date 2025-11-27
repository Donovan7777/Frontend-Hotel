// src/components/chambre/ListerChambre.js
// --------------------------------------------------------
// Liste toutes les chambres via l’API.
// Bouton "Rafraîchir" pour recharger à la demande.
// --------------------------------------------------------
import { useEffect, useState } from "react";
import { chambreApi } from "../../services/api";
import AsyncBlock from "../async/AsyncBlock";
import AsyncButton from "../async/AsyncButton";

export default function ListerChambre() {
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // Va chercher la liste complète
  const charger = async () => {
    setErr("");
    setLoading(true);
    try {
      const data = await chambreApi.list();
      setRows(data || []);
    } catch (e) {
      setErr("Erreur en chargeant la liste.");
    } finally {
      setLoading(false);
    }
  };

  // Charge une fois au montage
  useEffect(() => {
    charger();
  }, []);

  return (
    <AsyncBlock loading={loading} error={err}>
      <AsyncButton onClick={charger}>Rafraîchir</AsyncButton>
      <ul>
        {rows.map((c) => (
          <li key={c.idChambre}>
            #{c.numero_chambre} — {c.disponible_reservation ? "dispo" : "occupée"} — {c.type_chambre?.nom_type || "sans type"}
          </li>
        ))}
      </ul>
    </AsyncBlock>
  );
}
