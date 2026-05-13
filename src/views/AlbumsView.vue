<template>
  <section class="projects">
    <div class="container">
      <h1 class="section-title">Mes <span class="accent">Photos</span></h1>
      <p class="projects__sub">Une sélection de mes dernières photographies.</p>

      <div class="projects__grid">
        <article
          v-for="album in albums"
          :key="album.id"
          class="project-card"
        >
          <div class="project-card__header">
            <div class="project-card__tags">
              <span v-for="tag in album.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
          <h2 class="project-card__title">{{ album.title }}</h2>
          <p class="project-card__desc">{{ album.description }}</p>
          <div class="project-card__links">
            <a v-if="album.demo" :href="album.demo" target="_blank" rel="noopener">
              Demo →
            </a>
            <a v-if="album.github" :href="album.github" target="_blank" rel="noopener">
              GitHub →
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const albums = [
  {
    id: 1,
    title: 'Voyage dans les Pyrénées',
    description: 'Photographies prises lors d\'un voyage dans les Pyrénées.',
    tags: ['Mountain', 'Nature', 'Travel'],
    imagePath: '/assets/photos/pyrenees.jpg'
  },
  {
    id: 2,
    title: 'Shooting de cosplays',
    description: 'Photographies prises lors d\'un shooting de cosplays au domaine de Cangé.',
    tags: ['Cosplay', 'Portraits', 'Event'],
    imagePath: '/assets/photos/cosplay.jpg'
  },
  {
    id: 3,
    title: 'Projet personnel',
    description: 'Un projet side qui montre ta curiosité et ta capacité à apprendre de nouvelles choses.',
    tags: ['Python', 'FastAPI'],
    imagePath: '/assets/photos/personal.jpg'
  }
]
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
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5px;
  border: 1.5px solid var(--color-border);
}

.project-card {
  padding: 2rem;
  border: 1.5px solid var(--color-border);
  margin: -1.5px;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.project-card:hover {
  background: var(--color-surface);
}

.project-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
  line-height: 2.5rem;
}

.project-card__desc {
  color: var(--color-muted);
  font-size: 0.95rem;
  flex: 1;
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
</style>
