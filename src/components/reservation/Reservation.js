// src/components/reservation/Reservation.js
// --------------------------------------------------------
// Page "Réservations": on offre la recherche + modif.
// (La création a sa propre page /reservations/creer.)
// --------------------------------------------------------
import withAuthentication from "../login/withAuthentication";
import RechercheReservation from "./RechercheReservation";

function Reservation() {
  return (
    <>
      <h2>Réservations</h2>

      <section style={{ marginBottom: 20 }}>
        <h3>Rechercher / modifier</h3>
        <RechercheReservation />
      </section>
    </>
  );
}

export default withAuthentication(Reservation);
