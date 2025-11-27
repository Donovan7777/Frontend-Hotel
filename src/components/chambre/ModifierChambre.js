// src/components/chambre/ModifierChambre.js
// --------------------------------------------------------
// Formulaire de mise à jour d’une chambre (PUT /chambres/{id}).
// - Préremplit avec la chambre sélectionnée
// - Valide au backend, affiche les messages formatés
// - On garde la logique simple côté front (cast number, checkbox, etc.)
// --------------------------------------------------------
import { useEffect, useState } from "react";
import { chambreApi } from "../../services/api";
import AsyncButton from "../async/AsyncButton";
import formatError from "../../utils/formatError";

export default function ModifierChambre({ chambre, onSaved }) {
  const [f, setF] = useState({
    numero_chambre: "",
    disponible_reservation: false,
    nom_type: "",
    autre_informations: "",
  });
  const [msg, setMsg] = useState("");

  // Charge la chambre dans le state du formulaire
  useEffect(() => {
    if (!chambre) return;
    setF({
      numero_chambre: chambre?.numero_chambre ?? "",
      disponible_reservation: chambre?.disponible_reservation ?? false,
      nom_type: chambre?.type_chambre?.nom_type ?? "",
      autre_informations: chambre?.autre_informations ?? "",
    });
    setMsg("");
  }, [chambre]);

  // Pas de chambre sélectionnée -> petit hint
  if (!chambre) return <p>Choisis une chambre via la recherche ci-haut.</p>;

  // MàJ contrôlée des champs
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setF((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  // Envoi au backend (on convertit les types minimaux côté front)
  const save = async () => {
    setMsg("");
    try {
      const payload = {
        numero_chambre:
          f.numero_chambre === "" ? undefined : Number(f.numero_chambre),
        disponible_reservation: !!f.disponible_reservation,
        autre_informations: f.autre_informations,
        nom_type: f.nom_type,
      };
      const saved = await chambreApi.update(chambre.idChambre, payload);
      onSaved?.(saved);
      setMsg("Chambre modifiée ✅");
    } catch (e) {
      setMsg(formatError(e));
    }
  };

  return (
    <>
      <p><b>ID:</b> {chambre.idChambre}</p>

      <label>Numéro:</label><br />
      <input
        name="numero_chambre"
        type="number"
        value={f.numero_chambre}
        onChange={onChange}
      /><br /><br />

      <label>Type (nom_type):</label><br />
      <input
        name="nom_type"
        value={f.nom_type}
        onChange={onChange}
      /><br /><br />

      <label>Autres infos:</label><br />
      <textarea
        name="autre_informations"
        rows="3"
        value={f.autre_informations}
        onChange={onChange}
      /><br /><br />

      <AsyncButton onClick={save}>Sauvegarder</AsyncButton>
      {msg && <p style={{ color: "crimson" }}>{msg}</p>}
    </>
  );
}
