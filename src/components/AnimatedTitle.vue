<template>
  <h1 class="animated-title">
    <span 
      v-for="(letter, index) in letters" 
      :key="index"
      class="letter"
      :style="{ '--letter-delay': `${index * 0.05}s` }"
    >
      {{ letter }}
    </span>
  </h1>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const letters = computed(() => {
  return props.text.split('')
})
</script>

<style scoped>
.animated-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0;
  overflow: visible;
  text-rendering: geometricPrecision;
  margin: 0;
  padding: 0;
  display: inline-block;
}

.letter {
  display: inline-block;
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-origin: center;
}

.animated-title:hover .letter {
  animation: growLetter 0.5s ease-out forwards;
  animation-delay: var(--letter-delay);
}

@keyframes growLetter {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
