<script setup lang="ts">
  import { setPageTitle } from '~/utils/pageTitle';
  import Table from '~/components/Table.vue';
  setPageTitle('Users');

  const columns = ['email', 'name', 'status'];
  const _rowsMocked = [
    { email: 'test@test.cz', name: 'Test 1', status: 'active' },
    { email: 'test@test.eu', name: 'Test 2', status: 'inactive' },
    { email: 'test@test.com', name: 'Test 3', status: 'active' },
  ];
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <Table :columns="columns" :rows="_rowsMocked" />
  </div>
</template>
