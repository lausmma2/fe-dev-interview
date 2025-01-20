<script setup lang="ts">
  import { reactive } from 'vue';
  import { login } from '~/api/login';
  import type { FormProps } from '~/types/FormProps';
  const formState = reactive<
    {
      values: {
        email: string;
        password: string;
      };
    } & FormProps
  >({
    values: {
      email: '',
      password: '',
    },
    isLoading: false,
    error: null,
  });
  const submit = async () => {
    formState.isLoading = true;
    formState.error = null;
    try {
      // TODO - get JWT from response and store it into cookies or LS
      await login(formState.values.email, formState.values.password);
    } catch (err) {
      formState.error = err;
    } finally {
      formState.isLoading = false;
    }
  };
</script>

<template>
  <div class="flex justify-center items-center w-full">
    <div class="w-full max-w-xs">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="submit">
        <div class="identity-input mb-4">
          <label for="identity" class="block text-gray-700 text-sm font-bold mb-2"> Email</label>
          <input
            id="identity"
            v-model="formState.values.email"
            class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="user@user.com"
          />
        </div>

        <div class="password-input mb-6">
          <label for="identity" class="block text-gray-700 text-sm font-bold mb-2">Password</label>

          <input
            id="password"
            v-model="formState.values.password"
            class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="*******"
          />
        </div>

        <button
          class="bg-primary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>
