<template>
  <div class="h-screen flex justify-center items-center">
    <div class="inline-block bg-white p-10 rounded-lg text-center">
      Demo<br>
      <NuxtLink to="/" class="underline">
        <ArrowLeftCircleIcon class="text-green-700 w-5 h-5 inline-block" />
        Back to List
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ArrowLeftCircleIcon } from '@heroicons/vue/20/solid';

</script>
