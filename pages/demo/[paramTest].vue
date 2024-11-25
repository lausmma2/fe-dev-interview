<script setup lang="ts">
  import { ArrowLeftCircleIcon } from '@heroicons/vue/20/solid';
  import { setPageTitle } from '~/utils/pageTitle';

  setPageTitle('Demo');

  const { params } = useRoute();
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <div class="inline-block bg-white p-10 rounded-lg text-center">
      Demo ({{ params?.paramTest }})
      <br />

      <NuxtLink to="/" class="underline">
        <ArrowLeftCircleIcon class="text-green-700 size-5 inline-block" />
        Back to List
      </NuxtLink>
    </div>
  </div>
</template>
