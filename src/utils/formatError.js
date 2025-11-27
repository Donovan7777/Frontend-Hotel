// src/utils/formatError.js
// --------------------------------------------------------
// But du fichier (en mots simples):
// - Prendre une erreur (souvent Axios/FastAPI) et la transformer
//   en une phrase claire en français pour afficher dans le front.
// - On "nettoie" les messages techniques (ex.: "body.", "query.")
//   et on traduit certains bouts anglais fréquents de Pydantic.
// Où c’est utilisé?
// - Dans les composants qui font des appels API et veulent montrer
//   un message d’erreur court et compréhensible à l’usager.
//   (ex.: ModificationReservation, UsagerModification, ModifierChambre)
// Entrée typique:
// - err est une erreur Axios: err.response.data.detail peut être
//   * une string (déjà bien compactée par notre backend)
//   * un array d’objets (format brut Pydantic)
//   * un objet avec des champs divers
// Sortie:
// - une simple string FR prête à mettre dans <p style={{color:'crimson'}}>
// Conseils:
// - Appelle formatError(err) dans un catch(e) et mets ce texte à l’écran.
// - Si jamais on reçoit un format imprévu, on renvoie "Erreur inconnue...".
// --------------------------------------------------------
export default function formatError(err) {
  try {
    let detail = err?.response?.data?.detail;

    // Cas #1 : le backend retourne déjà une string FR compacte.
    // (Notre handler 422 fait justement ça pour la majorité des erreurs.)
    if (typeof detail === "string") {
      return cleanup(detail);
    }

    // Cas #2 : Pydantic brut -> un array avec des objets {loc, msg, ...}
    // On reformate: "loc: msg", join avec " ; "
    if (Array.isArray(detail)) {
      const parts = detail.map((e) => {
        const loc = Array.isArray(e?.loc) ? e.loc.join(".") : (e?.loc ?? "");
        const msg = e?.msg ?? "Entrée invalide";
        return loc ? `${loc}: ${msg}` : msg;
      });
      return cleanup(parts.join(" ; "));
    }

    // Cas #3 : objet inconnu -> dernier recours: JSON.stringify + cleanup
    if (detail && typeof detail === "object") {
      return cleanup(JSON.stringify(detail));
    }

    // Cas #4 : pas de detail -> on essaie des fallback "généraux"
    const fallback =
      err?.message ||
      err?.toString?.() ||
      "Erreur inconnue côté serveur.";
    return cleanup(String(fallback));
  } catch {
    // Si tout pète pendant le formattage, on tombe ici (safe).
    return "Erreur inconnue côté serveur.";
  }
}

// --------------------------------------------------------
// cleanup(text)
// - Enlève du bruit technique (ex.: "body.", "query.", "path.")
// - Fait de petites traductions des messages Pydantic fréquents.
// - Trim final pour pas avoir d’espaces weird.
// Pourquoi enlever "body." / "query." / "path."?
// - C’est utile côté API mais mélangeant pour un usager
//   (on veut juste "prixParJour: Champ requis", pas "body.prixParJour: ...")
// --------------------------------------------------------
function cleanup(text) {
  if (!text) return "";
  let t = String(text);

  // Retire les préfixes techniques
  t = t.replace(/\b(body|query|path)\./g, "");

  // Traductions rapides (cas courants)
  // Note: on garde ça simple et "utilitaire".
  t = t
    .replace("String should have at least", "Doit contenir au moins")
    .replace("String should have at most", "Doit contenir au plus")
    .replace("Input should be a valid string", "Doit être une chaîne de caractères valide")
    .replace("Input should be a valid integer", "Doit être un entier valide")
    .replace("Input should be a valid boolean", "Doit être un booléen valide")
    .replace("value is not a valid uuid", "n'est pas un UUID valide")
    .replace("Field required", "Champ requis");

  // Trim final
  return t.trim();
}
