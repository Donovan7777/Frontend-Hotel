// src/components/reservation/ModificationReservation.js
// --------------------------------------------------------
// Formulaire de modification d’une réservation (PUT /reservations/{id}).
// Points clés:
//  - champs préremplis, baseline pour détecter ce qui change
//  - validation simple des dates (début < fin)
//  - possibilité de changer la chambre par numéro
//  - messages d’erreur propres via formatError()
// --------------------------------------------------------
import { useEffect, useState } from "react";
import { reservationApi } from "../../services/api";
import AsyncButton from "../async/AsyncButton";
import formatError from "../../utils/formatError";

export default function ModificationReservation({ reservation, onSaved }) {
  const [f, setF] = useState({
    dateDebut: "",
    dateFin: "",
    prixParJour: "",
    infoReservation: "",
    newNumeroChambre: "",
  });
  const [baseline, setBaseline] = useState({
    dateDebut: "",
    dateFin: "",
    currentRoomNo: "",
  });
  const [msg, setMsg] = useState("");

  // Charge la réservation dans le formulaire (format YYYY-MM-DD)
  useEffect(() => {
    if (!reservation) return;

    const n = (s) => (s && s.includes("T") ? s.split("T")[0] : s || "");
    const currentRoomNo =
      reservation?.chambre?.numero_chambre ??
      reservation?.chambre?.numero ??
      "";

    setF({
      dateDebut: n(reservation.dateDebut || reservation.date_debut_reservation),
      dateFin: n(reservation.dateFin || reservation.date_fin_reservation),
      prixParJour: reservation.prixParJour ?? reservation.prix_jour ?? "",
      infoReservation:
        reservation.infoReservation ?? reservation.info_reservation ?? "",
      newNumeroChambre: currentRoomNo?.toString() ?? "",
    });

    setBaseline({
      dateDebut: n(reservation.dateDebut || reservation.date_debut_reservation),
      dateFin: n(reservation.dateFin || reservation.date_fin_reservation),
      currentRoomNo: currentRoomNo?.toString() ?? "",
    });

    setMsg("");
  }, [reservation]);

  if (!reservation) return null;

  // champs contrôlés
  const onChange = (e) => {
    const { name, value } = e.target;
    setF((p) => ({ ...p, [name]: value }));
  };

  // petit parse sécuritaire pour dates
  const validDate = (s) => {
    if (!s) return null;
    const d = new Date(s);
    return isNaN(d.getTime()) ? null : d;
  };

  // Construit le body patch: on envoie seulement ce qui change
  const save = async () => {
    setMsg("");
    try {
      const body = {};
      const d1 = validDate(f.dateDebut);
      const d2 = validDate(f.dateFin);

      if (f.dateDebut && f.dateDebut !== baseline.dateDebut) body.dateDebut = f.dateDebut;
      if (f.dateFin && f.dateFin !== baseline.dateFin) body.dateFin = f.dateFin;
      if (f.prixParJour !== "") body.prixParJour = Number(f.prixParJour);
      if (f.infoReservation !== "") body.infoReservation = f.infoReservation;

      // chambre: on l’envoie seulement si ça a changé
      if (f.newNumeroChambre && f.newNumeroChambre !== baseline.currentRoomNo) {
        body.numeroChambre = Number(f.newNumeroChambre);
      }

      // règle simple: début < fin
      if (d1 && d2 && d1 >= d2) {
        setMsg("La date de début doit être avant la date de fin.");
        return;
      }

      const id = reservation.idReservation || reservation.id_reservation;
      await reservationApi.update(id, body);
      setMsg("Réservation modifiée ✅");
      onSaved?.();
    } catch (e) {
      setMsg(formatError(e));
    }
  };

  return (
    <>
      <p><b>ID:</b> {reservation.idReservation || reservation.id_reservation}</p>
      <p><b>Chambre actuelle:</b> #{baseline.currentRoomNo || "?"}</p>

      <label>Date début (YYYY-MM-DD):</label><br />
      <input name="dateDebut" value={f.dateDebut} onChange={onChange} /><br /><br />

      <label>Date fin (YYYY-MM-DD):</label><br />
      <input name="dateFin" value={f.dateFin} onChange={onChange} /><br /><br />

      <label>Prix/jour:</label><br />
      <input name="prixParJour" value={f.prixParJour} onChange={onChange} /><br /><br />

      <label>Info:</label><br />
      <input name="infoReservation" value={f.infoReservation} onChange={onChange} /><br /><br />

      <label>Changer pour le numéro de chambre:</label><br />
      <input
        name="newNumeroChambre"
        value={f.newNumeroChambre}
        onChange={onChange}
      /><br /><br />

      <AsyncButton onClick={save}>Sauvegarder</AsyncButton>
      {msg && <p style={{ color: "crimson" }}>{msg}</p>}
    </>
  );
}
