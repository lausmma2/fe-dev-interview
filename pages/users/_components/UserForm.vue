<script setup lang="ts">
  import { reactive } from 'vue';
  import type { FormProps } from '~/types/formProps';
  import type { FormType } from '~/types/formType';
  import type { FormUser } from '~/types/user';
  const props = defineProps<{
    formData: FormUser;
    formType: FormType;
  }>();

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
    } & { type: FormType } & FormProps
  >({
    values: {
      email: '',
      name: '',
      surname: '',
      active: false,
      plainPassword: '',
      note: '',
    },
    type: props.formType,
    isLoading: false,
    error: null,
  });

  watch(
    () => props.formData,
    (defaultData) => {
      Object.assign(formState.values, defaultData);
    },
  );

  const radioOptions = [
    {
      label: 'unactive',
      value: false,
    },
    {
      label: 'active',
      value: true,
    },
  ];

  const errorState = ref('');

  const emit = defineEmits(['formData', 'errorState']);

  const handleErrorState = (err: string) => {
    errorState.value = err;
    emit('errorState', errorState.value);
  };

  emit('formData', formState);
</script>

<template>
  <form class="rounded w-full max-w-xs">
    <div class="identity-input mb-3">
      <FormFieldText
        v-model:value="formState.values.email"
        label="E-mail"
        type="email"
        @error-state="handleErrorState"
      />
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
      <FormFieldRadio v-model:value="formState.values.active" :options="radioOptions" />
    </div>

    <div class="identity-input mb-3">
      <FormFieldText v-model:value="formState.values.note" label="Note" />
    </div>
  </form>
</template>
