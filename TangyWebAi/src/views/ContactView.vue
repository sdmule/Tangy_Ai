<script setup lang="ts">
import { ref } from 'vue'
import { Check, Clock3, Mail, MapPin, Phone, Send } from 'lucide-vue-next'

const submitted = ref(false)
const form = ref({ name: '', email: '', message: '' })

function submitMessage() {
  submitted.value = true
  form.value = { name: '', email: '', message: '' }
}
</script>

<template>
  <main>
    <section class="theme-hero theme-border border-b">
      <div class="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <p class="theme-accent mb-3 text-sm font-bold uppercase tracking-[0.25em]">
          Come say hello
        </p>
        <h1 class="theme-heading max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
          We would love to hear from you.
        </h1>
        <p class="theme-body mt-6 max-w-xl text-lg leading-8">
          Questions about the menu, a special gathering, or just want to say hi? Send us a note and
          we will get back to you soon.
        </p>
      </div>
    </section>

    <section
      class="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-16"
    >
      <div>
        <p class="theme-accent text-sm font-bold uppercase tracking-[0.2em]">Find Tangy</p>
        <h2 class="theme-heading mt-2 text-3xl font-bold">Make yourself at home.</h2>
        <p class="theme-body mt-5 max-w-md leading-7">
          Our tables are ready for long lunches, easy dinners, and everything worth celebrating.
        </p>

        <div class="mt-8 space-y-5">
          <a
            class="theme-body flex items-start gap-3 transition hover:text-[var(--accent)]"
            href="https://maps.google.com/?q=123+Main+Street"
            target="_blank"
            rel="noreferrer"
          >
            <MapPin class="theme-accent mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <span>123 Main Street<br />Your City, ST 00000</span>
          </a>
          <a
            class="theme-body flex items-center gap-3 transition hover:text-[var(--accent)]"
            href="tel:+15551234567"
          >
            <Phone class="theme-accent h-5 w-5 shrink-0" aria-hidden="true" />
            <span>(555) 123-4567</span>
          </a>
          <a
            class="theme-body flex items-center gap-3 transition hover:text-[var(--accent)]"
            href="mailto:hello@tangyrestaurant.com"
          >
            <Mail class="theme-accent h-5 w-5 shrink-0" aria-hidden="true" />
            <span>hello@tangyrestaurant.com</span>
          </a>
        </div>

        <div class="theme-surface theme-border mt-9 rounded-2xl border p-5">
          <div class="flex items-center gap-3">
            <Clock3 class="theme-accent h-5 w-5" aria-hidden="true" />
            <h3 class="theme-heading font-bold">Hours</h3>
          </div>
          <dl class="theme-body mt-4 grid grid-cols-2 gap-y-2 text-sm">
            <dt>Monday - Thursday</dt>
            <dd class="text-right">11:30 AM - 9 PM</dd>
            <dt>Friday - Saturday</dt>
            <dd class="text-right">11:30 AM - 10 PM</dd>
            <dt>Sunday</dt>
            <dd class="text-right">12 PM - 8 PM</dd>
          </dl>
        </div>
      </div>

      <section
        class="theme-surface theme-border rounded-2xl border p-6 shadow-sm md:p-8"
        aria-labelledby="contact-form-title"
      >
        <h2 id="contact-form-title" class="theme-heading text-2xl font-bold">Send us a message</h2>
        <p class="theme-body mt-2 text-sm">We usually reply within one business day.</p>
        <div
          v-if="submitted"
          class="theme-success mt-6 flex items-start gap-3 rounded-xl p-4"
          role="status"
        >
          <Check class="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>Thanks for reaching out. Your message has been received.</p>
        </div>
        <form class="mt-6 space-y-5" @submit.prevent="submitMessage">
          <label class="block"
            ><span class="theme-heading mb-2 block text-sm font-semibold">Name</span
            ><input
              v-model="form.name"
              required
              class="theme-input w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
              autocomplete="name"
          /></label>
          <label class="block"
            ><span class="theme-heading mb-2 block text-sm font-semibold">Email</span
            ><input
              v-model="form.email"
              required
              type="email"
              class="theme-input w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
              autocomplete="email"
          /></label>
          <label class="block"
            ><span class="theme-heading mb-2 block text-sm font-semibold">Message</span
            ><textarea
              v-model="form.message"
              required
              rows="5"
              class="theme-input w-full resize-y rounded-xl border px-4 py-3 outline-none focus:ring-2"
            ></textarea>
          </label>
          <button
            class="theme-button inline-flex items-center gap-2 rounded-xl px-5 py-3 font-bold transition hover:opacity-90"
            type="submit"
          >
            Send message <Send class="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      </section>
    </section>
  </main>
</template>
