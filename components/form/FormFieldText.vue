<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      label: string;
      type?: string;
    }>(),
    {
      type: 'text',
    },
  );

  const placeholder = computed(() => {
    return props.type === 'password' ? '••••••••' : 'Some text...';
  });

  // eslint-disable-next-line func-call-spacing
  const emit = defineEmits<{ (event: 'update:value', value: string): void }>();

  const updateValue = (event: Event) => {
    const input = event.target as HTMLInputElement;
    emit('update:value', input.value);
  };
</script>

<template>
  <label for="identity" class="block text-gray-700 text-sm font-bold mb-2">{{ props.label }}</label>
  <input
    id="identity"
    :placeholder="placeholder"
    class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
    :type="type"
    @input="updateValue"
  />
</template>
