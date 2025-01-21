<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      label: string;
      type?: string;
      min?: string;
    }>(),
    {
      type: 'text',
      min: '0',
    },
  );

  const errorState = reactive<{ error: string }>({
    error: '',
  });

  const placeholder = computed(() => {
    return props.type === 'password' ? '••••••••' : 'Some text...';
  });

  // eslint-disable-next-line func-call-spacing
  const emit = defineEmits<{ (event: 'update:value', value: string): void }>();

  const validateInput = (value: string) => {
    const isEmailValid = validateEmail(value);
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
  };
</script>

<template>
  <label for="identity" class="block text-gray-700 text-sm font-bold mb-2">{{ props.label }}</label>
  <input
    id="identity"
    :placeholder="placeholder"
    class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    :type="type"
    :min="min"
    @input="updateValue"
  />
  <span v-if="errorState.error.length" class="text-red-500">{{ errorState.error }}</span>
</template>
