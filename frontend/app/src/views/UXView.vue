<template>
  <article class="ux">
    <ServiceBlock name="ux_page" :blockCount="4"
      :blocks="blocks" showHr/>
    <Steps :steps="$tm('ux_page.steps')" />
  </article>
</template>
<script>
import ServiceBlock from '../components/ServiceBlock.vue';
import Steps from '../components/Steps.vue';

export default {
  name: 'UXView',
  components: { ServiceBlock, Steps },
  data() {
    return {
      blocks: ['determination', 'development', 'visualize', 'optimization'],
    };
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.ux{
}
</style>
