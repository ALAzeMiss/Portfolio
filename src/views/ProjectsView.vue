<template>
  <section class="projects">
    <div class="container">
      <h1 class="section-title">Mes <span class="accent">Projets</span></h1>
      <p class="projects__sub">Une sélection de ce sur quoi j'ai travaillé.</p>

      <div class="projects__grid">
        <article
          v-for="project in projects"
          :key="project.id"
          class="project-card"
        >
          <div class="project-card__header">
            <span class="project-card__number">{{ String(project.id).padStart(2, '0') }}</span>
            <div class="project-card__tags">
              <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
          <h2 class="project-card__title">{{ project.title }}</h2>
          <p class="project-card__desc">{{ project.description }}</p>
          <div class="project-card__links">
            <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener">
              Demo →
            </a>
            <a v-if="project.github" :href="project.github" target="_blank" rel="noopener">
              GitHub →
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
// ✏️  Remplace ces projets par les tiens
const projects = [
  {
    id: 1,
    title: 'Astrobot',
    description: 'Développement d\'un bot discord pour s\'amuser en capturant des pokémons virtuels dans le serveur.',
    tags: ['Python'],
    github: 'https://github.com/Shunikai972/Astro-discord-bot'
  },
  {
    id: 2,
    title: 'Mon Portofolio',
    description: 'Ce site que tu es en train de visiter ! Construit avec Vue.js et Vite pour présenter mes projets et compétences.',
    tags: ['Vue.js', 'Vite'],
    github: 'https://github.com/ALAzeMiss/Portfolio'
  },
  {
    id: 3,
    title: 'Projet personnel',
    description: 'Un projet side qui montre ta curiosité et ta capacité à apprendre de nouvelles choses.',
    tags: ['Python', 'FastAPI'],
    demo: 'https://example.com',
    github: 'https://github.com/'
  }
]
</script>

<style scoped>
.projects {
  padding: var(--spacing-xl) 0 var(--spacing-xl);
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
