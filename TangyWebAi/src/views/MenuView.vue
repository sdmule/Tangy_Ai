<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Search, X, RefreshCw, LoaderCircle, Utensils } from 'lucide-vue-next'
import { listCategories } from '@/services/categoryService'
import { listProducts } from '@/services/productService'
import { getFirebaseErrorMessage } from '@/services/firebaseError'
import { filterProducts } from '@/utils/productFilters'
import type { Category, Product } from '@/types/models'

const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const searchTerm = ref('')
const selectedCategory = ref('all')
const selectedProduct = ref<Product | null>(null)
const loading = ref(true)
const error = ref('')

const visibleProducts = computed(() =>
  filterProducts(products.value, searchTerm.value, selectedCategory.value),
)
const categoryName = (categoryId: string) =>
  categories.value.find((category) => category.id === categoryId)?.name ?? 'Uncategorized'

async function loadMenu() {
  loading.value = true
  error.value = ''
  try {
    const [loadedProducts, loadedCategories] = await Promise.all([listProducts(), listCategories()])
    products.value = loadedProducts
    categories.value = loadedCategories
  } catch (loadError) {
    error.value = getFirebaseErrorMessage(loadError, 'We could not load the menu.')
  } finally {
    loading.value = false
  }
}

onMounted(loadMenu)
const closeOnEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') selectedProduct.value = null
}
onMounted(() => window.addEventListener('keydown', closeOnEscape))
onUnmounted(() => window.removeEventListener('keydown', closeOnEscape))
</script>

<template>
  <main>
    <section class="theme-hero theme-border border-b">
      <div class="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <p class="theme-accent mb-3 text-sm font-bold uppercase tracking-[0.25em]">
          Italian comfort, Tangy spirit
        </p>
        <h1 class="theme-heading max-w-3xl text-5xl font-bold leading-tight md:text-7xl">
          A menu made for lingering.
        </h1>
        <p class="theme-body mt-6 max-w-xl text-lg leading-8">
          Handmade classics, bright ingredients, and the kind of plates that make the table stay
          awhile.
        </p>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-5 py-10 lg:px-8">
      <div class="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p class="theme-accent text-sm font-bold uppercase tracking-[0.2em]">From the kitchen</p>
          <h2 class="theme-heading mt-2 text-3xl font-bold">Explore the menu</h2>
        </div>
        <div class="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
          <label class="relative block sm:min-w-72">
            <span class="sr-only">Search menu</span>
            <Search class="theme-muted pointer-events-none absolute left-3 top-3.5 h-5 w-5" />
            <input
              v-model="searchTerm"
              class="theme-input w-full rounded-xl border py-3 pl-10 pr-4 outline-none ring-[var(--accent)] focus:ring-2"
              placeholder="Search dishes"
            />
          </label>
          <label>
            <span class="sr-only">Filter by category</span>
            <select
              v-model="selectedCategory"
              class="theme-input w-full rounded-xl border px-4 py-3 outline-none ring-[var(--accent)] focus:ring-2 sm:min-w-44"
            >
              <option value="all">All categories</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </label>
        </div>
      </div>

      <div
        v-if="loading"
        class="theme-accent flex min-h-64 items-center justify-center"
        aria-live="polite"
      >
        <LoaderCircle class="h-10 w-10 animate-spin" aria-label="Loading menu" />
      </div>
      <div
        v-else-if="error"
        class="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900"
        role="alert"
      >
        <p class="font-semibold">{{ error }}</p>
        <button
          class="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-900 px-4 py-2 text-sm font-bold text-white"
          @click="loadMenu"
        >
          <RefreshCw class="h-4 w-4" /> Try again
        </button>
      </div>
      <div
        v-else-if="visibleProducts.length === 0"
        class="theme-border rounded-2xl border border-dashed px-6 py-16 text-center"
      >
        <Utensils class="theme-accent mx-auto h-10 w-10" />
        <h3 class="theme-heading mt-4 text-xl font-bold">Nothing matched that search</h3>
        <p class="theme-body mt-2">Try another dish or choose all categories.</p>
      </div>
      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <button
          v-for="product in visibleProducts"
          :key="product.id"
          class="theme-surface theme-border-subtle group overflow-hidden rounded-2xl border text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          @click="selectedProduct = product"
        >
          <div class="theme-surface-muted relative aspect-[4/3] overflow-hidden">
            <img
              :src="product.imageUrl"
              :alt="product.name"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <span
              v-if="!product.isAvailable"
              class="absolute left-3 top-3 rounded-full bg-[var(--text-heading)] px-3 py-1 text-xs font-bold text-[var(--page-bg)]"
              >Currently unavailable</span
            >
          </div>
          <div class="p-5">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="theme-accent text-xs font-bold uppercase tracking-wider">
                  {{ categoryName(product.categoryId) }}
                </p>
                <h3 class="theme-heading mt-1 text-xl font-bold">{{ product.name }}</h3>
              </div>
              <span
                v-if="product.tag"
                class="theme-accent-strong shrink-0 whitespace-nowrap rounded border border-[var(--accent-strong)] px-2 py-1 text-xs font-bold uppercase tracking-wider"
                >{{ product.tag }}</span
              >
              <span class="theme-accent-strong whitespace-nowrap font-bold"
                >${{ product.price.toFixed(2) }}</span
              >
            </div>
            <p class="theme-body mt-3 line-clamp-2 text-sm leading-6">
              {{ product.description }}
            </p>
          </div>
        </button>
      </div>
    </section>

    <div
      v-if="selectedProduct"
      class="theme-overlay fixed inset-0 z-20 flex items-center justify-center p-5"
      role="presentation"
      @click.self="selectedProduct = null"
    >
      <section
        class="theme-surface relative max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl shadow-2xl"
        role="dialog"
        aria-modal="true"
        :aria-label="selectedProduct.name"
      >
        <button
          class="theme-surface theme-heading absolute right-4 top-4 z-10 rounded-full p-2 shadow"
          aria-label="Close product details"
          @click="selectedProduct = null"
        >
          <X class="h-5 w-5" />
        </button>
        <img
          :src="selectedProduct.imageUrl"
          :alt="selectedProduct.name"
          class="max-h-80 w-full object-cover"
        />
        <div class="p-6 md:p-8">
          <div class="flex items-center justify-between gap-3">
            <p class="theme-accent text-sm font-bold uppercase tracking-wider">
              {{ categoryName(selectedProduct.categoryId) }}
            </p>
            <span
              v-if="selectedProduct.tag"
              class="theme-accent-strong shrink-0 whitespace-nowrap rounded border border-[var(--accent-strong)] px-2 py-1 text-xs font-bold uppercase tracking-wider"
              >{{ selectedProduct.tag }}</span
            >
          </div>
          <h2 class="theme-heading mt-2 text-3xl font-bold">{{ selectedProduct.name }}</h2>
          <p class="theme-body mt-4 text-lg leading-8">{{ selectedProduct.description }}</p>
          <div class="theme-border-subtle mt-6 flex items-center justify-between border-t pt-5">
            <span class="theme-accent-strong text-2xl font-bold"
              >${{ selectedProduct.price.toFixed(2) }}</span
            ><span
              class="font-semibold"
              :class="selectedProduct.isAvailable ? 'text-green-700' : 'theme-muted'"
              >{{ selectedProduct.isAvailable ? 'Available today' : 'Currently unavailable' }}</span
            >
          </div>
        </div>
      </section>
    </div>
  </main>
</template>
