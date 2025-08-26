<template>
  <article class="ux">
    <AppServices name="ux_page" :blocks="blocks" row show-hr />
    <AppSteps :steps="$tm('ux_page.steps')" />
  </article>
</template>

<script>
export default {
  name: 'DesignPage',
  data() {
    return {
      blocks: ['determination', 'development', 'visualize', 'optimization'],
    };
  },
};
</script>
