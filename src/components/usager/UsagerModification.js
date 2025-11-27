// src/components/usager/UsagerModification.js
// --------------------------------------------------------
// Formulaire de modification d’un usager (PUT /usagers/{id}).
// On affiche un message clair en succès/erreur (formatError).
// --------------------------------------------------------
import { useEffect, useState } from "react";
import { usagerApi } from "../../services/api";
import AsyncButton from "../async/AsyncButton";
import formatError from "../../utils/formatError";

export default function UsagerModification({ usager, onSaved }) {
  const [f, setF] = useState({ nom: "", prenom: "", adresse: "", mobile: "" });
  const [msg, setMsg] = useState("");

  // préremplir à la sélection
  useEffect(() => {
    if (!usager) return;
    setF({
      nom: usager.nom || "",
      prenom: usager.prenom || "",
      adresse: usager.adresse || "",
      mobile: usager.mobile || "",
    });
    setMsg("");
  }, [usager]);

  if (!usager) return null;

  // champs contrôlés
  const onChange = (e) => {
    const { name, value } = e.target;
    setF((p) => ({ ...p, [name]: value }));
  };

  // PUT vers l’API
  const save = async () => {
    setMsg("");
    try {
      await usagerApi.update(usager.idUsager, {
        nom: f.nom,
        prenom: f.prenom,
        adresse: f.adresse,
        mobile: f.mobile,
      });
      setMsg("Usager modifié ✅");
      onSaved?.();
    } catch (e) {
      setMsg(formatError(e));
    }
  };

  return (
    <>
      <p>ID: {usager.idUsager}</p>

      <label>Nom:</label><br />
      <input name="nom" value={f.nom} onChange={onChange} /><br /><br />

      <label>Prénom:</label><br />
      <input name="prenom" value={f.prenom} onChange={onChange} /><br /><br />

      <label>Adresse:</label><br />
      <input name="adresse" value={f.adresse} onChange={onChange} /><br /><br />

      <label>Mobile:</label><br />
      <input name="mobile" value={f.mobile} onChange={onChange} /><br /><br />

      <AsyncButton onClick={save}>Sauvegarder</AsyncButton>
      {msg && <p style={{ color: "crimson" }}>{msg}</p>}
    </>
  );
}
