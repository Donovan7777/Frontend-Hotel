
import RechercheReservation from "./components/reservation/RechercheReservation";
import CreerReservation from "./components/reservation/CreerReservation";
import Client from "./components/client/Client";
import Admin from "./components/admin/Admin";
import Menu from "./components/menu/Menu";
import Chambre from "./components/chambre/Chambre";
import Login from "./components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Usager from "./components/usager/usager";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Menu parent avec <Outlet /> */}
        <Route path="/" element={<Menu />}>
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route path="/admin" element={<Admin />} />

          {/* Chambres */}
          <Route path="/chambre" element={<Chambre />} />

          {/* Réservations */}
          <Route path="/reservations" element={<RechercheReservation />} />
          <Route path="/reservations/creer" element={<CreerReservation />} />

          {/* ⬇️ NOUVELLE ROUTE: usagers (admin, protégé par le HOC dans le composant) */}
          <Route path="/usagers" element={<Usager />} />

          {/* Client (public, juste le titre pour plus tard) */}
          <Route path="/client" element={<Client />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
