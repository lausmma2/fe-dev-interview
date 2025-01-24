<script setup lang="ts">
  import { getSalaries } from '~/api/salaries/getSalaries';
  import PageWrapper from '~/components/PageWrapper.vue';
  import type { Salary } from '~/types/salary';
  import { setPageTitle } from '~/utils/pageTitle';

  setPageTitle('Salaries');

  const salariesQuery = reactive<{ items: Salary[]; isLoading: boolean; error: unknown }>({
    items: [],
    isLoading: false,
    error: null,
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

  const columns = [
    { label: 'Money', name: 'money', width: '10rem' },
    { label: 'Year', name: 'year', width: '10rem' },
    { label: 'Month', name: 'month', width: '10rem' },
    { label: 'Created At', name: 'createdAt', type: 'dateTime', width: '12rem' },
    { label: 'Updated At', name: 'updatedAt', type: 'dateTime', width: '12rem' },
  ];

  // Call the users data when mounted
  onMounted(fetchData);
</script>

<template>
  <PageWrapper>
    <DataTable :value="salariesQuery.items" table-style="min-width: 50rem">
      <Column
        v-for="column in columns"
        :key="column.name"
        :field="column.name"
        :header="column.label"
      />
    </DataTable>
  </PageWrapper>
</template>
