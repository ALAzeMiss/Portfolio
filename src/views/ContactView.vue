<template>
  <section class="contact">
    <div class="container contact__inner">
      <h1 class="section-title">Dis <span class="accent">bonjour</span></h1>
      <p class="contact__sub">
        Tu as un projet, une idée, ou juste envie de discuter ?
        Je suis toujours ouvert à de nouvelles opportunités.
      </p>

      <div class="contact__grid">
        <div class="contact__info">
          <a href="mailto:toi@email.com" class="contact__email">
            toi@email.com
          </a>
          <div class="contact__socials">
            <a href="https://github.com/" target="_blank" rel="noopener">GitHub</a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener">LinkedIn</a>
            <a href="https://twitter.com/" target="_blank" rel="noopener">Twitter</a>
          </div>
        </div>

        <!-- Formulaire simple (côté client uniquement) -->
        <div class="contact__form">
          <div class="form-group">
            <label for="name">Nom</label>
            <input id="name" v-model="form.name" type="text" placeholder="Jean Dupont" />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" v-model="form.email" type="email" placeholder="jean@email.com" />
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" v-model="form.message" rows="5" placeholder="Ton message..."></textarea>
          </div>
          <!-- 
            ✏️  Pour envoyer des emails, connecte un service comme:
            - EmailJS (gratuit, côté client)
            - Formspree (gratuit)
            - Resend (si tu veux un backend)
          -->
          <button class="btn btn--primary" @click="handleSubmit">
            {{ sending ? 'Envoi...' : 'Envoyer →' }}
          </button>
          <p v-if="sent" class="contact__success">Message envoyé ! Je te réponds rapidement.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({ name: '', email: '', message: '' })
const sending = ref(false)
const sent = ref(false)

const handleSubmit = async () => {
  // ✏️  Remplace ceci par ton service d'envoi d'email (EmailJS, Formspree, etc.)
  sending.value = true
  await new Promise(r => setTimeout(r, 1000)) // simulation
  sending.value = false
  sent.value = true
  form.value = { name: '', email: '', message: '' }
}
</script>

<style scoped>
.contact {
  padding: calc(var(--spacing-xl) + 4rem) 0 var(--spacing-xl);
}

.contact__sub {
  color: var(--color-muted);
  margin-top: 1rem;
  margin-bottom: var(--spacing-lg);
  max-width: 480px;
}

.contact__grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--spacing-lg);
}

.contact__email {
  display: block;
  font-family: var(--font-display);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-accent);
  margin-bottom: 2rem;
  transition: var(--transition);
}
.contact__email:hover { opacity: 0.7; }

.contact__socials {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.contact__socials a {
  color: var(--color-muted);
  font-size: 0.9rem;
  transition: var(--transition);
}
.contact__socials a:hover { color: var(--color-text); }

.contact__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.8rem;
  color: var(--color-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.form-group input,
.form-group textarea {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: 0.95rem;
  transition: var(--transition);
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-accent);
}

.btn--primary {
  background: var(--color-accent);
  color: #000;
  border: none;
  padding: 0.9rem 2rem;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: var(--radius);
  cursor: pointer;
  align-self: flex-start;
  transition: var(--transition);
}
.btn--primary:hover { opacity: 0.85; transform: translateY(-2px); }

.contact__success {
  color: var(--color-accent);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .contact__grid { grid-template-columns: 1fr; }
}
</style>
