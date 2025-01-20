<script setup lang="ts">
  import LoginForm from './_components/LoginForm.vue';
  import PageWrapper from '~/components/PageWrapper.vue';
  import { setPageTitle } from '~/utils/pageTitle';
  setPageTitle('Login');
</script>

<template>
  <PageWrapper>
    <LoginForm />
  </PageWrapper>
</template>
