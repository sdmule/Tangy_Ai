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
  if (products.value.some((product) => product.categoryId === category.id)) {
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
      class="mb-8 flex flex-col gap-3 border-b border-[#d9c9b4] pb-8 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <p class="text-sm font-bold uppercase tracking-[0.2em] text-[#b4532f]">Kitchen desk</p>
        <h1 class="mt-2 text-4xl font-bold text-[#42291f]">Manage the menu</h1>
      </div>
      <button
        class="inline-flex items-center gap-2 self-start rounded-lg border border-[#cbb49c] px-4 py-2 font-semibold text-[#684b39] hover:bg-[#efe1cf]"
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
    <div v-if="loading" class="flex justify-center py-20 text-[#b4532f]">
      <LoaderCircle class="h-10 w-10 animate-spin" aria-label="Loading management data" />
    </div>
    <div v-else class="grid gap-8 xl:grid-cols-[1.6fr_1fr]">
      <section class="rounded-2xl border border-[#e1d2c1] bg-[#fffaf2] p-6">
        <div class="mb-5 flex items-center justify-between">
          <h2 class="text-2xl font-bold text-[#42291f]">Products</h2>
          <span class="text-sm text-[#684b39]">{{ products.length }} items</span>
        </div>
        <form class="grid gap-3 border-b border-[#e1d2c1] pb-6" @submit.prevent="saveProduct">
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
          ><label class="flex items-center gap-2 text-sm text-[#684b39]"
            ><input v-model="productForm.isAvailable" type="checkbox" /> Available on menu</label
          >
          <div class="flex gap-2">
            <button
              :disabled="busy"
              class="inline-flex items-center gap-2 rounded-lg bg-[#7d2d21] px-4 py-2 font-bold text-white disabled:opacity-50"
              type="submit"
            >
              <Plus v-if="!editingProductId" class="h-4 w-4" /><Pencil v-else class="h-4 w-4" />
              {{ editingProductId ? 'Update' : 'Add' }} product</button
            ><button
              v-if="editingProductId"
              type="button"
              class="rounded-lg px-4 py-2 font-semibold text-[#684b39]"
              @click="clearProductForm"
            >
              Cancel
            </button>
          </div>
        </form>
        <div class="mt-5 space-y-3">
          <p v-if="products.length === 0" class="py-8 text-center text-[#684b39]">
            No products yet.
          </p>
          <div
            v-for="product in products"
            :key="product.id"
            class="flex items-center justify-between gap-3 border-b border-[#eadfce] pb-3"
          >
            <div class="min-w-0">
              <p class="truncate font-bold text-[#42291f]">{{ product.name }}</p>
              <p class="text-sm text-[#684b39]">
                ${{ product.price.toFixed(2) }} ·
                {{ product.isAvailable ? 'Available' : 'Unavailable' }}
              </p>
            </div>
            <div class="flex shrink-0 gap-2">
              <button
                class="rounded p-2 text-[#684b39] hover:bg-[#efe1cf]"
                :aria-label="`Edit ${product.name}`"
                @click="editProduct(product)"
              >
                <Pencil class="h-4 w-4" /></button
              ><button
                class="rounded p-2 text-[#7d2d21] hover:bg-red-50"
                :aria-label="`Delete ${product.name}`"
                @click="removeProduct(product)"
              >
                <Trash2 class="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section class="rounded-2xl border border-[#e1d2c1] bg-[#fffaf2] p-6">
        <h2 class="mb-5 text-2xl font-bold text-[#42291f]">Categories</h2>
        <form class="flex gap-2 border-b border-[#e1d2c1] pb-6" @submit.prevent="saveCategory">
          <input
            v-model="categoryName"
            aria-label="Category name"
            placeholder="Category name"
            class="field min-w-0 flex-1"
          /><button
            :disabled="busy"
            class="rounded-lg bg-[#7d2d21] p-3 text-white disabled:opacity-50"
            :aria-label="editingCategoryId ? 'Update category' : 'Add category'"
          >
            <Plus v-if="!editingCategoryId" class="h-5 w-5" /><Pencil v-else class="h-5 w-5" />
          </button>
        </form>
        <div class="mt-5 space-y-3">
          <p v-if="categories.length === 0" class="py-8 text-center text-[#684b39]">
            No categories yet.
          </p>
          <div
            v-for="category in categories"
            :key="category.id"
            class="flex items-center justify-between border-b border-[#eadfce] pb-3"
          >
            <span class="font-bold text-[#42291f]">{{ category.name }}</span>
            <div class="flex gap-2">
              <button
                class="rounded p-2 text-[#684b39] hover:bg-[#efe1cf]"
                :aria-label="`Edit ${category.name}`"
                @click="editCategory(category)"
              >
                <Pencil class="h-4 w-4" /></button
              ><button
                class="rounded p-2 text-[#7d2d21] hover:bg-red-50"
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
  border: 1px solid #d9c9b4;
  border-radius: 0.75rem;
  background: #fffaf2;
  padding: 0.7rem 0.9rem;
  outline: none;
}
.field:focus {
  box-shadow: 0 0 0 2px #b4532f;
}
</style>
