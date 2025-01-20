<script setup lang="ts">
  import { reactive } from 'vue';
  import { createUser } from '~/api/createUser';
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

  const submit = async () => {
    formState.isLoading = true;
    formState.error = null;
    try {
      await createUser(
        formState.values.email,
        formState.values.name,
        formState.values.surname,
        formState.values.active,
        formState.values.plainPassword,
        formState.values.note,
      );
    } catch (err) {
      formState.error = err;
    } finally {
      formState.isLoading = false;
    }
  };
</script>

<template>
  <form class="rounded w-full max-w-xs" @submit.prevent="submit">
    <div class="identity-input mb-2">
      <FormFieldText label="E-mail" type="email" />
    </div>

    <div class="password-input mb-2">
      <FormFieldText label="Password" type="password" />
    </div>

    <div class="identity-input mb-2">
      <FormFieldText label="Name" />
    </div>

    <div class="identity-input mb-2">
      <FormFieldText label="Surname" />
    </div>

    <div class="identity-input mb-2">
      <FormFieldRadio :options="['unactive', 'active']" />
    </div>

    <div class="identity-input mb-2">
      <FormFieldText label="Note" />
    </div>
  </form>
</template>
