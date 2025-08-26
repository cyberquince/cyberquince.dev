<template>
  <article class="data">
    <AppServices name="engineer_page" :blocks="blocks" />
  </article>
</template>

<script>
export default {
  name: 'DataPage',
  data() {
    return {
      blocks: ['integration', 'architecture', 'analytics', 'automatization'],
    };
  },
};
</script>

<style lang="scss">
.data{
  padding-bottom: 80px;
}
</style>
