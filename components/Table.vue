<script setup lang="ts">
  type Row = { [key: string]: string };
  type Column = string;

  const props = defineProps<{
    rows: Row[];
    columns: Column[];
  }>();
</script>
<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left">
      <!-- Table Header -->
      <thead class="text-md text-primary capitalize bg-gray-300">
        <tr>
          <th v-for="column in props.columns" :key="column" scope="col" class="px-6 py-3">
            {{ column }}
          </th>
        </tr>
      </thead>
      <!-- Table Body -->
      <tbody>
        <tr
          v-for="(row, index) in props.rows"
          :key="index"
          class="bg-white border-b hover:bg-blue-50"
        >
          <th scope="row" class="px-6 py-4 font-semibold text-primary text-md whitespace-nowrap">
            {{ row[props.columns[0]] }}
          </th>
          <td v-for="column in props.columns.slice(1)" :key="column" class="px-6 py-4">
            {{ row[column] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
