<script setup lang="ts">
  import LoginForm from './_components/LoginForm.vue';
  import PageWrapper from '~/components/PageWrapper.vue';
  import { setPageTitle } from '~/utils/pageTitle';
  setPageTitle('Login');

  const jwtToken = useCookie('jwtToken');

  if (jwtToken && jwtToken.value && jwtToken.value.length > 0) {
    navigateTo('/salaries');
  }
</script>

<template>
  <PageWrapper>
    <LoginForm />
  </PageWrapper>
</template>
