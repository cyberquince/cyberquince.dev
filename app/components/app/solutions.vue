<template>
  <div class="solutions">
    <div class="solutions_title">
      <h3>{{ $t('solutions.title') }}</h3>
    </div>
    <div class="solutions_body">
      <div v-for="(s, idx) in options" :key="idx" class="solution">
        <div v-if="s?.image" class="solution_image">
          <img :src="`/img/${$rt(s?.image)}`" alt="Example Image" class="base_image">
        </div>
        <div class="solution_title">
          {{ $rt(s.title) }}
        </div>
        <div v-if="s?.options" class="solution_options">
          <div v-for="(o, index) in s.options" :key="index" class="solution_option">
            <div class="solution_option-icon">
              <Icon name="cq:tick" :size="32" />
            </div>
            <div class="solution_option-info">
              <div class="solution_option-title">
                {{ $rt(o.title) }}
              </div>
              <div class="solution_option-description">
                {{ $rt(o.description) }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="solution_description">
          <p class="description pre">
            {{ $rt(s.description) }}
          </p>
        </div>
        <div class="solution_price">
          от <span class="price">{{ rubValue ? $rt(s.price_ru) : $rt(s.price) }}{{ userPriceTag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCountry } from '~/composables/useCountry';

export default {
  name: 'AppSolutions',
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      rubCountries: ['BY', 'RU', 'KZ'],
      store: useCountry(),
    };
  },
  computed: {
    userPriceTag() {
      return this.rubValue ? ' р.' : ' €';
    },
    rubValue() {
      return this.rubCountries.includes(this.store.countryCode);
    },
  },
};
</script>

<style lang="scss" scoped>
.solutions{
  padding: 60px 0;
  &_title{
    margin-bottom: 20px;
    font-size: 48px;
    padding-left: 64px;
  }
  &_body{
    display: flex;
    justify-content: space-around;
    @media screen {
      @media (max-width: 1077px) {
        flex-direction: column;
        align-items: center;
      }
    }
  }
}
.solution{
  display: flex;
  flex-direction: column;
  @media screen {
    @media (max-width: 1077px) {
      max-width: 400px;
      margin-bottom: 20px;
    }
  }
  &_title{
    color: $dark-blue;
    font-size: 48px;
    text-align: center;
    margin-bottom: 14px;
    text-shadow: 1px 1px 10px rgba($color: black, $alpha: .5);
  }
  &_option{
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    &:last-child{
      margin-bottom: 20px;
    }
    &-title{
      font-size: 20px;
      color: $dark-blue;
    }
    &-icon{
      margin-right: 10px;
    }
    &-description{
      max-width: 300px;
    }
  }
  &_price{
    margin-top: auto;
    text-align: right;
    font-size: 36px;
    color: $white;
    @media screen {
      @media (max-width: 1077px) {
        text-align: center;
      }
    }
    .price{
      color: $purple;
      font-size: 48px;
      @media screen {
        @media (max-width: 1077px) {
          color: $dark-blue;
        }
      }
    }
  }
  &_description{
    max-width: 320px;
  }
}
</style>
