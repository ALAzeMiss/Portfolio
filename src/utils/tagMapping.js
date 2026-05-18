// Mapping des tags aux slugs de catégories
const tagToCategoryMap = {
  // Montagne
  'mountain': 'montagne',
  'montagne': 'montagne',
  'pyrénées': 'montagne',
  'pyrenees': 'montagne',
  'alpes': 'montagne',
  'trek': 'montagne',
  'hiking': 'montagne',
  'landscape': 'montagne',
  'landscapes': 'montagne',
  
  // Fleur
  'flower': 'fleur',
  'fleur': 'fleur',
  'flowers': 'fleur',
  'fleurs': 'fleur',
  'botanique': 'fleur',
  'nature': 'fleur',
  'macro': 'fleur',
  
  // Animaux
  'animal': 'animaux',
  'animaux': 'animaux',
  'animals': 'animaux',
  'wildlife': 'animaux',
  'faune': 'animaux',
  'bird': 'animaux',
  'birds': 'animaux',
  'insect': 'animaux',
  'insects': 'animaux',
  
  // Personnes
  'portrait': 'personnes',
  'personnes': 'personnes',
  'people': 'personnes',
  'person': 'personnes',
  'portraits': 'personnes',
  'cosplay': 'personnes',
  'event': 'personnes',
  'events': 'personnes',
  'shooting': 'personnes',
  'face': 'personnes',
  'faces': 'personnes',
  
  // Ville
  'city': 'ville',
  'ville': 'ville',
  'urban': 'ville',
  'street': 'ville',
  'streets': 'ville',
  'architecture': 'ville',
  'cityscape': 'ville',
  'cityscapes': 'ville',
  'travel': 'ville',
  'voyage': 'ville',
  'voyages': 'ville'
}

/**
 * Convertit un tag en slug de catégorie s'il existe
 * @param {string} tag - Le tag à convertir
 * @returns {string|null} - Le slug de la catégorie ou null si pas de correspondance
 */
export function getSlugFromTag(tag) {
  return tagToCategoryMap[tag.toLowerCase()] || null
}

/**
 * Vérifie si un tag correspond à une catégorie
 * @param {string} tag - Le tag à vérifier
 * @returns {boolean} - true si le tag correspond à une catégorie
 */
export function isTagACategory(tag) {
  return getSlugFromTag(tag) !== null
}
