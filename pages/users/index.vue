<script setup lang="ts">
  import { reactive, onMounted, ref } from 'vue';
  import UserForm from './_components/UserForm.vue';
  import { getUsers } from '~/api/getUsers';
  import PageWrapper from '~/components/PageWrapper.vue';
  import Table from '~/components/Table.vue';
  import type { User } from '~/types/user';
  import { setPageTitle } from '~/utils/pageTitle';
  import type { FormProps } from '~/types/formProps';
  import { createUser } from '~/api/createUser';

  setPageTitle('Users');

  const isModalOpened = ref<boolean>(false);

  const usersQuery = reactive<{ items: User[]; isLoading: boolean; error: unknown }>({
    items: [],
    isLoading: false,
    error: null,
  });

  const fetchData = async () => {
    usersQuery.isLoading = true;
    usersQuery.error = null;

    try {
      const response = await getUsers();
      usersQuery.items = response.items;
    } catch (err) {
      usersQuery.error = err;
    } finally {
      usersQuery.isLoading = false;
    }
  };

  onMounted(fetchData);

  const columns = [
    { name: 'email', width: '10rem' },
    { name: 'name', width: '10rem' },
    { name: 'active', width: '10rem' },
  ];

  const handleClose = () => {
    isModalOpened.value = false;
  };

  const formData = ref<
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

  const errorState = ref('');

  const handleErrorState = (err: string) => {
    errorState.value = err;
  };

  const handleSubmit = async () => {
    formData.value.isLoading = true;
    formData.value.error = null;

    if (errorState.value.length > 0) {
      return;
    }

    try {
      await createUser(
        formData.value.values.email,
        formData.value.values.name,
        formData.value.values.surname,
        formData.value.values.active,
        formData.value.values.plainPassword,
        formData.value.values.note,
      );
    } catch (err) {
      formData.value.error = err;
    } finally {
      formData.value.isLoading = false;
    }
  };
</script>

<template>
  <PageWrapper>
    <div class="flex flex-col items-start gap-4">
      <button
        class="flex bg-primary text-white px-2 py-1 rounded-md gap-1 items-center"
        @click="isModalOpened = !isModalOpened"
      >
        <img src="@/assets/icons/add-icon.svg" width="20" height="20" style="filter: invert(1)" />
        <div>Add new record</div>
      </button>
      <Table :columns="columns" :rows="usersQuery.items" :is-loading="usersQuery.isLoading" />
    </div>
  </PageWrapper>
  <Modal
    :title="'Add new user'"
    :is-opened="isModalOpened"
    :on-close="handleClose"
    :on-submit="handleSubmit"
  >
    <UserForm @form-data="(data) => (formData = data)" @error-state="handleErrorState" />
  </Modal>
</template>
