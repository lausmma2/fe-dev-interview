<script setup lang="ts">
  const props = defineProps<{
    options: { label: string; value: boolean }[];
  }>();

  const selectedValue = ref(props.options[0].value);

  const emit = defineEmits(['update:value']);

  watch(selectedValue, (newValue) => {
    emit('update:value', newValue);
  });
</script>

<template>
  <div v-for="option in props.options" :key="option.label" class="flex items-center ps-4">
    <input
      :id="'radio-' + option.label"
      v-model="selectedValue"
      type="radio"
      :value="option.value"
      name="radioInput"
      class="w-4 h-4"
    />
    <label :for="'radio-' + option.label" class="w-full py-2 ms-2 text-sm font-medium text-primary">
      {{ option.label }}
    </label>
  </div>
</template>
