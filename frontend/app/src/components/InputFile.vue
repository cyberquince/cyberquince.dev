<template>
  <div class="input_file" @drop.prevent="handleDrop"
    @dragover.prevent="activateDrag"
    @dragleave.prevent="deactivateDrag"
    ref="mainInputFile">
    <label for="inp_file">
      <div class="input_file-area">
        <div class="input_file-placeholder" v-if="!file">
          Прикрепить файл
        </div>
        <div class="input_file-selected" v-else>{{ file.name }}</div>
      </div>
    </label>
    <input type="file" class="inv_input" id="inp_file" @change="handleFile">
  </div>
</template>
<script>
export default {
  name: 'InputFile',
  data() {
    return {
      file: null,
    };
  },
  methods: {
    handleFile(e) {
      const files = e.target.files;
      if (files.length > 0) {
        this.file = files[0];
      }
    },
    handleDrop(e) {
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        this.file = files[0];
      }
    },
    activateDrag() {
      this.$refs.mainInputFile.classList.add('active');
    },
    deactivateDrag() {
      this.$refs.mainInputFile.classList.remove('active');
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.input_file{
  &.active{
    .input_file-area{
      border-color: $blue;
    }
  }
  &-area{
    height: 63px;
    background: $card-bg;
    width: 100%;
    border-radius: 12px;
    border: 1px dashed transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &-placeholder{
    margin-top: 20px;
    color: rgba($color: white, $alpha: 0.6);
    position: relative;
    &:after{
      top: -20px;
      left: calc(50% - 10px);
      position: absolute;
      content: '\f15b';
      font-family: 'FontAwesome';
      font-weight: 600;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
  }
}
</style>
