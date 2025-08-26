<template>
  <div
    ref="mainInputFile"
    class="input_file"
    @drop.prevent="handleDrop"
    @dragover.prevent="activateDrag"
    @dragleave.prevent="deactivateDrag"
  >
    <label for="inp_file">
      <div class="input_file-area">
        <div v-if="!files" class="input_file-placeholder">
          {{ $t('contacts.form.attach') }}
        </div>
        <div v-else class="input_file-selected">{{ fileNames }}</div>
      </div>
    </label>
    <input
      id="inp_file"
      type="file"
      :accept="acceptedFileTypes"
      class="inv_input"
      multiple
      @change="handleFile"
    >
  </div>
</template>

<script>
export default {
  name: 'AppInputFile',
  emits: ['update:file'],
  data() {
    return {
      files: null,
      acceptedFileTypes: 'image/*, .pdf',
    };
  },
  computed: {
    fileNames() {
      if (!this.files) return null;
      const totalFiles = this.files.length;
      const fileNames = Array.from(this.files).map(file => file.name).join(',');
      return `(${totalFiles}) ${fileNames}`;
    },
  },
  methods: {
    handleFile(e) {
      const files = e.target.files;
      if (files.length > 0) {
        this.files = files;
        this.$emit('update:file', files);
      }
    },
    handleDrop(e) {
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        this.files = files;
        this.$emit('update:file', files);
      }
    },
    activateDrag() {
      this.$refs.mainInputFile.classList.add('active');
    },
    deactivateDrag() {
      this.$refs.mainInputFile.classList.remove('active');
    },
  },
};
</script>

<style lang="scss" scoped>
.input_file{
  label{
    cursor: pointer;
  }
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
  &-selected{
    max-width: 230px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
</style>
