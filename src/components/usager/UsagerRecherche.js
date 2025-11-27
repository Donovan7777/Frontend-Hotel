// src/components/usager/UsagerRecherche.js
// --------------------------------------------------------
// Deux champs contrôlés (nom, prénom).
// Le composant parent applique le filtre sur la liste.
// --------------------------------------------------------
export default function UsagerRecherche({ value, onChange }) {
  const setNom = (nom) => onChange({ ...value, nom });
  const setPrenom = (prenom) => onChange({ ...value, prenom });

  return (
    <>
      <label>Nom: </label>
      <input value={value.nom} onChange={(e) => setNom(e.target.value)} />
      <label style={{ marginLeft: 10 }}>Prénom: </label>
      <input value={value.prenom} onChange={(e) => setPrenom(e.target.value)} />
    </>
  );
}
