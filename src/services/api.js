// src/services/api.js
import instance from "../axiosConfig";

/** ---------- Types de chambre ---------- */
export const typeApi = {
  list: async () => (await instance.get("/typesChambre")).data,
  get: async (id) => (await instance.get(`/typeChambre/${id}`)).data,
  create: async (data) => (await instance.post("/creerTypeChambre", data)).data,
  update: async (id, data) => (await instance.put(`/typeChambre/${id}`, data)).data,
  remove: async (id) => (await instance.delete(`/typeChambre/${id}`)).data,
};

/** -------------- Chambres -------------- */
export const chambreApi = {
  list: async () => (await instance.get("/chambres")).data,
  getById: async (id) => (await instance.get(`/chambres/id/${id}`)).data,
  getByNumero: async (no) => (await instance.get(`/chambres/${no}`)).data,
  create: async (data) => (await instance.post("/creerChambre", data)).data,
  update: async (id, data) => (await instance.put(`/chambres/${id}`, data)).data,
  remove: async (id) => (await instance.delete(`/chambres/${id}`)).data,
};

/** ------------- Réservations ------------ */
export const reservationApi = {
  list: async () => (await instance.get("/reservations")).data,
  get: async (id) => (await instance.get(`/reservations/${id}`)).data,
  createParNumero: async (data) => (await instance.post(`/reservations/parNumero`, data)).data,
  update: async (id, data) => (await instance.put(`/reservations/${id}`, data)).data,
  remove: async (id) => (await instance.delete(`/reservations/${id}`)).data,
};

/** ---------------- Usagers -------------- */
export const usagerApi = {
  list: async () => (await instance.get("/usagers")).data,
  get: async (id) => (await instance.get(`/usagers/${id}`)).data,
  create: async (data) => (await instance.post("/usagers", data)).data,
  update: async (id, data) => (await instance.put(`/usagers/${id}`, data)).data,
  remove: async (id) => (await instance.delete(`/usagers/${id}`)).data,

  // recherche par nom/prénom (substrin je l'utilise pas
  search: async (q) =>
    (await instance.get("/usagers/recherche", { params: { q } })).data,
};
