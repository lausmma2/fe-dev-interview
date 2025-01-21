<script setup lang="ts">
  const props = defineProps<{
    options: string[];
  }>();

  const selectedValue = ref(props.options[0]);
</script>

<template>
  <div v-for="option in props.options" :key="option" class="flex items-center ps-4">
    <input
      :id="'radio-' + option"
      v-model="selectedValue"
      type="radio"
      :value="option"
      name="bordered-radio"
      class="w-4 h-4"
    />
    <label :for="'radio-' + option" class="w-full py-2 ms-2 text-sm font-medium text-primary">
      {{ option }}
    </label>
  </div>
</template>
