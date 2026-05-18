<template>
  <section class="projects">
    <div class="container">
      <h1 class="section-title">Mes <span class="accent">Albums</span></h1>
      <p class="projects__sub">Explorez mes photos par catégorie.</p>

      <div class="projects__grid">
        <article
          v-for="category in categoriesWithImages"
          :key="category.id"
          class="project-card"
          @click="goToCategory(category.slug)"
        >
          <div class="project-card__image-wrapper">
            <img 
              v-if="category.coverImage"
              :src="category.coverImage" 
              :alt="category.name"
              class="project-card__preview"
            />
            <div class="project-card__overlay">
              <span class="project-card__overlay-text">Voir les photos</span>
            </div>
          </div>
          
          <h2 class="project-card__title">{{ category.name }}</h2>
          <p class="project-card__desc">{{ category.photos.length }} photo(s)</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import { categories } from '@/data/categories'

const router = useRouter()

const categoriesWithImages = computed(() => {
  return categories.filter(cat => cat.coverImage && cat.photos.length > 0)
})

const goToCategory = (slug) => {
  router.push({ name: 'category-detail', params: { slug } })
}
</script>

<style scoped>
.projects {
  padding: calc(var(--spacing-xl) + 4rem) 0 var(--spacing-xl);
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
  padding: 0 1.5rem 1.5rem 1.5rem;
}

@media (max-width: 1024px) {
  .projects__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .projects__grid {
    grid-template-columns: 1fr;
  }
}
</style>
