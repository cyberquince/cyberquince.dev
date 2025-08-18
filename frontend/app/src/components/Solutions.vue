<template>
  <div class="solutions">
    <div class="solutions_title">Решения</div>
    <div class="solutions_body">
      <div class="solution" v-for="(s, idx) in options" :key="idx">
        <div class="solution_image" v-if="s.image">
          <img :src="`/img/${s.image}`" alt="image" class="base_image">
        </div>
        <div class="solution_title">{{ s.title }}</div>
        <div class="solution_options" v-if="s.options">
          <div class="solution_option" v-for="(o, index) in s.options" :key="index">
            <div class="solution_option-icon">
              <mIcon name="tick" :w="48" :h="48" />
            </div>
            <div class="solution_option-info">
              <div class="solution_option-title">{{ o.title }}</div>
              <div class="solution_option-description">{{ o.description }}</div>
            </div>
          </div>
        </div>
        <div class="solution_description" v-else>
          <p class="description pre">{{ s.description }}</p>
        </div>
        <div class="solution_price">
          от <span class="price">{{ rubValue ? s.price_ru : s.price }}{{ userPriceTag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mIcon from './materialIcon.vue';

export default {
  name: 'Solutions',
  components: { mIcon },
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      rubCountries: ['BY', 'RU', 'KZ'],
    };
  },
  methods: {},
  computed: {
    userPriceTag() {
      return this.rubValue ? ' р.' : ' €';
    },
    rubValue() {
      return this.rubCountries.includes(this.$store.getters.countryCode);
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
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
    @media screen {
      @media (max-width: 1077px) {
        text-align: center;
      }
    }
    color: $white;
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
