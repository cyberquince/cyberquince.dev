<template>
  <NuxtLayout name="undef">
    <div class="error_wrapper">
      <h1 class="enourmous">
        {{ error.statusCode }}
        <br>
        <span>{{ $t(`error.${error?.statusCode}`) }}</span>
      </h1>
      <NuxtLink to="/" class="base_link btn_submit big">{{ $t('error.go_home') }}</NuxtLink>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<style lang="scss" scoped>
.enourmous{
  user-select: none;
  color: $dark-blue;
  span{
    color: $white;
  }
}
.error_wrapper{
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.btn_submit{
  margin: 40px auto;
  max-width: 404px;
  font-size: 56px;
  white-space: nowrap;
  height: 60px;
}
</style>
