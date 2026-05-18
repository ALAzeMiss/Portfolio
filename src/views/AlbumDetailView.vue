<template>
  <section class="album-detail">
    <div class="container">
      <div class="album-detail__header">
        <button @click="goBack" class="back-btn">
          <span class="back-btn__arrow">←</span>
          <span class="back-btn__text">Retour</span>
        </button>
        <h1 class="section-title">{{ album?.title }}</h1>
      </div>

      <div class="album-detail__content">
        <!-- Galerie -->
        <div class="gallery">
          <!-- Affichage grand format avec flèches -->
          <div class="gallery__viewer-wrapper">
            <button 
              v-if="album && album.photos.length > 1"
              @click="prevPhoto" 
              class="gallery__nav-btn gallery__nav-btn--prev"
            >
              ←
            </button>

            <div v-if="album && album.photos.length > 0" class="gallery__viewer">
              <img 
                :key="selectedPhotoIndex"
                :src="album.photos[selectedPhotoIndex]" 
                :alt="`${album.title} - Photo ${selectedPhotoIndex + 1}`"
                class="gallery__image"
              />
              <div class="gallery__info">
                <span class="gallery__counter">{{ selectedPhotoIndex + 1 }} / {{ album.photos.length }}</span>
              </div>
            </div>

            <button 
              v-if="album && album.photos.length > 1"
              @click="nextPhoto" 
              class="gallery__nav-btn gallery__nav-btn--next"
            >
              →
            </button>
          </div>

          <!-- Grille de photos -->
          <div class="gallery__grid">
            <button
              v-for="(photo, index) in album?.photos"
              :key="index"
              @click="selectedPhotoIndex = index"
              :class="{ active: index === selectedPhotoIndex }"
              class="gallery__item"
            >
              <img :src="photo" :alt="`Photo ${index + 1}`" />
            </button>
          </div>
        </div>

        <!-- Infos de l'album -->
        <div class="album-info">
          <div class="album-info__tags">
            <button 
              v-for="tag in album?.tags" 
              :key="tag" 
              @click="handleTagClick(tag)"
              :class="{ clickable: isTagACategory(tag) }"
              class="tag"
            >
              {{ tag }}
            </button>
          </div>
          <p class="album-info__description">{{ album?.description }}</p>
          <div class="album-info__text">
            <h3>À propos</h3>
            <p>{{ album?.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getSlugFromTag, isTagACategory } from '@/utils/tagMapping'

const router = useRouter()
const route = useRoute()
const selectedPhotoIndex = ref(0)

// Charger les photos de chaque dossier d'album
const pyreneePhotos = import.meta.glob('@/assets/photos/pyrenees/*.{jpg,jpeg,png,gif}', { eager: true })
const cosplayPhotos = import.meta.glob('@/assets/photos/cosplay/*.{jpg,jpeg,png,gif}', { eager: true })
const personalPhotos = import.meta.glob('@/assets/photos/personal/*.{jpg,jpeg,png,gif}', { eager: true })

// Convertir les modules en tableaux et trier par nom de fichier
const getPhotosArray = (globModule) => {
  return Object.entries(globModule)
    .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
    .map(([, module]) => module.default)
}

const pyreneePhotosArray = getPhotosArray(pyreneePhotos)
const cosplayPhotosArray = getPhotosArray(cosplayPhotos)
const personalPhotosArray = getPhotosArray(personalPhotos)

const albums = [
  {
    id: 1,
    title: 'Voyage dans les Pyrénées',
    description: 'Photographies prises lors d\'un voyage dans les Pyrénées.',
    tags: ['Mountain', 'Nature', 'Travel'],
    photos: pyreneePhotosArray,
    imagePath: pyreneePhotosArray[0] || '',
    text: 'À compléter avec vos impressions du voyage...'
  },
  {
    id: 2,
    title: 'Shooting de cosplays',
    description: 'Photographies prises lors d\'un shooting de cosplays au domaine de Cangé.',
    tags: ['Cosplay', 'Portraits', 'Event'],
    photos: cosplayPhotosArray,
    imagePath: cosplayPhotosArray[0] || '',
    text: 'À compléter avec vos impressions du shooting...'
  },
  {
    id: 3,
    title: 'Projet personnel',
    description: 'Un projet side qui montre ta curiosité et ta capacité à apprendre de nouvelles choses.',
    tags: ['Python', 'FastAPI'],
    photos: personalPhotosArray,
    imagePath: personalPhotosArray[0] || '',
    text: 'À compléter avec la description de votre projet...'
  }
]

const album = computed(() => {
  const id = parseInt(route.params.id)
  return albums.find(a => a.id === id)
})

const nextPhoto = () => {
  if (album.value && selectedPhotoIndex.value < album.value.photos.length - 1) {
    selectedPhotoIndex.value++
  }
}

const prevPhoto = () => {
  if (selectedPhotoIndex.value > 0) {
    selectedPhotoIndex.value--
  }
}

const goBack = () => {
  router.back()
}

const handleTagClick = (tag) => {
  const slug = getSlugFromTag(tag)
  if (slug) {
    router.push({ name: 'category-detail', params: { slug } })
  }
}

onMounted(() => {
  selectedPhotoIndex.value = 0
})
</script>

<style scoped>
.album-detail {
  padding: calc(var(--spacinglgl) + 4rem) 0 var(--spacing-xl);
}

.album-detail__header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: 1.5px solid var(--color-border);
  padding: 0.75rem 1.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: var(--transition);
  color: var(--color-text);
  font-size: 0.95rem;
  font-weight: 600;
}

.back-btn:hover {
  background: var(--color-surface);
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.back-btn__arrow {
  font-size: 1.2rem;
}

.album-detail__content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Gallery */
.gallery {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.gallery__viewer-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.gallery__viewer {
  flex: 1;
  width: 100%;
  overflow: hidden;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 600px;
  position: relative;
}

.gallery__image {
  max-width: 100%;
  max-height: 600px;
  height: auto;
  object-fit: contain;
  animation: slideIn 0.5s ease-in-out;
}

.gallery__info {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.85rem;
  font-weight: 600;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.gallery__nav-btn {
  background: none;
  border: 1.5px solid var(--color-border);
  width: 40px;
  height: 40px;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  color: var(--color-text);
  flex-shrink: 0;
}

.gallery__nav-btn:hover {
  background: var(--color-surface);
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.75rem;
}

.gallery__item {
  background: none;
  border: 1.5px solid var(--color-border);
  padding: 0;
  cursor: pointer;
  transition: var(--transition);
  overflow: hidden;
  height: 100px;
  aspect-ratio: 1;
}

.gallery__item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery__item:hover {
  border-color: var(--color-accent);
}

.gallery__item.active {
  border-color: var(--color-accent);
  border-width: 2px;
}

/* Album Info */
.album-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.album-info__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.album-info__description {
  color: var(--color-muted);
  line-height: 1.6;
}

.album-info__text {
  border-top: 1.5px solid var(--color-border);
  padding-top: 1.5rem;
}

.album-info__text h3 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.album-info__text p {
  color: var(--color-muted);
  line-height: 1.6;
}

@media (max-width: 640px) {
  .album-detail__header {
    flex-direction: column;
    align-items: flex-start;
  }

  .carousel__wrapper {
    gap: 0.5rem;
  }

  .carousel__btn-side {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .carousel__thumbnails {
    justify-content: flex-start;
  }
}
</style>
