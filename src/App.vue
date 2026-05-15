<template>
  <div id="app">
    <NavBar />
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <FooterBar />
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Chonburi&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Lexend+Tera:wght@100..900&display=swap');

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
