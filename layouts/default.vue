<script setup lang="ts">
  import { reactive } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();

  const tabs = reactive<{ index: number | null }>({
    index: null,
  });

  watch(
    () => route.fullPath,
    (newFullPath) => {
      if (newFullPath.includes('users')) {
        tabs.index = 1;
      } else if (newFullPath.includes('salaries')) {
        tabs.index = 2;
      } else if (newFullPath.includes('login')) {
        tabs.index = 3;
      } else {
        tabs.index = 0;
      }
    },
    { immediate: true },
  );

  const jwtToken = useCookie('jwtToken');

  const removeJwtToken = () => {
    jwtToken.value = null;
    navigateTo('/login');
  };
</script>

<template>
  <div class="flex-1 flex flex-col min-h-screen overflow-auto bg-gray-100">
    <div class="flex w-full">
      <aside class="w-48 h-screen overflow-auto bg-primary py-4 px-2">
        <nav>
          <NuxtLink to="/" class="flex pb-4 justify-around">
            <img src="@/assets/images/logo-ds.png" width="100" height="60" />
            <img
              src="@/assets/icons/hamburger-icon.svg"
              width="22"
              height="22"
              style="filter: invert(1)"
            />
          </NuxtLink>
          <div
            class="flex flex-col h-screen justify-between"
            :style="{ height: 'calc(100vh - 4.7rem)' }"
          >
            <div>
              <NuxtLink
                to="/users"
                :class="{
                  'inline-flex w-full px-2 py-2.5 text-white rounded-md text-lg font-medium gap-2 hover:bg-gray-700': true,
                  'bg-gray-700 text-white': tabs.index === 1,
                }"
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
                v-if="jwtToken?.length"
                to="/salaries"
                :class="{
                  'inline-flex w-full px-2 py-2.5 text-white rounded-md text-lg font-medium gap-2 hover:bg-gray-700': true,
                  'bg-gray-700': tabs.index === 2,
                }"
              >
                <img
                  src="@/assets/icons/money-icon.svg"
                  width="26"
                  height="26"
                  style="filter: invert(1)"
                />
                <div>Salary</div>
              </NuxtLink>
            </div>
            <NuxtLink
              v-if="!jwtToken?.length"
              to="/login"
              :class="{
                'inline-flex w-full px-2 py-2.5 text-white rounded-md text-lg font-medium gap-2 hover:bg-gray-700': true,
                'bg-gray-700': tabs.index === 3,
              }"
            >
              <img
                src="@/assets/icons/login-icon.svg"
                width="26"
                height="26"
                style="filter: invert(1)"
              />
              <div>Login</div>
            </NuxtLink>
            <button
              v-else
              :class="{
                'inline-flex w-full px-2 py-2.5 text-white rounded-md text-lg font-medium gap-2 hover:bg-gray-700': true,
                'bg-gray-700': tabs.index === 3,
              }"
              @click="removeJwtToken"
            >
              <img
                src="@/assets/icons/logout-icon.svg"
                width="26"
                height="26"
                style="filter: invert(1)"
              />
              <div>Logout</div>
            </button>
          </div>
        </nav>
      </aside>

      <div class="flex flex-col flex-1 items-center justify-center">
        <header
          class="border-b h-16 px-8 w-full flex items-center justify-between font-bold bg-white"
        >
          <ModuleTitle />
          <div
            class="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-primary font-bold text-md cursor-pointer"
          >
            ML
          </div>
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
