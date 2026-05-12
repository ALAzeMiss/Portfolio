<template>
  <section class="about">
    <div class="container about__inner">
      <div class="about__text">
        <h1 class="section-title">À <span class="accent">propos</span></h1>
        <p>
          Remplace ce texte par ta présentation. Qui tu es, d'où tu viens,
          ce qui te passionne dans le développement. Sois authentique.
        </p>
        <p>
          Tu peux parler de ton parcours, de ta façon de travailler,
          de ce qui te rend unique en tant que développeur.
        </p>
        <RouterLink to="/contact" class="about__cta">
          Travaillons ensemble →
        </RouterLink>
      </div>

      <div class="about__skills">
        <div v-for="category in skillCategories" :key="category.name" class="skill-group">
          <h3 class="skill-group__title">{{ category.name }}</h3>
          <div class="skill-group__list">
            <span v-for="skill in category.skills" :key="skill" class="tag">{{ skill }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// ✏️  Adapte ces compétences aux tiennes
const skillCategories = [
  {
    name: 'Frontend',
    skills: ['Vue.js', 'HTML/CSS', 'JavaScript', 'TypeScript']
  },
  {
    name: 'Backend',
    skills: ['Python', 'FastAPI', 'Node.js', 'PostgreSQL']
  },
  {
    name: 'DevOps & Outils',
    skills: ['Docker', 'Git', 'Linux', 'CI/CD']
  }
]
</script>

<style scoped>
.about {
  padding: calc(var(--spacing-xl) + 4rem) 0 var(--spacing-xl);
}

.about__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-lg);
  align-items: start;
}

.about__text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.about__text p {
  color: var(--color-muted);
  line-height: 1.8;
}

.about__cta {
  display: inline-block;
  color: var(--color-accent);
  font-weight: 500;
  transition: var(--transition);
}
.about__cta:hover { opacity: 0.7; }

.about__skills {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
}

.skill-group__title {
  font-family: var(--font-display);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  margin-bottom: 0.75rem;
}

.skill-group__list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .about__inner { grid-template-columns: 1fr; }
}
</style>
