<template>
  <article class="web">
    <AppServices name="web_page" :blocks="blocks" />
    <AppSolutions :options="$tm('web_page.solutions')" />
  </article>
</template>

<script>
export default {
  name: 'WebPage',
  data() {
    return {
      blocks: ['adaptive', 'stack', 'api', 'speed'],
    };
  },
};
</script>
