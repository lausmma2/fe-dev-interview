<template>
  <div class="flex-1 flex flex-col min-h-screen overflow-auto bg-gray-100">
    <div class="flex w-full">
      <aside class="w-64 h-screen overflow-auto bg-gray-700 p-4">
        <nav>
          <NuxtLink
            to="/demo"
            class="inline-flex w-full text-white px-4 py-2.5 bg-white text-black rounded-md"
          >
            Demo odkaz
          </NuxtLink>
        </nav>
      </aside>
      <div class="flex flex-col flex-1 items-center justify-center">
        <header class="border-b h-16 w-full">
          <slot name="header" />
        </header>
        <main class="w-full h-full overflow-auto">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
<style scoped>
.router-link-exact-active {
  @apply underline;
}
</style>
