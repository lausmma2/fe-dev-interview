<script setup lang="ts">
  type Row = { [key: string]: string | boolean };
  type Column = { name: string; width: string };

  const props = defineProps<{
    rows: Row[];
    columns: Column[];
    isLoading: boolean;
    deleteRecord: (id: string) => void;
  }>();
</script>

<template>
  <div class="relative overflow-x-auto shadow-md rounded-lg max-h-[80%]">
    <table class="w-full text-sm text-left">
      <!-- Table Header -->
      <thead class="text-md text-primary capitalize bg-gray-200">
        <tr>
          <th
            v-for="column in props.columns"
            :key="column.name"
            scope="col"
            class="px-6 py-3"
            :style="{ width: column.width }"
          >
            {{ column.name }}
          </th>
          <th class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <!-- Table Body -->
      <LoadingSpinner v-if="props.isLoading" />
      <tbody v-else>
        <tr
          v-for="(row, index) in props.rows"
          :key="index"
          class="bg-white border-b hover:bg-blue-50"
        >
          <th scope="row" class="px-6 py-4 font-semibold text-primary text-md whitespace-nowrap">
            {{ row[props.columns[0].name] }}
          </th>
          <td v-for="column in props.columns.slice(1)" :key="column.name" class="px-6 py-4">
            {{ row[column.name] }}
          </td>
          <td class="px-6 py-4 text-center">
            <button
              class="text-red-600 hover:text-red-800"
              @click="props.deleteRecord(row.id as string)"
            >
              <img src="@/assets/icons/trash-icon.svg" width="20" height="20" alt="Delete" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
