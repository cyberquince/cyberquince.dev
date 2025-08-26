<template>
  <footer class="footer">
    <div class="footer_info">
      <div class="footer_left">
        <div class="footer_left-text">
          <p class="pre">
            {{ $t('footer.work_together') }}
          </p>
        </div>
        <div class="footer_left-button">
          <button
            type="button"
            class="btn btn_submit"
            @click="openForm"
          >
            {{ $t('footer.button_text') }}
          </button>
        </div>
      </div>
      <div class="footer_right">
        <div class="footer_right-email">
          <a
            href="mailto:hello@cyberquince.dev"
            class="base_link"
          >
            {{ $t('footer.email') }}
          </a>
        </div>
        <div class="footer_right-numbers">
          <a
            :href="`tel:${$t('footer.mobile.md')}`"
            class="base_link"
            v-html="makePrettyMobile($t('footer.mobile.md'))"
          />
          <a
            :href="`tel:${$t('footer.mobile.ru')}`"
            class="base_link"
            v-html="makePrettyMobile($t('footer.mobile.ru'))"
          />
        </div>
        <div class="footer_right-socials">
          <div class="social_instagram">
            <a
              href="//instagram.com/cyberquince.dev"
              class="base_link"
              target="_blank"
            >
              <i class="cq-icon brand wh-40 instagram" />
            </a>
          </div>
          <div class="social_facebook">
            <a
              href="//facebook.com/cyberquince.dev"
              class="base_link"
              target="_blank"
            >
              <i class="cq-icon brand wh-40 facebook" />
            </a>
          </div>
          <div class="social_telegram aspect">
            <a
              href="//t.me/cyberquince.dev"
              class="base_link"
              target="_blank"
            >
              <i class="cq-icon brand wh-40 telegram" />
            </a>
          </div>
          <div class="social_vk aspect">
            <a
              href="//vk.com/cyberquince.dev"
              class="base_link"
              target="_blank"
            >
              <i class="cq-icon brand wh-40 vk" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer_copy">
      <span>All rights reserved.</span>
      <NuxtLink to="/">
        <img
          src="/img/logo.png"
          alt="Logotype"
        >
      </NuxtLink>
      <span>2025</span>
    </div>
  </footer>
</template>

<script>
import { markRaw } from 'vue';
import parsePhoneNumber from 'libphonenumber-js';
import AppInfoForm from './form.vue';

export default {
  name: 'AppFooter',
  emits: ['open-modal'],
  methods: {
    makePrettyMobile(number) {
      const phone = parsePhoneNumber(number);
      const countryCallingCode = `+${phone.countryCallingCode}`;
      const nationalNumber = phone.nationalNumber;
      const formatted = phone.formatNational();
      let operatorDigits = '';
      if (formatted.includes('(')) {
        const match = formatted.match(/\((\d+)\)/);
        operatorDigits = match ? match[1] : '';
      }
      else {
        const parts = formatted.split(/[\s-]+/);
        operatorDigits = parts[0].slice(1);
      }
      const operator = `${countryCallingCode} (${operatorDigits})`;
      const restDigits = nationalNumber.slice(operatorDigits.length);
      let tail = restDigits.slice(-4);
      let main = restDigits.slice(0, -4);
      if (phone.country === 'MD') {
        tail = restDigits.slice(-3);
        main = restDigits.slice(0, -3);
      }
      const tailFormatted = tail.length === 4 ? `${tail.slice(0, 2)}-${tail.slice(2)}` : tail;
      const rest = `${main}${main && tailFormatted ? '-' : ''}${tailFormatted}`;
      return `${operator} <span class="aspect">${rest}</span>`;
    },
    openForm() {
      const form = markRaw(AppInfoForm);
      this.$emit('open-modal', form, { formTitle: this.$t('footer.form.title'), caller: 'footer' });
    },
  },
};
</script>

<style lang="scss" scoped>
.footer{
  background: $black;
  max-width: 1440px;
  margin: 0 auto;
  padding: 30px 30px 0px 30px;
  box-sizing: border-box;
  @media screen {
    @media (max-width: 440px) {
      padding: 30px 15px 0 15px;
    }
  }
  &_info{
    display: flex;
    justify-content: space-around;
    align-items: center;
    @media screen {
      @media (max-width: 777px) {
        flex-direction: column;
      }
    }
  }
  &_left{
    max-width: 400px;
    height: 250px;
    @media screen {
      @media (max-width: 777px) {
        margin-bottom: 50px;
      }
    }
    &-text{
      font-size: 58px;
      text-align: center;
      margin-bottom: 35px;
    }
    &-button{
      @media screen {
        @media (max-width: 480px) {
          display: flex;
          align-items: center;
          justify-content: center;
          .btn_submit{
            width: 90%;
         }
        }
      }
      .btn_submit{
        width: 100%;
        height: 75px;
        font-size: 32px;
        color: $white;
        &:before,
        &:after{
          font-size: 24px;
          top: calc(50% - 12px);
        }
        &:before{
          left: 32px;
        }
        &:after{
          right: 32px;
        }
      }
    }
  }
  &_right{
    &-email{
      font-size: 32px;
      margin-bottom: 30px;
      padding-bottom: 5px;
      border-bottom: 2px solid transparent;
      &:hover{
        border-bottom: 2px solid $purple;
      }
    }
    &-numbers{
      a{
        display: block;
        padding-bottom: 5px;
        margin-right: 20px;
        margin-bottom: 30px;
        border-bottom: 2px solid transparent;
        &:hover{
          border-bottom: 2px solid $purple;
        }
      }
      font-size: 32px;
    }
    &-socials{
      width: 100%;
      justify-content: space-between;
      display: flex;
    }
  }
  &_copy{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    margin-bottom: 30px;
    @media screen {
      @media (max-width: 777px) {
        margin-top: 50px;
      }
    }
    .base_link{
      display: flex;
    }
  }
}
</style>
