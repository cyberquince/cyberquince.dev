<template>
  <article class="seo">
    <ServiceBlock name="seo_page" :blockCount="4"
      :blocks="blocks" showHr/>
    <Solutions :options="$tm('seo_page.solutions')" />
  </article>
</template>
<script>
import ServiceBlock from '../components/ServiceBlock.vue';
import Solutions from '../components/Solutions.vue';

export default {
  name: 'SEOView',
  components: { ServiceBlock, Solutions },
  data() {
    return {
      blocks: ['audit', 'semantics', 'on_page', 'optimization'],
    };
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.seo{
}
</style>
