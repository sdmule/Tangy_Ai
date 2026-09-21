<template>
  <div class="min-h-screen bg-[#f8f2e8]">
    <header class="border-b border-[#d9c9b4] bg-[#fffaf2]/90">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <RouterLink to="/" class="text-2xl font-bold tracking-tight text-[#7d2d21]"
          >Tangy</RouterLink
        >
        <nav class="flex items-center gap-5 text-sm font-semibold text-[#684b39]">
          <RouterLink to="/" class="transition hover:text-[#b4532f]">Menu</RouterLink>
          <RouterLink to="/admin" class="transition hover:text-[#b4532f]">Manage</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>
