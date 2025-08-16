<template>
  <div class="input_phone" :class="{ valid: isValid }">
    <transition name="fade-slide">
      <div class="input_phone-country" v-show="countryFlag">
        <span class="flag">{{ countryFlag }}</span>
        <span class="code">{{ dialCode }}</span>
      </div>
    </transition>
    <input type="tel" class="input_wide" :value="nationalNumber"
      @input="onInput" placeholder="+0 000 000-00-00">
  </div>
</template>
<script>
import { MazInputPhoneNumber } from 'maz-ui';

export default {
  name: 'InputPhone',
  components: { MazInputPhoneNumber },
  data() {
    return {
      rawInput: '',
      nationalNumber: null,
      countryCode: null,
      countryFlag: null,
      dialCode: null,
      isValid: true,
    };
  },
  computed: {
  },
  methods: {
    onInput(e) {
      const formatter = new AsYouType();
      const formatted = formatter.input(e.target.value);
      this.rawInput = formatted;
      if (e.target.value === '') {
        this.countryFlag = null;
        this.dialCode = null;
      }

      if (formatter.country && e.target.value && e.target.value !== '') {
        this.countryCode = formatter.country;
        this.dialCode = formatter.getNumber()?.countryCallingCode || '';

        const countryData = getCountryFromCountryCode(this.countryCode);
        this.countryFlag = countryData?.flag;
        this.dialCode = countryData?.dialCode;
      }
      const parsed = parsePhoneNumberFromString(this.rawInput);
      if (parsed) {
        this.nationalNumber = parsed.formatNational();
        this.isValid = isValidPhoneNumber(parsed.number);
      } else {
        this.nationalNumber = this.rawInput;
        this.isValid = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.input_phone{
  display: flex;
  align-items: center;
  background: $card-bg;
  border: 1px solid transparent;
  border-radius: 12px;
  transition: border-color .2s ease;
  &-country{
    display: flex;
    align-items: center;
    margin-right: 8px;
    padding: 0 5px;
    .flag{
      margin-right: 5px;
    }
  }
  .input_wide{
    width: 100% !important;
    background: transparent;
    &.valid{
      border-color: transparent;
    }
  }
}
.fade-slide-enter-active,
.fade-slide-leave-active{
  transition: all .25s ease, transform .25s ease, margin-right .25s ease, width .25s ease,;
}
.fade-slide-enter-from{
  opacity: 0;
  transform: translateX(-12px);
  width: 0;
  margin-right: 0;
}
.fade-slide-enter-to{
  opacity: 1;
  transform: translateX(0);
  width: auto;
  margin-right: 8px;
}
.fade-slide-leave-from{
  opacity: 1;
  transform: translateX(0);
  width: auto;
  margin-right: 8px;
}
.fade-slide-leave-to{
  opacity: 0;
  transform: translateX(12px);
  width: 0;
  margin-right: 0;
}
</style>
