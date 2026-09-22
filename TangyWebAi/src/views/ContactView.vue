<script setup lang="ts">
import { ref } from 'vue'
import { ArrowUpRight, Check, Clock3, Mail, MapPin, Phone, Send } from 'lucide-vue-next'

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
      <div
        class="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:px-8 lg:py-20"
      >
        <div>
          <p class="theme-accent text-sm font-bold uppercase tracking-[0.28em]">Contact Tangy</p>
          <h1
            class="theme-heading mt-5 max-w-4xl text-5xl font-bold leading-[0.95] md:text-7xl lg:text-8xl"
          >
            Pull up a chair.
          </h1>
        </div>
        <p class="theme-body max-w-md pb-1 text-lg leading-8 lg:justify-self-end">
          For a question, a celebration, or a table worth planning around, send us a note. We are
          always happy to talk food.
        </p>
      </div>
    </section>

    <section
      class="mx-auto grid max-w-7xl gap-0 px-5 py-10 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-16"
    >
      <div class="relative min-h-[470px] overflow-hidden bg-[#5d3024] lg:min-h-[680px]">
        <img
          src="https://dotnetmasteryimages.blob.core.windows.net/copilot-tangyai-images/Focaccia.png"
          alt="Fresh focaccia prepared at Tangy"
          class="absolute inset-0 h-full w-full object-cover opacity-80"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-[#2c1711]/90 via-[#2c1711]/15 to-transparent"
        ></div>
        <div class="absolute inset-x-6 bottom-6 text-[#fffaf2] md:inset-x-8 md:bottom-8">
          <p class="text-sm font-bold uppercase tracking-[0.22em] text-[#f5b18c]">
            Good food, good company
          </p>
          <p class="mt-3 max-w-xs text-2xl font-bold leading-tight">
            Come hungry. Leave with a story.
          </p>
        </div>
      </div>

      <div
        class="theme-surface flex flex-col justify-between border border-l-0 border-[var(--border)] p-6 md:p-10 lg:p-12"
      >
        <div>
          <p class="theme-accent text-sm font-bold uppercase tracking-[0.22em]">Find us</p>
          <h2 class="theme-heading mt-3 text-3xl font-bold md:text-4xl">The table is set.</h2>
          <div class="theme-border-subtle mt-8 divide-y border-y">
            <a
              class="theme-body group flex items-start justify-between gap-5 py-5 transition hover:text-[var(--accent)]"
              href="https://maps.google.com/?q=123+Main+Street"
              target="_blank"
              rel="noreferrer"
            >
              <span class="flex items-start gap-4"
                ><MapPin class="theme-accent mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" /><span
                  >123 Main Street<br />Your City, ST 00000</span
                ></span
              >
              <ArrowUpRight
                class="theme-muted h-5 w-5 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              class="theme-body flex items-center gap-4 py-5 transition hover:text-[var(--accent)]"
              href="tel:+15551234567"
              ><Phone class="theme-accent h-5 w-5 shrink-0" aria-hidden="true" /><span
                >(555) 123-4567</span
              ></a
            >
            <a
              class="theme-body flex items-center gap-4 py-5 transition hover:text-[var(--accent)]"
              href="mailto:hello@tangyrestaurant.com"
              ><Mail class="theme-accent h-5 w-5 shrink-0" aria-hidden="true" /><span
                >hello@tangyrestaurant.com</span
              ></a
            >
          </div>
        </div>
        <div class="theme-surface-muted mt-10 p-5 md:p-6">
          <div class="flex items-center gap-3">
            <Clock3 class="theme-accent h-5 w-5" aria-hidden="true" />
            <h3 class="theme-heading font-bold">Hours</h3>
          </div>
          <dl class="theme-body mt-4 grid grid-cols-2 gap-y-2 text-sm leading-6">
            <dt>Mon - Thu</dt>
            <dd class="text-right">11:30 AM - 9 PM</dd>
            <dt>Fri - Sat</dt>
            <dd class="text-right">11:30 AM - 10 PM</dd>
            <dt>Sunday</dt>
            <dd class="text-right">12 PM - 8 PM</dd>
          </dl>
        </div>
      </div>
    </section>

    <section class="theme-surface-muted border-y border-[var(--border)]">
      <div
        class="mx-auto grid max-w-7xl gap-10 px-5 py-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:px-8 lg:py-16"
      >
        <div>
          <p class="theme-accent text-sm font-bold uppercase tracking-[0.22em]">Say hello</p>
          <h2 class="theme-heading mt-3 max-w-sm text-4xl font-bold leading-tight">
            Let’s make something worth gathering for.
          </h2>
        </div>
        <div class="theme-surface border border-[var(--border)] p-6 md:p-8">
          <div
            v-if="submitted"
            class="theme-success flex items-start gap-3 rounded-xl p-4"
            role="status"
          >
            <Check class="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p>Thanks for reaching out. Your message has been received.</p>
          </div>
          <form
            class="grid gap-5 md:grid-cols-2"
            :class="submitted ? 'mt-5' : ''"
            @submit.prevent="submitMessage"
          >
            <label class="block"
              ><span class="theme-heading mb-2 block text-sm font-semibold">Name</span
              ><input
                v-model="form.name"
                required
                class="theme-input w-full border-b px-0 py-3 outline-none focus:border-[var(--accent)]"
                autocomplete="name"
            /></label>
            <label class="block"
              ><span class="theme-heading mb-2 block text-sm font-semibold">Email</span
              ><input
                v-model="form.email"
                required
                type="email"
                class="theme-input w-full border-b px-0 py-3 outline-none focus:border-[var(--accent)]"
                autocomplete="email"
            /></label>
            <label class="block md:col-span-2"
              ><span class="theme-heading mb-2 block text-sm font-semibold"
                >What can we help with?</span
              ><textarea
                v-model="form.message"
                required
                rows="4"
                class="theme-input w-full resize-y border-b px-0 py-3 outline-none focus:border-[var(--accent)]"
              ></textarea>
            </label>
            <div class="md:col-span-2">
              <button
                class="theme-button inline-flex items-center gap-2 px-5 py-3 font-bold transition hover:opacity-90"
                type="submit"
              >
                Send message <Send class="h-4 w-4" aria-hidden="true" />
              </button>
           
      </div>
    </section>
  </main>
</template>
