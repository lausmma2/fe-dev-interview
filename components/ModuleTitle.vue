<script setup lang="ts">
  import { useState } from '#imports';

  const title = useState('pageTitle', () => '');
</script>

<template>
  <span>
    {{ title }}
  </span>
</template>
