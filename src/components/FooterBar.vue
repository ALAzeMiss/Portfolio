<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p class="footer__copy">© {{ year }} Amandine LANGLAIS — Fait avec Vue.js</p>
      <div class="footer__links">
        <a href="https://github.com/ALAzeMiss" target="_blank" rel="noopener">GitHub</a>
        <a href="https://linkedin.com/" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://www.instagram.com/tarto_photo/" target="_blank" rel="noopener">Instagram</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  padding: 2rem 0;
  margin-top: var(--spacing-xl);
}

.footer__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer__copy {
  color: var(--color-muted);
  font-size: 0.85rem;
}

.footer__links {
  display: flex;
  gap: 1.5rem;
}

.footer__links a {
  color: var(--color-muted);
  font-size: 0.85rem;
  transition: var(--transition);
}

.footer__links a:hover {
  color: var(--color-accent);
}
</style>
