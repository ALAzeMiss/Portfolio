<template>
  <section class="category-detail">
    <div class="container">
      <div class="category-detail__header">
        <button @click="goBack" class="back-btn">
          <span class="back-btn__arrow">←</span>
          <span class="back-btn__text">Retour</span>
        </button>
        <h1 class="section-title">{{ category?.name }}</h1>
      </div>

      <div class="category-detail__content">
        <!-- Grille de photos simple -->
        <div class="photo-grid">
          <article
            v-for="(photo, index) in category?.photos"
            :key="index"
            class="photo-card"
            @click="openPhotoModal(index)"
          >
            <div class="photo-card__image-wrapper">
              <img 
                :src="photo" 
                :alt="`${category.name} - Photo ${index + 1}`"
                class="photo-card__image"
              />
              <div class="photo-card__overlay">
                <span class="photo-card__overlay-text">Voir en détail</span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- Modal plein écran -->
    <div 
      v-if="selectedPhotoIndex !== null" 
      class="photo-modal"
      :class="{ closing: isClosing }"
      @click.self="closePhotoModal"
    >
      <button class="photo-modal__close" @click="closePhotoModal">✕</button>
      <div class="photo-modal__container">
        <img 
          :src="category?.photos[selectedPhotoIndex]" 
          :alt="`${category?.name} - Photo ${selectedPhotoIndex + 1}`"
          class="photo-modal__image"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getCategoryBySlug } from '@/data/categories'
import { getSlugFromTag, isTagACategory } from '@/utils/tagMapping'

const router = useRouter()
const route = useRoute()
const selectedPhotoIndex = ref(null)
const isClosing = ref(false)

const category = computed(() => {
  return getCategoryBySlug(route.params.slug)
})

const goBack = () => {
  router.back()
}

const openPhotoModal = (index) => {
  selectedPhotoIndex.value = index
  isClosing.value = false
}

const closePhotoModal = () => {
  isClosing.value = true
  setTimeout(() => {
    selectedPhotoIndex.value = null
    isClosing.value = false
  }, 300)
}

const goToCategory = (tag) => {
  const slug = getSlugFromTag(tag)
  if (slug) {
    router.push({ name: 'category-detail', params: { slug } })
  }
}
</script>

<style scoped>
.category-detail {
  padding: calc(var(--spacing-lg) + 4rem) 0 var(--spacing-xl);
}

.category-detail__header {
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

.category-detail__content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Photo Grid */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.photo-card {
  cursor: pointer;
}

.photo-card__image-wrapper {
  position: relative;
  overflow: hidden;
  aspect-ratio: 1;
  background: var(--color-surface);
  border-radius: 0.25rem;
}

.photo-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.photo-card__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition);
}

.photo-card:hover .photo-card__image {
  transform: scale(1.05);
}

.photo-card:hover .photo-card__overlay {
  opacity: 1;
}

.photo-card__overlay-text {
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
}

/* Media Queries */
@media (max-width: 1024px) {
  .photo-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }
}

@media (max-width: 768px) {
  .category-detail {
    padding: 2rem 0 1.5rem;
  }

  .category-detail__header {
    margin-bottom: 1.5rem;
    gap: 0.75rem;
  }

  .back-btn {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
  }

  .back-btn__arrow {
    font-size: 1rem;
  }

  .category-detail__content {
    gap: 1.5rem;
  }

  .photo-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 640px) {
  .category-detail {
    padding: 1.5rem 0 1rem;
  }

  .category-detail__header {
    margin-bottom: 1.2rem;
    gap: 0.5rem;
  }

  .back-btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  .back-btn__text {
    display: none;
  }

  .category-detail__content {
    gap: 1rem;
  }

  .photo-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .photo-card__overlay-text {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .category-detail {
    padding: 1rem 0 0.75rem;
  }

  .category-detail__header {
    margin-bottom: 1rem;
  }

  .back-btn {
    padding: 0.4rem 0.8rem;
    border: 1px solid var(--color-border);
  }

  .photo-grid {
    gap: 0.5rem;
  }
}

/* Photo Modal */
.photo-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out forwards;
  padding: 1rem;
  overflow: hidden;
}

.photo-modal.closing {
  animation: fadeOut 0.3s ease-in-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.photo-modal__container {
  position: relative;
  width: 90%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-modal__image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  animation: slideIn 0.3s ease-in-out;
}

.photo-modal__close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(113, 66, 191, 0.2);
  border: 1.5px solid var(--color-accent);
  color: var(--color-accent);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  z-index: 1001;
  flex-shrink: 0;
}

.photo-modal__close:hover {
  background: rgba(113, 66, 191, 0.4);
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .photo-modal {
    padding: 0.75rem;
  }

  .photo-modal__close {
    top: 1.5rem;
    right: 1.5rem;
    width: 45px;
    height: 45px;
    font-size: 1.2rem;
  }

  .photo-modal__container {
    width: 95%;
    height: 85%;
  }
}

@media (max-width: 640px) {
  .photo-modal {
    padding: 0.5rem;
  }

  .photo-modal__close {
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
    border: 1px solid var(--color-accent);
  }

  .photo-modal__container {
    width: 100%;
    height: 90%;
  }
}

@media (max-width: 480px) {
  .photo-modal__close {
    top: 0.75rem;
    right: 0.75rem;
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }

  .photo-modal__container {
    height: 80vh;
  }
}
</style>
