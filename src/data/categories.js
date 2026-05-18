// Charger les photos de chaque dossier de catégorie
const animauxPhotos = import.meta.glob('@/assets/photos/animaux/*.{jpg,jpeg,png,gif}', { eager: true })
const montagnePhotos = import.meta.glob('@/assets/photos/montagne/*.{jpg,jpeg,png,gif}', { eager: true })
const fleurPhotos = import.meta.glob('@/assets/photos/fleur/*.{jpg,jpeg,png,gif}', { eager: true })
const personnesPhotos = import.meta.glob('@/assets/photos/personnes/*.{jpg,jpeg,png,gif}', { eager: true })
const villePhotos = import.meta.glob('@/assets/photos/ville/*.{jpg,jpeg,png,gif}', { eager: true })

// Convertir les modules en tableaux et trier par nom de fichier
const getPhotosArray = (globModule) => {
  return Object.entries(globModule)
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
    .map(([, module]) => module.default)
}

const animauxArray = getPhotosArray(animauxPhotos)
const montagneArray = getPhotosArray(montagnePhotos)
const fleurArray = getPhotosArray(fleurPhotos)
const personnesArray = getPhotosArray(personnesPhotos)
const villeArray = getPhotosArray(villePhotos)

export const categories = [
  {
    id: 1,
    slug: 'animaux',
    name: 'Animaux',
    photos: animauxArray,
    coverImage: animauxArray[0] || ''
  },
  {
    id: 2,
    slug: 'montagne',
    name: 'Montagne',
    photos: montagneArray,
    coverImage: montagneArray[0] || ''
  },
  {
    id: 3,
    slug: 'fleur',
    name: 'Fleur',
    photos: fleurArray,
    coverImage: fleurArray[0] || ''
  },
  {
    id: 4,
    slug: 'personnes',
    name: 'Personnes',
    photos: personnesArray,
    coverImage: personnesArray[0] || ''
  },
  {
    id: 5,
    slug: 'ville',
    name: 'Ville',
    photos: villeArray,
    coverImage: villeArray[0] || ''
  }
]

export const getCategoryBySlug = (slug) => {
  return categories.find(cat => cat.slug === slug)
}

export const getCategoryById = (id) => {
  return categories.find(cat => cat.id === id)
}
