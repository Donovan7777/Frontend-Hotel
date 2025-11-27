// src/components/async/AsyncBlock.jsx
// --------------------------------------------------------
// Petit wrapper pour rendu async.
// - loading: affiche "Chargement..."
// - error:   affiche un message en rouge
// - sinon:   rend les enfants
// --------------------------------------------------------
export default function AsyncBlock({ loading, error, children }) {
  if (loading) return <p>Chargement...</p>;
  if (error)   return <p style={{ color: "red" }}>{error}</p>;
  return <>{children}</>;
}
