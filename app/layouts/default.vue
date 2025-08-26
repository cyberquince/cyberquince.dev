<template>
  <div>
    <AppHeader />
    <main class="content">
      <slot />
    </main>
    <AppModal ref="appModal" :modal-props="modalProps" :component="cComponent" />
    <AppFooter @open-modal="openModal" />
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      modalProps: {},
      cComponent: null,
    };
  },
  methods: {
    openModal(component, props = {}) {
      this.cComponent = component;
      this.modalProps = props;
      this.$refs.appModal.open();
    },
    closeModal() {
      this.$refs.appModal.close();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
