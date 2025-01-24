<script setup lang="ts">
  import { paths } from '~/constants/paths';

  // Redirect from blank homepage to /users page
  navigateTo(paths.users);
</script>
