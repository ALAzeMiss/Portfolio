<template>
  <section class="hero">
    <div class="container hero__inner">
      <div class="hero__label">
        <span class="accent">●</span> Disponible pour de nouveaux projets
      </div>
      <h1 class="hero__title section-title">
        <span class="accent">Photographe<br /></span>
        Tout genre<br />
        <span class="accent2">&</span><br />
        <span class="accent"> Ingénieure</span> 
        informatique
      </h1>
      <p class="hero__desc">
        Je suis apprentie ingénieure informatique et photographe. 
        Je suis tout autant passionnée par la photographie que par la technologie.
      </p>
      <div class="hero__actions">
        <RouterLink to="/photos" class="btn btn--primary">Mes photos</RouterLink>
        <RouterLink to="/projects" class="btn btn--ghost">Mes projets</RouterLink>
      </div>
      <div class="hero__tags">
        <span class="tag">Vue.js</span>
        <span class="tag">Python</span>
        <span class="tag">Node.js</span>
        <span class="tag">PostgreSQL</span>
        <span class="tag">Docker</span>
      </div>
    </div>

    <div class="hero__scroll">
      <span>Scroll</span>
      <div class="hero__scroll-line"></div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 6rem;
  position: relative;
}

.hero__inner {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 720px;
}

.hero__label {
  font-size: 0.85rem;
  color: var(--color-muted);
  letter-spacing: 0.05em;
}

.hero__title {
  animation: slideUp 0.8s ease both;
}

.hero__desc {
  color: var(--color-muted);
  font-size: 1.1rem;
  max-width: 480px;
  line-height: 1.7;
  animation: slideUp 0.8s 0.1s ease both;
}

.hero__actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  animation: slideUp 0.8s 0.2s ease both;
}

.btn {
  display: inline-block;
  padding: 0.8rem 1.8rem;
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  border: 1px solid transparent;
}

.btn--primary {
  background: var(--color-accent);
  color: #000;
  font-weight: 700;
}
.btn--primary:hover { opacity: 0.85; transform: translateY(-2px); }

.btn--ghost {
  border-color: var(--color-border);
  color: var(--color-text);
}
.btn--ghost:hover { border-color: var(--color-contrast); transform: translateY(-2px); }

.hero__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  animation: slideUp 0.8s 0.3s ease both;
}

.hero__scroll {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-muted);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.hero__scroll-line {
  width: 1px;
  height: 60px;
  background: linear-gradient(to bottom, var(--color-muted), transparent);
  animation: scrollLine 1.5s ease infinite;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes scrollLine {
  0%   { transform: scaleY(0); transform-origin: top; }
  50%  { transform: scaleY(1); transform-origin: top; }
  100% { transform: scaleY(1); opacity: 0; }
}
</style>
