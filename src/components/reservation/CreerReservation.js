// src/components/reservation/CreerReservation.js
// --------------------------------------------------------
// Création de réservation en deux façons:
//  A) par IDs (usager/chambre)
//  B) par numéro de chambre + mobile (plus pratique)
// Chaque bloc a son petit état et son message de feedback.
// --------------------------------------------------------
import { useState } from "react";
import { reservationApi } from "../../services/api";
import AsyncButton from "../async/AsyncButton";
import withAuthentication from "../login/withAuthentication";
import formatError from "../../utils/formatError";  
function CreerReservation() {
  // Forme A: IDs
  const [f, setF] = useState({
    idUsager: "",
    idChambre: "",
    dateDebut: "",
    dateFin: "",
    prixParJour: "",
    infoReservation: "",
  });
  const [msg, setMsg] = useState("");

  // Forme B: numero + mobile
  const [g, setG] = useState({
    numeroChambre: "",
    mobile: "",
    dateDebut: "",
    dateFin: "",
    prixParJour: "",
    infoReservation: "",
  });
  const [msgB, setMsgB] = useState("");

  // handlers simples
  const onChangeA = (e) => {
    const { name, value } = e.target;
    setF((prev) => ({ ...prev, [name]: value }));
  };
  const onChangeB = (e) => {
    const { name, value } = e.target;
    setG((prev) => ({ ...prev, [name]: value }));
  };

  // POST /reservations (par IDs)
  const runA = async () => {
    setMsg("");
    try {
      // (désactivé)
      setMsg("Ce mode est désactivé.");
    } catch (e) {
      setMsg(formatError(e));
    }
  };

  // POST /reservations/parNumero (par numéro + mobile)
  const runB = async () => {
    setMsgB("");
    try {
      await reservationApi.createParNumero({
        numeroChambre: Number(g.numeroChambre),
        mobile: g.mobile,
        dateDebut: g.dateDebut,
        dateFin: g.dateFin,
        prixParJour: Number(g.prixParJour),
        infoReservation: g.infoReservation || null,
      });
      setMsgB("Réservation (par numéro) créée ✅");
      setG({
        numeroChambre: "",
        mobile: "",
        dateDebut: "",
        dateFin: "",
        prixParJour: "",
        infoReservation: "",
      });
    } catch (e) {
      setMsgB(formatError(e));
    }
  };

  return (
    <>
      <h2>Créer une réservation</h2>

      {/* Bloc A: création par IDs */}
      {/* (formulaire retiré du rendu) */}

      <hr />

      {/* Bloc B: création par numéro + mobile */}
      <section>
        <h3>Par numéro de chambre + mobile</h3>
        {msgB && <p style={{ color: "crimson" }}>{msgB}</p>}
        <label>Numéro de chambre:</label><br />
        <input
          name="numeroChambre"
          type="number"
          value={g.numeroChambre}
          onChange={onChangeB}
        /><br /><br />
        <label>Mobile (10 ou 15 chiffres):</label><br />
        <input name="mobile" value={g.mobile} onChange={onChangeB} /><br /><br />
        <label>Date début (YYYY-MM-DD):</label><br />
        <input name="dateDebut" value={g.dateDebut} onChange={onChangeB} /><br /><br />
        <label>Date fin (YYYY-MM-DD):</label><br />
        <input name="dateFin" value={g.dateFin} onChange={onChangeB} /><br /><br />
        <label>Prix par jour:</label><br />
        <input name="prixParJour" value={g.prixParJour} onChange={onChangeB} /><br /><br />
        <label>Info (optionnel):</label><br />
        <input
          name="infoReservation"
          value={g.infoReservation}
          onChange={onChangeB}
        /><br /><br />
        <AsyncButton onClick={runB}>Créer par numéro</AsyncButton>
      </section>
    </>
  );
}

export default withAuthentication(CreerReservation);
