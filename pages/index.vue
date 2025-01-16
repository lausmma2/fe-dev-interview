<script setup lang="ts">
  import { ArrowRightCircleIcon } from '@heroicons/vue/20/solid';
  import { setPageTitle } from '~/utils/pageTitle';

  setPageTitle('Homepage');

  const count = ref(0);

  const increaseCount = () => {
    count.value += 1;
  };
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div class="inline-block bg-white p-10 rounded-lg text-center">
      Výpis uživatelů zde:
      <br />
      <br />

      <NuxtLink class="underline" title="Example link">
        Demo odkaz ({{ count }})
        <ArrowRightCircleIcon class="size-5 text-green-700 inline-block" />
      </NuxtLink>

      <br />

      <button
        type="button"
        class="bg-green-600 rounded-lg my-4 text-white px-4 py-1.5"
        @click.prevent="increaseCount"
      >
        Increase count
      </button>
    </div>
  </div>
</template>
