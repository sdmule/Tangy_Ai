<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { Pencil, Plus, RefreshCw, Trash2, LoaderCircle } from 'lucide-vue-next'
import {
  createCategory,
  categoryNameExists,
  deleteCategory,
  listCategories,
  updateCategory,
} from '@/services/categoryService'
import {
  createProduct,
  deleteProduct,
  listProducts,
  updateProduct,
} from '@/services/productService'
import { getFirebaseErrorMessage } from '@/services/firebaseError'
import { isCategoryReferenced } from '@/utils/categoryRules'
import { validateCategory, validateProduct } from '@/utils/validation'
import type { Category, Product, ProductInput } from '@/types/models'

const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const loading = ref(true)
const busy = ref(false)
const message = ref('')
const error = ref('')
const editingProductId = ref<string | null>(null)
const editingCategoryId = ref<string | null>(null)
const productForm = reactive<ProductInput>({
  name: '',
  description: '',
  price: 0,
  imageUrl: '',
  categoryId: '',
  isAvailable: true,
})
const categoryName = ref('')

async function loadData() {
  loading.value = true
  error.value = ''
  try {
    ;[products.value, categories.value] = await Promise.all([listProducts(), listCategories()])
  } catch (loadError) {
    error.value = getFirebaseErrorMessage(loadError, 'Could not load management data.')
  } finally {
    loading.value = false
  }
}

function clearProductForm() {
  editingProductId.value = null
  Object.assign(productForm, {
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    categoryId: categories.value[0]?.id ?? '',
    isAvailable: true,
  })
}

function editProduct(product: Product) {
  editingProductId.value = product.id
  Object.assign(productForm, {
    name: product.name,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl,
    categoryId: product.categoryId,
    isAvailable: product.isAvailable,
  })
}

async function saveProduct() {
  error.value = ''
  message.value = ''
  const validationError = validateProduct(productForm, categories.value)
  if (validationError) {
    error.value = validationError
    return
  }
  busy.value = true
  try {
    if (editingProductId.value) await updateProduct(editingProductId.value, productForm)
    else await createProduct(productForm)
    message.value = editingProductId.value ? 'Product updated.' : 'Product created.'
    clearProductForm()
    await loadData()
  } catch (saveError) {
    error.value = getFirebaseErrorMessage(saveError, 'Could not save product.')
  } finally {
    busy.value = false
  }
}

async function removeProduct(product: Product) {
  if (!window.confirm(`Delete ${product.name}?`)) return
  busy.value = true
  error.value = ''
  try {
    await deleteProduct(product.id)
    message.value = 'Product deleted.'
    await loadData()
  } catch (removeError) {
    error.value = getFirebaseErrorMessage(removeError, 'Could not delete product.')
  } finally {
    busy.value = false
  }
}

function editCategory(category: Category) {
  editingCategoryId.value = category.id
  categoryName.value = category.name
}
function clearCategoryForm() {
  editingCategoryId.value = null
  categoryName.value = ''
}

async function saveCategory() {
  error.value = ''
  message.value = ''
  const validationError = validateCategory(
    { name: categoryName.value },
    categories.value,
    editingCategoryId.value ?? undefined,
  )
  if (validationError) {
    error.value = validationError
    return
  }
  busy.value = true
  try {
    if (await categoryNameExists(categoryName.value, editingCategoryId.value ?? undefined)) {
      error.value = 'A category with this name already exists.'
      return
    }
    if (editingCategoryId.value)
      await updateCategory(editingCategoryId.value, { name: categoryName.value })
    else await createCategory({ name: categoryName.value })
    message.value = editingCategoryId.value ? 'Category updated.' : 'Category created.'
    clearCategoryForm()
    await loadData()
  } catch (saveError) {
    error.value = getFirebaseErrorMessage(saveError, 'Could not save category.')
  } finally {
    busy.value = false
  }
}

async function removeCategory(category: Category) {
  if (isCategoryReferenced(category.id, products.value)) {
    error.value = 'This category cannot be deleted while products still reference it.'
    return
  }
  if (!window.confirm(`Delete ${category.name}?`)) return
  busy.value = true
  error.value = ''
  try {
    await deleteCategory(category.id)
    message.value = 'Category deleted.'
    await loadData()
  } catch (removeError) {
    error.value = getFirebaseErrorMessage(removeError, 'Could not delete category.')
  } finally {
    busy.value = false
  }
}

onMounted(async () => {
  await loadData()
  clearProductForm()
})
</script>

<template>
  <main class="mx-auto max-w-7xl px-5 py-10 lg:px-8">
    <div
      class="theme-border mb-8 flex flex-col gap-3 border-b pb-8 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <p class="theme-accent text-sm font-bold uppercase tracking-[0.2em]">Kitchen desk</p>
        <h1 class="theme-heading mt-2 text-4xl font-bold">Manage the menu</h1>
      </div>
      <button
        class="theme-border theme-body inline-flex items-center gap-2 self-start rounded-lg border px-4 py-2 font-semibold hover:bg-[var(--surface-muted)]"
        @click="loadData"
      >
        <RefreshCw class="h-4 w-4" /> Refresh
      </button>
    </div>
    <div v-if="message" class="mb-4 rounded-xl bg-green-50 p-4 text-green-800" role="status">
      {{ message }}
    </div>
    <div v-if="error" class="mb-4 rounded-xl bg-red-50 p-4 text-red-900" role="alert">
      {{ error }}
    </div>
    <div v-if="loading" class="theme-accent flex justify-center py-20">
      <LoaderCircle class="h-10 w-10 animate-spin" aria-label="Loading management data" />
    </div>
    <div v-else class="grid gap-8 xl:grid-cols-[1.6fr_1fr]">
      <section class="theme-surface theme-border-subtle rounded-2xl border p-6">
        <div class="mb-5 flex items-center justify-between">
          <h2 class="theme-heading text-2xl font-bold">Products</h2>
          <span class="theme-body text-sm">{{ products.length }} items</span>
        </div>
        <form class="theme-border-subtle grid gap-3 border-b pb-6" @submit.prevent="saveProduct">
          <input
            v-model="productForm.name"
            aria-label="Product name"
            placeholder="Product name"
            class="field"
          /><textarea
            v-model="productForm.description"
            aria-label="Product description"
            placeholder="Description"
            rows="2"
            class="field"
          />
          <div class="grid gap-3 sm:grid-cols-2">
            <input
              v-model.number="productForm.price"
              type="number"
              min="0"
              step="0.01"
              aria-label="Product price"
              placeholder="Price"
              class="field"
            /><input
              v-model="productForm.imageUrl"
              type="url"
              aria-label="Image URL"
              placeholder="HTTPS image URL"
              class="field"
            />
          </div>
          <select v-model="productForm.categoryId" aria-label="Product category" class="field">
            <option disabled value="">Choose category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option></select
          ><label class="theme-body flex items-center gap-2 text-sm"
            ><input v-model="productForm.isAvailable" type="checkbox" /> Available on menu</label
          >
          <div class="flex gap-2">
            <button
              :disabled="busy"
              class="theme-accent-strong inline-flex items-center gap-2 rounded-lg bg-[var(--accent-strong)] px-4 py-2 font-bold text-[var(--page-bg)] disabled:opacity-50"
              type="submit"
            >
              <Plus v-if="!editingProductId" class="h-4 w-4" /><Pencil v-else class="h-4 w-4" />
              {{ editingProductId ? 'Update' : 'Add' }} product</button
            ><button
              v-if="editingProductId"
              type="button"
              class="theme-body rounded-lg px-4 py-2 font-semibold"
              @click="clearProductForm"
            >
              Cancel
            </button>
          </div>
        </form>
        <div class="mt-5 space-y-3">
          <p v-if="products.length === 0" class="theme-body py-8 text-center">No products yet.</p>
          <div
            v-for="product in products"
            :key="product.id"
            class="theme-border-subtle flex items-center justify-between gap-3 border-b pb-3"
          >
            <div class="min-w-0">
              <p class="theme-heading truncate font-bold">{{ product.name }}</p>
              <p class="theme-body text-sm">
                ${{ product.price.toFixed(2) }} ·
                {{ product.isAvailable ? 'Available' : 'Unavailable' }}
              </p>
            </div>
            <div class="flex shrink-0 gap-2">
              <button
                class="theme-body rounded p-2 hover:bg-[var(--surface-muted)]"
                :aria-label="`Edit ${product.name}`"
                @click="editProduct(product)"
              >
                <Pencil class="h-4 w-4" /></button
              ><button
                class="theme-accent-strong rounded p-2 hover:bg-red-50"
                :aria-label="`Delete ${product.name}`"
                @click="removeProduct(product)"
              >
                <Trash2 class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section class="theme-surface theme-border-subtle rounded-2xl border p-6">
        <h2 class="theme-heading mb-5 text-2xl font-bold">Categories</h2>
        <form class="theme-border-subtle flex gap-2 border-b pb-6" @submit.prevent="saveCategory">
          <input
            v-model="categoryName"
            aria-label="Category name"
            placeholder="Category name"
            class="field min-w-0 flex-1"
          /><button
            :disabled="busy"
            class="theme-accent-strong rounded-lg bg-[var(--accent-strong)] p-3 text-[var(--page-bg)] disabled:opacity-50"
            :aria-label="editingCategoryId ? 'Update category' : 'Add category'"
          >
            <Plus v-if="!editingCategoryId" class="h-5 w-5" /><Pencil v-else class="h-5 w-5" />
          </button>
        </form>
        <div class="mt-5 space-y-3">
          <p v-if="categories.length === 0" class="theme-body py-8 text-center">
            No categories yet.
          </p>
          <div
            v-for="category in categories"
            :key="category.id"
            class="theme-border-subtle flex items-center justify-between border-b pb-3"
          >
            <span class="theme-heading font-bold">{{ category.name }}</span>
            <div class="flex gap-2">
              <button
                class="theme-body rounded p-2 hover:bg-[var(--surface-muted)]"
                :aria-label="`Edit ${category.name}`"
                @click="editCategory(category)"
              >
                <Pencil class="h-4 w-4" /></button
              ><button
                class="theme-accent-strong rounded p-2 hover:bg-red-50"
                :aria-label="`Delete ${category.name}`"
                @click="removeCategory(category)"
              >
                <Trash2 class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.field {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--surface);
  color: var(--text-heading);
  padding: 0.7rem 0.9rem;
  outline: none;
}
.field:focus {
  box-shadow: 0 0 0 2px var(--accent);
}
</style>
