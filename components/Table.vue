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
          <!-- Actions column -->
          <td class="px-6 py-4 text-center">
            <button
              class="text-red-600 hover:text-red-800"
              @click="props.deleteRecord(row.id as string)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 28 28"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
