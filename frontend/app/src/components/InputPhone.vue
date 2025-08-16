<template>
  <div class="input_phone">
    <transition name="slide">
      <div class="country_info" v-if="countryFlag">
        <span class="flag">{{ countryFlag }}</span>
        <span class="code">{{ dialCode }}</span>
      </div>
    </transition>
    <input type="tel" class="input_wide" :value="nationalNumber"
      @input="onInput" placeholder="+0 000 000-00-00">
  </div>
</template>
<script>
import { getCountryFromCountryCode } from 'country-codes-flags-phone-codes';
import { AsYouType, isValidPhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js';

export default {
  name: 'InputPhone',
  data() {
    return {
      rawInput: '',
      nationalNumber: '',
      countryCode: null,
      countryFlag: null,
      isValid: true,
    };
  },
  computed: {
    userPhoneCountry() {
      console.log(getCountryFromCountryCode(this.userPhone.country));
      return getCountryFromCountryCode(this.userPhone.country).flag;
    },
    userPhoneCode() {
      return getCountryFromCountryCode(this.userPhone.country).dialCode;
    },
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

      if (formatter.country) {
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
  &-number{
    .input_wide{
      border: 1px solid red;
      &.valid{
        border-color: transparent;
      }
    }
  }
}
</style>
