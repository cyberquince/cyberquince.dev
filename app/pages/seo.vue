<template>
  <article class="seo">
    <AppServices name="seo_page" :blocks="blocks" row show-hr />
    <AppSolutions :options="$tm('seo_page.solutions')" />
  </article>
</template>

<script>
export default {
  name: 'SeoPage',
  data() {
    return {
      blocks: ['audit', 'semantics', 'on_page', 'optimization'],
    };
  },
};
</script>
