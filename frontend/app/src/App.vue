<template>
  <Header />
  <router-view class="content" />
  <Footer />
</template>
<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: { Header, Footer },
  data() {
    return {};
  },
  beforeMount() {
    if (!this.$store.getters.countryCode) {
      this.$store.dispatch('fetchCountry');
    }
  },
};
</script>
<style lang="scss">
</style>
