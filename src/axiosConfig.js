// src/axiosConfig.js
// -----------------------------------------------------------------------------
// axiosConfig du projet.
// L’idée : on met le baseURL de ton FastAPI ici,
// pis on plug le token automatiquement si t’es loggé.
// Comme ça, dans les composantes, tu fais juste instance.get/post.
// -----------------------------------------------------------------------------


import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000", // ton backend roule là par défaut
});

// Avant chaque request, on ajoute le token si y’en a un.
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("AUTH_TOKEN");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
