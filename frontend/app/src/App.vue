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
  methods: {
    manageTitle() {
      const title = this.$t(`routes.${this.$route.name}`);
      document.title = title;
    },
  },
  beforeMount() {
    if (!this.$store.getters.countryCode) this.$store.dispatch('fetchCountry');
    if (!this.$store.getters.locale) this.$store.dispatch('fetchLocale');
  },
  watch: {
    $route: 'manageTitle',
  },
};
</script>
<style lang="scss">
</style>
