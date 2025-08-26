<template>
  <div class="steps" :class="{ column: column }">
    <div v-for="(s, idx) in steps" :key="idx" class="step">
      <div class="step_body" :data-index="determineIndex(idx)">
        <div class="step_description">
          {{ $rt(s.description) }}
        </div>
        <div class="step_title">
          {{ $rt(s.title) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppSteps',
  props: {
    steps: {
      type: Array,
      required: true,
    },
    column: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    determineIndex(preIndex) {
      return (preIndex + 1).toString().padStart(2, '0');
    },
  },
};
</script>

<style lang="scss" scoped>
.steps{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  padding: 60px 0;
  &.column{
    flex-direction: column;
    padding: 0;
    .step_body{
      flex-direction: column-reverse;
      justify-content: space-between;
      padding: 20px 22px;
      height: auto;
      &:after{
        bottom: calc(50% - 37.5px);
        @media screen {
          @media (max-width: 580px) {
            font-size: 64px;
            bottom: 10px;
          }
        }
      }
    }
    .step_title{
      margin-top: 0;
      white-space: nowrap;
      max-width: none;
      color: $dark-blue;
      margin-bottom: 15px;
      max-width: 80%;
    }
    .step_description{
      max-width: 80%;
      @media screen {
        @media (max-width: 580px) {
          font-size: 3.7vw;
        }
      }
    }
  }
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
