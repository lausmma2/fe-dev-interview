<script setup lang="ts">
  import { computed, reactive } from 'vue';

  const props = withDefaults(
    defineProps<{
      label: string;
      type?: string;
      min?: string;
      value: string;
    }>(),
    {
      type: 'text',
      min: '0',
    },
  );

  const emit = defineEmits(['update:value', 'errorState']);

  const errorState = reactive<{ error: string }>({
    error: '',
  });

  const placeholder = computed(() => {
    return props.type === 'password' ? '••••••••' : 'Some text...';
  });

  // Validations
  const validateInput = (value: string) => {
    const isEmailValid = props.type === 'email' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : true;

    if (value.length <= 0) {
      errorState.error = 'Please fill up this field!';
    } else if (props.type === 'email' && !isEmailValid) {
      errorState.error = 'Please enter a valid e-mail!';
    } else if (value.length > 0 && value.length < Number(props.min)) {
      errorState.error = `You must use >= ${props.min} characters`;
    } else {
      errorState.error = '';
    }
  };

  const updateValue = (event: Event) => {
    const input = event.target as HTMLInputElement;
    validateInput(input.value);
    emit('update:value', input.value);
    emit('errorState', errorState.error);
  };
</script>

<template>
  <label :for="`field-${props.label}`" class="block text-gray-700 text-sm font-bold mb-2">
    {{ props.label }}
  </label>
  <input
    :id="`field-${props.label}`"
    :placeholder="placeholder"
    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    :type="props.type"
    :min="props.min"
    :value="props.value"
    @input="updateValue"
  />
  <span v-if="errorState.error.length" class="text-red-500">{{ errorState.error }}</span>
</template>
