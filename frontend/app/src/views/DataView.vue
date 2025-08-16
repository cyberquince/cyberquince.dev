<template>
  <article class="data">
    <ServiceBlock name="engineer_page" :blockCount="2"
      :blocks="blocks" />
  </article>
</template>
<script>
import ServiceBlock from '../components/ServiceBlock.vue';

export default {
  name: 'DataView',
  components: { ServiceBlock },
  data() {
    return {
      blocks: ['integration', 'architecture', 'analytics', 'automatization'],
    };
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.data{
  padding-bottom: 80px;
}
</style>
