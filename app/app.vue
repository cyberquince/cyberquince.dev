<template>
  <nuxtLayout>
    <NuxtPage />
  </nuxtLayout>
</template>

<script>
import { useCountry } from './composables/useCountry';

export default {
  name: 'App',
  data() {
    return {
      store: useCountry(),
    };
  },
  async mounted() {
    await this.store.loadCountry();
    this.store.loadLocale();
  },
};
</script>
