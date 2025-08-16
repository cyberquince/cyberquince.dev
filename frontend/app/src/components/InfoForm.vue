<template>
  <div class="form">
    <div class="form_title" v-if="formTitle">
      <h3 class="title">{{ formTitle }}</h3>
    </div>
    <form class="form_form" @submit.prevent="sendInfo">
      <input type="text" :placeholder="$t('contacts.form.name')" required class="input_wide"
      autocomplete="off" v-model="formInfo.name">
      <VueTelInput v-model="formInfo.phone" class="input_number"
      :inputOptions="inputOpts" />
      <input type="email" required autocomplete="off" placeholder="Email" class="input_wide"
      v-model="formInfo.email">
      <textarea name="about" id="about" class="input_wide"
        v-model="formInfo.about" :placeholder="$t('contacts.form.about')"></textarea>
      <div class="form_row">
        <InputFile />
        <vue-turnstile v-model="token" site-key="0x4AAAAAABsUTRheKYnt7g0n" theme="dark"
          :language="$store.getters.countryCode.toUpperCase()" class="captcha"/>
      </div>
      <button type="submit" class="btn btn_submit">{{ $t('contacts.form.submit') }}</button>
    </form>
  </div>
</template>
<script>
import { VueTelInput } from 'vue-tel-input';
import VueTurnstile from 'vue-turnstile';
import 'vue-tel-input/dist/vue-tel-input.css';
import InputFile from './InputFile.vue';

export default {
  name: 'InfoForm',
  components: { VueTelInput, VueTurnstile, InputFile },
  props: {
    formTitle: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      inputOpts: {
        autocomplete: 'off',
        placeholder: this.$t('contacts.form.number'),
        required: true,
      },
      token: null,
      formInfo: {
        about: null,
        name: null,
        phone: null,
        email: null,
        attachment: null,
      },
      captchaVerified: false,
    };
  },
  methods: {
    sendInfo() {
      console.log(this.formInfo);
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.form{
  height: 100%;
  &_row{
    display: flex;
    justify-content: space-between;
    & > div{
      flex-basis: calc(50% - 20px);
    }
    .captcha{
      display: flex;
      margin: 0;
      border-radius: 12px;
    }
  }
  &_form{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100% - 62px);
  }
  &_title{
    width: 100%;
    margin-bottom: 20px;
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
