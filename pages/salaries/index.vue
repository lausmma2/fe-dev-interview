<script setup lang="ts">
  import SalaryForm from './_components/SalaryForm.vue';
  import { getSalaries } from '~/api/salaries/getSalaries';
  import PageWrapper from '~/components/PageWrapper.vue';
  import { FormTypeValues, type FormType } from '~/types/formType';
  import type { Salary } from '~/types/salary';
  import { setPageTitle } from '~/utils/pageTitle';

  setPageTitle('Salaries');

  const isModalOpened = ref<boolean>(false);

  const salariesQuery = reactive<{ items: Salary[]; isLoading: boolean; error: unknown }>({
    items: [],
    isLoading: false,
    error: null,
  });

  const formData = ref({
    user: '',
    money: '',
    year: '',
    month: '',
  });

  const salaryFormProps = reactive<{ formType: FormType }>({
    formType: FormTypeValues.CREATE,
  });

  const fetchData = async () => {
    salariesQuery.isLoading = true;
    salariesQuery.error = null;

    try {
      const response = await getSalaries();
      salariesQuery.items = response.items;
    } catch (err) {
      salariesQuery.error = err;
    } finally {
      salariesQuery.isLoading = false;
    }
  };

  const openCreateSalaryForm = () => {
    isModalOpened.value = !isModalOpened.value;
    salaryFormProps.formType = FormTypeValues.CREATE;
  };

  const columns = [
    { label: 'Money', name: 'money', width: '10rem' },
    { label: 'Year', name: 'year', width: '10rem' },
    { label: 'Month', name: 'month', width: '10rem' },
    { label: 'Created At', name: 'createdAt', type: 'dateTime', width: '12rem' },
    { label: 'Updated At', name: 'updatedAt', type: 'dateTime', width: '12rem' },
  ];

  const handleClose = () => {
    // eslint-disable-next-line
    console.log('Closing...!');
  };

  const handleSubmit = () => {
    // eslint-disable-next-line
    console.log('formData:', formData);
  };

  // Call the users data when mounted
  onMounted(fetchData);
</script>

<template>
  <PageWrapper>
    <div class="flex flex-col items-start gap-4 overflow-x-auto">
      <button
        class="flex bg-primary text-white px-2 py-1 rounded-md gap-1 items-center"
        @click="openCreateSalaryForm"
      >
        <img src="@/assets/icons/add-icon.svg" width="20" height="20" style="filter: invert(1)" />
        <div>Create new salary</div>
      </button>

      <div v-if="salariesQuery.error" class="text-red-600">
        {{ salariesQuery.error }}
      </div>

      <DataTable :value="salariesQuery.items" table-style="min-width: 50rem">
        <Column
          v-for="column in columns"
          :key="column.name"
          :field="column.name"
          :header="column.label"
        />
      </DataTable>
    </div>
  </PageWrapper>
  <Modal
    :title="'Create new salary'"
    :is-opened="isModalOpened"
    :on-close="handleClose"
    :on-submit="handleSubmit"
  >
    <SalaryForm @form-data="(data) => (formData = data)" />
  </Modal>
</template>
