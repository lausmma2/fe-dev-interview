<template>
  <div class="flex-1 flex flex-col min-h-screen overflow-auto bg-gray-100">
    <div class="flex w-full">
      <aside class="w-48 h-screen overflow-auto bg-primary py-4 px-2">
        <nav>
          <div class="flex pb-4 justify-around">
            <img src="@/assets/images/logo-ds.png" width="100" height="60" />
            <img
              src="@/assets/icons/hamburger-icon.svg"
              width="22"
              height="22"
              style="filter: invert(1)"
            />
          </div>
          <NuxtLink
            to="/users"
            class="inline-flex w-full px-2 py-2.5 text-white rounded-md text-lg font-medium gap-2 hover:bg-gray-700"
          >
            <img
              src="@/assets/icons/user-icon.svg"
              width="26"
              height="26"
              style="filter: invert(1)"
            />
            <div>Users</div>
          </NuxtLink>
          <NuxtLink
            to="/salaries"
            class="inline-flex w-full px-2 py-2.5 text-white rounded-md text-lg font-medium gap-2 hover:bg-gray-700"
          >
            <img
              src="@/assets/icons/money-icon.svg"
              width="26"
              height="26"
              style="filter: invert(1)"
            />
            <div>Salary</div>
          </NuxtLink>
        </nav>
      </aside>

      <div class="flex flex-col flex-1 items-center justify-center">
        <header class="border-b h-16 px-4 w-full flex items-center justify-between">
          <ModuleTitle />
        </header>

        <main class="size-full overflow-auto">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .router-link-exact-active {
    @apply opacity-80;
  }
</style>
