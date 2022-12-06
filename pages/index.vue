<template>
  <div class="h-screen flex justify-center items-center">
    <div class="inline-block bg-white p-10 rounded-lg text-center">
      Výpis uživatelů zde
      <br>
      <br>
      <NuxtLink to="/demo" class="underline" title="Example link">
        Demo odkaz <ArrowRightCircleIcon class="w-5 h-5 text-green-700 inline-block" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightCircleIcon } from '@heroicons/vue/20/solid';
import { setPageTitle } from '~/assets/ts/utils';

setPageTitle('Users');
</script>

<style scoped>

</style>
