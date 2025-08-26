<template>
  <div class="form">
    <div v-if="formTitle" class="form_title">
      <h3 class="title" :class="{ centered: caller }">
        {{ formTitle }}
      </h3>
    </div>
    <form ref="infoForm" class="form_form" @submit.prevent="sendInfo">
      <input
        v-model="formInfo.name"
        type="text"
        required
        autocomplete="off"
        :placeholder="$t('contacts.form.name')"
        class="input_wide"
      >
      <VueTelInput v-model="formInfo.phone" class="input_number" :input-options="inputOpts" />
      <input
        v-model="formInfo.email"
        type="email"
        autocomplete="off"
        placeholder="Email"
        class="input_wide"
      >
      <textarea
        id="about"
        v-model="formInfo.about"
        name="about"
        :placeholder="$t('contacts.form.about')"
        class="input_wide"
      />
      <div class="form_row">
        <AppInputFile v-model:file="formInfo.attachment" />
        <VueTurnstile
          v-if="checkBot"
          v-model="token"
          :site-key="vtSiteKey"
          theme="dark"
          :language="turnstileLang"
          class="captcha"
        />
      </div>
      <button type="submit" class="btn btn_submit">
        {{ $t('contacts.form.submit') }}
      </button>
      <p v-if="formResult" class="pre">
        {{ $t(`contacts.form.${formResult}`) }}
      </p>
    </form>
  </div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input';
import VueTurnstile from 'vue-turnstile';
import 'vue-tel-input/dist/vue-tel-input.css';
import { useCountry } from '~/composables/useCountry';

export default {
  name: 'AppInfoForm',
  components: { VueTelInput, VueTurnstile },
  props: {
    formTitle: {
      type: String,
      required: false,
    },
    caller: {
      type: String,
      required: false,
    },
  },
  emits: ['close'],
  data() {
    return {
      store: useCountry(),
      inputOpts: {
        autocomplete: 'off',
        placeholder: this.$t('contacts.form.number'),
        required: true,
      },
      checkBot: false,
      token: '',
      vtSiteKey: '0x4AAAAAABsUTRheKYnt7g0n',
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
  computed: {
    turnstileLang() {
      return `${this.store.locale}-${this.store.locale}`;
    },
  },
  methods: {
    async sendInfo() {
      console.log('Sending form data');
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
      $fetch('/api/forms/contacts', { method: 'POST', body: formData })
        .then((resp) => {
          this.formResult = resp.status;
          console.log(resp);
          setTimeout(() => {
            this.formResult = null;
            if (this.caller) {
              this.$emit('close');
            }
          }, 5000);
        })
        .catch(err => console.error(err));
      // try {
      //   const result = await useFetch('/api/forms/contacts', { method: 'POST', body: body });
      //   console.log(result);
      //   this.formResult = 'success';
      // }
      // catch (e) {
      //   this.formResult = e.status;
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
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
