<template>
  <div>
    <transition name="fade">
      <div v-if="isOpen" class="modal" @click.self="close">
        <div class="modal_wrapper">
          <component v-bind="modalProps" :is="component" @close="close" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppModal',
  props: {
    component: {
      type: Object,
      required: false,
    },
    modalProps: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    close() {
      this.isOpen = false;
    },
    open() {
      this.isOpen = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  background: rgba($color: $black, $alpha: .4);
  &_wrapper{
    padding: 20px 22px;
    background: $black;
    height: 500px;
    width: 50%;
    border-radius: 16px;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
