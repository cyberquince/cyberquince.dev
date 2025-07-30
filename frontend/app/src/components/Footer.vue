<template>
  <footer class="footer">
    <div class="footer_info">
      <div class="footer_left">
        <div class="footer_left-text">{{ $t('footer.work_together') }}</div>
        <div class="footer_left-button">
          <button type="button" class="btn btn_submit">
            {{ $t('footer.button_text') }}
          </button>
        </div>
      </div>
      <div class="footer_right">
        <div class="footer_right-email">
          <a href="mailto:hello@cyberquince.dev" class="base_link">
            hello@cyberquince.dev
          </a>
        </div>
        <div class="footer_right-numbers">
          <a :href="`tel:${$t('footer.mobile.md')}`" class="base_link"
            v-html="makePrettyMobile($t('footer.mobile.md'))">
          </a>
          <a :href="`tel:${$t('footer.mobile.ru')}`" class="base_link"
            v-html="makePrettyMobile($t('footer.mobile.ru'))">
          </a>
        </div>
        <div class="footer_right-socials">
          <div class="social_instagram">
            <a href="//instagram.com/cyberquince.dev" class="base_link">
              <i class="cq-icon wh-40 instagram"></i>
            </a>
          </div>
          <div class="social_facebook">
            <a href="//facebook.com/cyberquince.dev" class="base_link">
              <i class="cq-icon wh-40 facebook"></i>
            </a>
          </div>
          <div class="social_telegram">
            <a href="//t.me/cyberquince.dev" class="base_link">
              <i class="cq-icon wh-40 telegram"></i>
            </a>
          </div>
          <div class="social_vk aspect">
            <a href="//vk.com/cyberquince.dev" class="base_link">
              <i class="cq-icon wh-40 vk"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="footer_copy">
      All right reserved.
      <img :src="pathToImage('logo.png')" alt="logo">
      2025
    </div>
  </footer>
</template>
<script>
import parsePhoneNumber from 'libphonenumber-js';

export default {
  name: 'Footer',
  data() {
    return {};
  },
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
      } else {
        const parts = formatted.split(/[\s-]+/);
        operatorDigits = parts[0].slice(1);
      }
      const operator = `${countryCallingCode} (${operatorDigits})`;
      const restDigits = nationalNumber.slice(operatorDigits.length);
      const tail = restDigits.slice(-4);
      const main = restDigits.slice(0, -4);
      const tailFormatted = tail.length === 4 ? `${tail.slice(0, 2)}-${tail.slice(2)}` : tail;
      const rest = `${main}${main && tailFormatted ? '-' : ''}${tailFormatted}`;
      return `${operator} <span class="aspect">${rest}</span>`;
    },
    pathToImage(file) {
      const prefix = process.env === 'production' ? '/cyberquince.dev/' : '/';
      return `${prefix}img/${file}`;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.footer{
  background: $black;
  max-width: 1440px;
  margin: 0 auto;
  padding: 50px 30px 0px 30px;
  box-sizing: border-box;
  @media screen {
    @media (max-width: 440px) {
      padding: 30px 15px 0 15px;
    }
  }
  &_info{
    display: flex;
    justify-content: space-between;
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
      font-size: 64px;
      text-align: center;
      margin-bottom: 40px;
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
        height: 80px;
        font-size: 36px;
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
      font-size: 40px;
      margin-bottom: 30px;
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
      font-size: 40px;
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
  }
}
</style>
