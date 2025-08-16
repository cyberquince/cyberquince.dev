<template>
  <article class="webdev">
    <ServiceBlock name="web_page" :blockCount="2"
      :blocks="blocks"/>
    <Solutions :options="$tm('web_page.solutions')" />
  </article>
</template>
<script>
import ServiceBlock from '../components/ServiceBlock.vue';
import Solutions from '../components/Solutions.vue';

export default {
  name: 'WebDevView',
  components: { ServiceBlock, Solutions },
  data() {
    return {
      blocks: ['adaptive', 'stack', 'api', 'speed'],
    };
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.webdev{
}
</style>
