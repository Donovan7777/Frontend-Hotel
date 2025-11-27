// src/components/async/AsyncButton.jsx
// --------------------------------------------------------
// Bouton qui gère un clic async tout seul.
// - bloque le double-clic pendant la requête
// - montre "En cours..." pendant l’action
// --------------------------------------------------------
import { useState } from "react";

export default function AsyncButton({ onClick, children, ...props }) {
  const [loading, setLoading] = useState(false);

  // Lance l’action et gèle le bouton le temps de la promesse
  const run = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await onClick?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button disabled={loading} onClick={run} {...props}>
      {loading ? "En cours..." : children}
    </button>
  );
}
