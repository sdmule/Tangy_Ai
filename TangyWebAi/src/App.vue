<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ArrowRight, Moon, Sun } from 'lucide-vue-next'

const isDark = ref(false)

function applyTheme() {
  document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light'
}

function toggleTheme() {
  isDark.value = !isDark.value
  localStorage.setItem('tangy-theme', isDark.value ? 'dark' : 'light')
  applyTheme()
}

onMounted(() => {
  isDark.value = localStorage.getItem('tangy-theme') === 'dark'
  applyTheme()
})
</script>

<template>
  <div class="theme-page min-h-screen">
    <header class="theme-header border-b">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <RouterLink to="/" class="theme-accent-strong text-2xl font-bold tracking-tight"
          >Tangy</RouterLink
        >
        <nav class="theme-body flex items-center gap-5 text-sm font-semibold">
          <button
            class="theme-icon rounded-lg p-2 transition hover:bg-[var(--surface-muted)]"
            :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
            :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
            @click="toggleTheme"
          >
            <Sun v-if="isDark" class="h-5 w-5" aria-hidden="true" />
            <Moon v-else class="h-5 w-5" aria-hidden="true" />
          </button>
          <RouterLink
            to="/admin"
            class="theme-body inline-flex items-center gap-1 transition hover:text-[var(--accent)]"
          >
            Manage Menu
            <ArrowRight class="h-4 w-4" aria-hidden="true" />
          </RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>
