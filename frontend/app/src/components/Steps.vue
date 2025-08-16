<template>
  <div class="steps">
    <div class="step" v-for="(s, idx) in steps" :key="idx">
      <div class="step_body" :data-index="determineIndex(idx)">
        <div class="step_description">{{ s.description }}</div>
        <div class="step_title">{{ s.title }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Steps',
  props: {
    steps: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    determineIndex(preIndex) {
      return (preIndex + 1).toString().padStart(2, '0');
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.steps{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  padding: 60px 0;
  @media screen {
    @media (max-width: 450px) {
      max-width: 90%;
      margin: 0 auto;
    }
  }
  .step{
    &_body{
      background: $card-bg;
      border-radius: 12px;
      padding: 36px 25px;
      height: 250px;
      position: relative;
      display: flex;
      flex-direction: column;
      &:after{
        position: absolute;
        content: attr(data-index);
        color: rgba($color: $purple, $alpha: .6);
        color: #6126A599;
        bottom: 55px;
        right: 25px;
        font-size: 96px;
        line-height: 75px;
      }
    }
    &_description{
      max-width: 390px;
      font-size: 24px;
      @media screen {
        @media (max-width: 550px) {
          font-size: 4.8vw;
        }
      }
    }
    &_title{
      margin-top: auto;
      font-size: 36px;
      color: $blue;
      max-width: 320px;
      white-space: pre-wrap;
      @media screen {
        @media (max-width: 550px) {
          font-size: 7vw;
        }
      }
    }
  }
}
</style>
