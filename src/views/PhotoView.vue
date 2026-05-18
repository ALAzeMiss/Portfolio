<template>
  <section class="projects">
    <div class="container">
      <h1 class="section-title">Les <span class="accent">Nouveautés</span></h1>
      <p class="projects__sub">Une sélection de mes dernières photographies.</p>

      <div class="projects__grid">
        <article
          v-for="album in albums"
          :key="album.id"
          class="project-card"
          @click="goToAlbum(album.id)"
        >
          <div class="project-card__image-wrapper">
            <img 
              :src="album.imagePath" 
              :alt="album.title"
              class="project-card__preview"
            />
            <div class="project-card__overlay">
              <span class="project-card__overlay-text">Voir les photos</span>
            </div>
          </div>
          
          <div class="project-card__header">
            <div class="project-card__tags">
              <button 
                v-for="tag in album.tags" 
                :key="tag" 
                @click.stop="handleTagClick(tag)"
                :class="{ clickable: isTagACategory(tag) }"
                class="tag"
              >
                {{ tag }}
              </button>
            </div>
          </div>
          <h2 class="project-card__title">{{ album.title }}</h2>
          <p class="project-card__desc">{{ album.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { getSlugFromTag, isTagACategory } from '@/utils/tagMapping'

const router = useRouter()

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

const allAlbums = [
  {
    id: 1,
    title: 'Voyage dans les Pyrénées',
    description: 'Photographies prises lors d\'un voyage dans les Pyrénées.',
    tags: ['Montagne', 'Animaux', 'Travel'],
    photos: pyreneePhotosArray,
    imagePath: pyreneePhotosArray[0] || '',
    text: 'À compléter avec vos impressions du voyage...'
  },
  {
    id: 2,
    title: 'Shooting de cosplays',
    description: 'Photographies prises lors d\'un shooting de cosplays au domaine de Cangé.',
    tags: ['Cosplay', 'Portraits', 'Personnes'],
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

// Filtrer les albums qui ont une image de preview
const albums = computed(() => {
  return allAlbums.filter(album => album.imagePath && album.imagePath.length > 0)
})

const goToAlbum = (albumId) => {
  router.push({ name: 'album-detail', params: { id: albumId } })
}

const handleTagClick = (tag) => {
  const slug = getSlugFromTag(tag)
  if (slug) {
    router.push({ name: 'category-detail', params: { slug } })
  }
}
</script>

<style scoped>
.projects {
  padding: calc(var(--spacing-lg) + 4rem) 0 var(--spacing-xl);
}

.projects__sub {
  color: var(--color-muted);
  margin-top: 1rem;
  margin-bottom: var(--spacing-lg);
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5px;
  border: 1.5px solid var(--color-border);
}

.project-card {
  border: 1.5px solid var(--color-border);
  margin: -1.5px;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: pointer;
  overflow: hidden;
  padding: 0;
}

.project-card__image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  background: var(--color-surface);
}

.project-card__preview {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.project-card__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition);
}

.project-card:hover .project-card__overlay {
  opacity: 1;
}

.project-card__overlay-text {
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
}

.project-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 1.5rem 0 1.5rem;
}

.project-card__number {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-border);
  line-height: 1;
}

.project-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  justify-content: flex-end;
}

.project-card__title {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.2;
  padding: 0 1.5rem;
}

.project-card__desc {
  color: var(--color-muted);
  font-size: 0.95rem;
  flex: 1;
  padding: 0 1.5rem 1.5rem 1.5rem;
}

.project-card__links {
  display: flex;
  gap: 1.5rem;
}

.project-card__links a {
  font-size: 0.85rem;
  color: var(--color-muted);
  transition: var(--transition);
}

.project-card__links a:hover {
  color: var(--color-accent);
}

@media (max-width: 1024px) {
  .projects__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .projects {
    padding: 2rem 0 1.5rem;
  }

  .projects__sub {
    margin-bottom: 1.5rem;
    font-size: 0.95rem;
  }

  .project-card__title {
    font-size: 1.2rem;
    padding: 0 1.2rem;
  }

  .project-card__desc {
    font-size: 0.9rem;
    padding: 0 1.2rem 1.2rem 1.2rem;
  }
}

@media (max-width: 640px) {
  .projects {
    padding: 1.5rem 0 1rem;
  }

  .projects__sub {
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }

  .projects__grid {
    grid-template-columns: 1fr;
    gap: 1px;
    border-width: 1px;
  }

  .project-card {
    border-width: 1px;
    margin: -1px;
    gap: 0.75rem;
  }

  .project-card__title {
    font-size: 1.1rem;
    padding: 0 1rem;
  }

  .project-card__desc {
    font-size: 0.85rem;
    padding: 0 1rem 1rem 1rem;
  }

  .project-card__overlay-text {
    font-size: 1rem;
  }

  .project-card__tags {
    gap: 0.25rem;
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .projects {
  padding: var(--spacing-xl) 0 var(--spacing-xl);
}

  .projects__sub {
    margin-top: 0.5rem;
    margin-bottom: 0.75rem;
  }

  .project-card {
    gap: 0.5rem;
  }

  .project-card__title {
    font-size: 1rem;
    padding: 0 0.8rem;
  }

  .project-card__desc {
    font-size: 0.8rem;
    padding: 0 0.8rem 0.8rem 0.8rem;
  }

  .project-card__tags {
    gap: 0.2rem;
    padding: 0 0.8rem;
  }

  .tag {
    padding: 0.2rem 0.5rem;
    font-size: 0.7rem;
  }
}
</style>
