<template>
  <header class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container navbar__inner">
      <RouterLink to="/" class="navbar__logo">
        <span class="accent">●</span> Amandine LANGLAIS
      </RouterLink>

      <nav class="navbar__links" :class="{ open: menuOpen }">
        <RouterLink to="/" @click="menuOpen = false">Accueil</RouterLink>
        <RouterLink to="/photos" @click="menuOpen = false">Nouveautés</RouterLink>
        <RouterLink to="/albums" @click="menuOpen = false">Albums</RouterLink>
        <RouterLink to="/projects" @click="menuOpen = false">Projets</RouterLink>
        <RouterLink to="/about" @click="menuOpen = false">À propos</RouterLink>
      </nav>

      <button class="navbar__burger" @click="menuOpen = !menuOpen" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const menuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0.5rem 0;
  transition: var(--transition);
}

.navbar.scrolled {
  background: rgba(13, 13, 13, 0.9);
  backdrop-filter: blur(12px);
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__logo {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.4rem;
  letter-spacing: -0.01em;
  transition: var(--transition);
}
.navbar__logo:hover { opacity: 0.75; color: var(--color-contrast); }

.navbar__links {
  display: flex;
  gap: 2.5rem;
}

.navbar__links a {
  font-size: 0.9rem;
  color: var(--color-muted);
  transition: var(--transition);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 1rem;
}

.navbar__links a:hover,
.navbar__links a.router-link-active {
  color: var(--color-contrast);
}

.navbar__links a.router-link-exact-active {
  color: var(--color-accent);
}

.navbar__burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.navbar__burger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text);
  transition: var(--transition);
}

@media (max-width: 640px) {
  .navbar__burger { display: flex; }

  .navbar__links {
    display: none;
    position: fixed;
    inset: 0;
    background: var(--color-bg);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
  }

  .navbar__links.open { display: flex; }

  .navbar__links a {
    font-size: 1.5rem;
    color: var(--color-text);
  }
}
</style>
