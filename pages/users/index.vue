<script setup lang="ts">
  import { reactive, onMounted, ref } from 'vue';
  import UserForm from './_components/UserForm.vue';
  import { getUsers } from '~/api/getUsers';
  import PageWrapper from '~/components/PageWrapper.vue';
  import Table from '~/components/Table.vue';
  import type { FormUser, User } from '~/types/user';
  import { setPageTitle } from '~/utils/pageTitle';
  import type { FormProps } from '~/types/formProps';
  import { createUser } from '~/api/createUser';
  import { deleteUser } from '~/api/deleteUser';
  import { FormTypeValues, type FormType } from '~/types/formType';
  import { updateUser } from '~/api/updateUser';

  setPageTitle('Users');

  const isModalOpened = ref<boolean>(false);

  const usersQuery = reactive<{ items: User[]; isLoading: boolean; error: unknown }>({
    items: [],
    isLoading: false,
    error: null,
  });

  const userFormProps = reactive<{ formType: FormType }>({
    formType: FormTypeValues.CREATE,
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

  const columns = [
    { name: 'email', width: '10rem' },
    { name: 'name', width: '10rem' },
    { name: 'surname', width: '10rem' },
    { name: 'active', width: '10rem' },
    { name: 'note', width: '15rem' },
    { name: 'createdAt', type: 'dateTime', width: '12rem' },
    { name: 'updatedAt', type: 'dateTime', width: '12rem' },
  ];

  const formData = ref<
    {
      values: FormUser;
    } & FormProps
  >({
    values: {
      id: '',
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

  onMounted(fetchData);

  const handleClose = () => {
    isModalOpened.value = false;

    // Reset the form values
    formData.value.values = {
      id: '',
      email: '',
      name: '',
      surname: '',
      active: false,
      plainPassword: '',
      note: '',
    };
  };

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
      if (userFormProps.formType === FormTypeValues.CREATE) {
        await createUser(
          formData.value.values.email,
          formData.value.values.name,
          formData.value.values.surname,
          formData.value.values.active,
          formData.value.values.plainPassword,
          formData.value.values.note,
        );
      } else {
        await updateUser(
          formData.value.values.id,
          formData.value.values.email,
          formData.value.values.name,
          formData.value.values.surname,
          formData.value.values.active,
          formData.value.values.plainPassword,
          formData.value.values.note,
        );
      }
      await fetchData();
      handleClose();
    } catch (err) {
      formData.value.error = err;
    } finally {
      formData.value.isLoading = false;
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      await deleteUser(id);
      await fetchData();
    } catch (err) {
      formData.value.error = err;
    } finally {
      formData.value.isLoading = false;
    }
  };

  const openCreateUserForm = () => {
    isModalOpened.value = !isModalOpened.value;
    userFormProps.formType = FormTypeValues.CREATE;
  };

  const editUser = (id: string) => {
    const row = usersQuery.items.find(user => user.id === id);
    if (row) {
      formData.value.values = {
        id,
        email: row.email,
        active: row.active,
        name: row.name,
        note: row.note,
        surname: row.surname,
        plainPassword: '', // It is not possible to get plainPassword, because it does not return in GET User object so empty string is used in the field
      };
      isModalOpened.value = true;
      userFormProps.formType = FormTypeValues.EDIT;
    }
  };
</script>

<template>
  <PageWrapper>
    <div class="flex flex-col items-start gap-4 overflow-x-auto">
      <button
        class="flex bg-primary text-white px-2 py-1 rounded-md gap-1 items-center"
        @click="openCreateUserForm"
      >
        <img src="@/assets/icons/add-icon.svg" width="20" height="20" style="filter: invert(1)" />
        <div>Add new record</div>
      </button>
      <div v-if="usersQuery.error" class="text-red-600">
        {{ usersQuery.error }}
      </div>
      <Table
        v-else
        :columns="columns"
        :rows="usersQuery.items"
        :is-loading="usersQuery.isLoading"
        :delete-record="deleteRecord"
        :edit-record="editUser"
      />
    </div>
  </PageWrapper>
  <Modal
    :title="'Add new user'"
    :is-opened="isModalOpened"
    :on-close="handleClose"
    :on-submit="handleSubmit"
  >
    <UserForm
      :form-type="userFormProps.formType"
      :form-data="formData.values"
      @form-data="(data) => (formData = data)"
      @error-state="handleErrorState"
    />
  </Modal>
</template>
