<script setup lang="ts">
  import { reactive, onMounted } from 'vue';
  import { getUsers } from '~/api/getUsers';
  import PageWrapper from '~/components/PageWrapper.vue';
  import Table from '~/components/Table.vue';
  import type { User } from '~/types/user';
  import { setPageTitle } from '~/utils/pageTitle';

  setPageTitle('Users');

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
</script>

<template>
  <PageWrapper>
    <Table :columns="columns" :rows="usersQuery.items" :is-loading="usersQuery.isLoading" />
  </PageWrapper>
</template>
