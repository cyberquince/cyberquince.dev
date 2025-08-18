<template>
  <div class="form">
    <div class="form_title" v-if="formTitle">
      <h3 class="title">{{ formTitle }}</h3>
    </div>
    <form class="form_form" @submit.prevent="sendInfo" ref="infoForm">
      <input type="text" :placeholder="$t('contacts.form.name')" required class="input_wide"
      autocomplete="off" v-model="formInfo.name">
      <VueTelInput v-model="formInfo.phone" class="input_number"
      :inputOptions="inputOpts" />
      <input type="email" required autocomplete="off" placeholder="Email" class="input_wide"
      v-model="formInfo.email">
      <textarea name="about" id="about" class="input_wide"
        v-model="formInfo.about" :placeholder="$t('contacts.form.about')"></textarea>
      <div class="form_row">
        <InputFile v-model:file="formInfo.attachment" />
        <vue-turnstile v-model="token" site-key="0x4AAAAAABsUTRheKYnt7g0n" theme="dark"
          :language="turnstileLang" class="captcha"/>
      </div>
      <button type="submit" class="btn btn_submit">{{ $t('contacts.form.submit') }}</button>
      <p class="pre" v-if="formResult">{{ $t(`contacts.form.${formResult}`) }}</p>
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
      token: '',
      formResult: null,
      formInfo: {
        about: null,
        name: null,
        phone: null,
        email: null,
        attachment: null,
      },
    };
  },
  methods: {
    sendInfo() {
      const formData = new FormData();
      Object.entries(this.formInfo).forEach(([k, v]) => {
        if (k !== 'attachment') {
          formData.append(k, v);
        }
      });
      if (this.formInfo.attachment && this.formInfo.attachment.length > 0) {
        Array.from(this.formInfo.attachment).forEach((file) => {
          formData.append('attachments[]', file);
        });
      }
      fetch('/handlers/submit_form.php', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          this.formResult = data.status;
          if (data.status === 'success') {
            this.$refs.infoForm.reset();
          }
          setTimeout(() => {
            this.formResult = null;
          }, 5000);
        })
        .catch((err) => {
          console.error('Error: ', err);
          this.formResult = 'error';
        });
    },
  },
  computed: {
    turnstileLang() {
      return `${this.$store.getters.countryCode}-${this.$store.getters.countryCode}`;
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.form{
  height: 100%;
  @media screen {
    @media (max-width: 570px) {
      height: 500px;
    }
  }
  &_row{
    display: flex;
    justify-content: space-between;
    gap: 10px;
    & > div{
      flex-basis: calc(50% - 20px);
      @media screen {
        @media (max-width: 570px) {
          flex-basis: 100%;
        }
      }
    }
    .captcha{
      display: flex;
      align-items: center;
      justify-content: center;
       @media screen {
        @media (max-width: 570px) {
          // margin-bottom: 10px;
        }
      }
    }
    @media screen {
      @media (max-width: 570px) {
        flex-direction: column;
      }
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
