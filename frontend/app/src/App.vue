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
    console.log(this.$store.getters.countryCode);
    if (!this.$store.getters.countryCode) {
      this.$store.dispatch('fetchCountry');
    }
    this.$store.dispatch('changeLocale', this.$store.getters.countryCode);
  },
};
</script>
<style lang="scss">
</style>
