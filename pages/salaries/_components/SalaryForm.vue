<script setup lang="ts">
  import { getUsers } from '~/api/users/getUsers';
  import type { User } from '~/types/user';

  const usersQuery = reactive<{ items: User[]; isLoading: boolean; error: unknown }>({
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

  const userOptions = computed(() =>
    usersQuery.items.map(user => ({ label: `${user.name} ${user.surname}`, value: user.id })),
  );

  const emit = defineEmits(['formData']);
  emit('formData', formData.value);
</script>

<template>
  <FormKit
    id="user"
    v-model="formData.user"
    type="select"
    label="User"
    name="user"
    placeholder="Select user"
    :options="userOptions"
  />
  <FormKit
    id="money"
    v-model="formData.money"
    type="number"
    name="money"
    label="Money"
    placeholder="99999"
    validation="min:20000|max:99999"
    validation-visibility="live"
    max="99999"
  />
  <FormKit
    id="year"
    v-model="formData.year"
    type="number"
    name="year"
    label="Year"
    placeholder="199999"
    validation="min:20000"
    validation-visibility="live"
    min="20000"
    max="999999"
  />
  <FormKit
    id="month"
    v-model="formData.month"
    type="number"
    name="month"
    label="Month"
    placeholder="6"
    validation="min:1|max:12"
    validation-visibility="live"
    min="1"
    max="12"
  />
</template>
