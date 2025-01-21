<script setup lang="ts">
  import { reactive } from 'vue';
  import type { FormProps } from '~/types/formProps';
  const formState = reactive<
    {
      values: {
        email: string;
        name: string;
        surname: string;
        active: boolean;
        plainPassword: string;
        note: string;
      };
    } & FormProps
  >({
    values: {
      email: '',
      name: '',
      surname: '',
      active: false,
      plainPassword: '',
      note: '',
    },
    isLoading: false,
    error: null,
  });

  const emit = defineEmits(['formData']);

  emit('formData', formState);
</script>

<template>
  <form class="rounded w-full max-w-xs">
    <div class="identity-input mb-3">
      <FormFieldText v-model:value="formState.values.email" label="E-mail" type="email" />
    </div>

    <div class="password-input mb-3">
      <FormFieldText
        v-model:value="formState.values.plainPassword"
        label="Password"
        type="password"
        min="10"
      />
    </div>

    <div class="identity-input mb-3">
      <FormFieldText v-model:value="formState.values.name" label="Name" />
    </div>

    <div class="identity-input mb-3">
      <FormFieldText v-model:value="formState.values.surname" label="Surname" />
    </div>

    <!-- TODO - fix this -->
    <div class="identity-input mb-3">
      <FormFieldRadio v-model:value="formState.values.active" :options="['unactive', 'active']" />
    </div>

    <div class="identity-input mb-3">
      <FormFieldText v-model:value="formState.values.note" label="Note" />
    </div>
  </form>
</template>
