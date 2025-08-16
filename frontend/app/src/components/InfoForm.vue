<template>
  <div class="form">
    <div class="form_title" v-if="formTitle">
      <h3 class="title">{{ formTitle }}</h3>
    </div>
    <textarea name="about" id="about" class="input_wide"
      v-model="formInfo.about" :placeholder="$t('contacts.form.about')"></textarea>
    <input type="text" :placeholder="$t('contacts.form.name')" required class="input_wide"
      autocomplete="off" v-model="formInfo.name">
    <InputPhone />
    <input type="email" required autocomplete="off" placeholder="Email" class="input_wide"
      v-model="formInfo.email">
    <div class="form_row"></div>
    <button type="submit" class="btn btn_submit">{{ $t('contacts.form.submit') }}</button>
  </div>
</template>
<script>
import InputPhone from './InputPhone.vue';

export default {
  name: 'InfoForm',
  components: { InputPhone },
  props: {
    formTitle: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      formInfo: {
        about: null,
        name: null,
        phone: null,
        email: null,
        attachment: null,
        captchaVerified: false,
      },
    };
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.form{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  &_title{
    width: 100%;
    font-size: 36px;
    @media screen {
      @media (max-width: 1100px) {
        text-align: center;
      }
      @media (max-width: 430px) {
        text-align: center;
        font-size: 8vw;
      }
    }
  }
  .btn_submit{
    height: 50px;
    font-size: 24px;
  }
}
</style>
