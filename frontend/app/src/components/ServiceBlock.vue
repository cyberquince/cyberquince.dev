<template>
  <div class="service" :class="serviceName">
    <div class="service_title">
      <span class="tourney">{{ $t(`${name}.title`) }}</span>
    </div>
    <div class="service_slogan">{{ $t(`${name}.slogan`) }}</div>
    <div class="service_blocks" v-if="blockCount === 2">
      <div class="service_block" v-for="(b, idx) in blocks" :key="idx">
        <div class="service_block-info">
          <div class="service_block-title">{{ $t(`${name}.cards.${b}.title`) }}</div>
          <div class="service_block-description">{{ $t(`${name}.cards.${b}.description`) }}</div>
        </div>
        <div class="service_block-icon">
          <mIcon :name="$t(`${name}.cards.${b}.icon`)" :w="128" :h="128"/>
        </div>
      </div>
    </div>
    <div class="service_blocks inline" v-else>
      <div class="service_block" v-for="(b, idx) in blocks" :key="idx">
        <div class="service_block-icon">
          <mIcon :name="$t(`${name}.cards.${b}.icon`)" :w="128" :h="128" />
        </div>
        <div class="service_block-title">{{ $t(`${name}.cards.${b}.title`) }}</div>
      </div>
    </div>
    <div class="service_sla" v-if="blockCount === 2">{{ $t(`${name}.sla`) }}</div>
    <div class="service_delimetr base_hr" v-show="showHr"></div>
  </div>
</template>
<script>
import mIcon from './materialIcon.vue';

export default {
  name: 'ServiceBlock',
  components: { mIcon },
  props: {
    name: {
      type: String,
      required: true,
    },
    blocks: {
      type: Array,
      required: true,
    },
    blockCount: {
      type: Number,
      required: false,
      default: 4,
    },
    showHr: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    serviceName() {
      return this?.name.split('-')[0];
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.service{
  &_title{
    margin-top: 60px;
    display: flex;
    justify-content: center;
    .tourney{
      padding: 0 3px;
    }
  }
  &_slogan{
    text-align: center;
    font-size: 32px;
    @media screen {
      @media (max-width: 542px) {
        font-size: 5.5vw;
      }
    }
  }
  &_blocks{
    margin: 80px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 37.5px;
    @media screen {
      @media (max-width: 1030px) {
        gap: 20px;
      }
      @media (max-width: 470px) {
        gap: 40px;
      }
    }
    &.inline{
      .service_block{
        flex-basis: calc(25% - 37.5px);
        flex-direction: column;
        align-items: center;
        &-title{
          @media screen {
            @media (max-width: 1077px) {
              width: 170px;
              text-align: center;
            }
          }
        }
      }
    }
  }
  &_block{
    display: flex;
    flex-basis: calc(50% - 37.5px);
    justify-content: flex-end;
    @media screen {
      @media (max-width: 1030px) {
        flex-basis: calc(100% - 10px);
        justify-content: center;
        flex-direction: row-reverse;
      }
      @media (max-width: 470px) {
        flex-direction: column-reverse;
        align-items: center;
      }
    }
    &:nth-child(2n) {
      flex-direction: row-reverse;
      @media screen {
        @media (max-width: 470px) {
          flex-direction: column-reverse;
          align-items: center;
        }
      }
      .service_block-info{
        margin-left: 20px;
        @media screen {
          @media (max-width: 1030px) {
            margin-right: 0px;
          }
        }
      }
      .service_block-description{
        text-align: left;
      }
    }
    &-info{
      margin-right: 20px;
      @media screen {
        @media (max-width: 1030px) {
          margin-left: 20px;
          margin-right: 0;
        }
      }
    }
    &-title{
      font-size: 32px;
      color: $blue;
      text-align: center;
      @media screen {
        @media (max-width: 1030px) {
          text-align: left;
        }
        @media (max-width: 470px) {
          text-align: center;
        }
      }
    }
    &-description{
      max-width: 260px;
      font-size: 20px;
      text-align: right;
      @media screen {
        @media (max-width: 1030px) {
          text-align: left;
        }
      }
    }
    &-icon{
      position: relative;
      width: 170px;
      height: 170px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:before{
        background: linear-gradient(120deg, $light-blue, $purple) border-box;
        border-radius: 30px;
        padding: 4px;
        position: absolute;
        content: '';
        inset: 0;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-compsite: xor;
        mask-composite: exclude;
        pointer-events: none;
        box-shadow: 0 4px 40px 1px rgba(58, 183, 228, 0.3);
      }
    }
  }
  &_sla{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 136px;
    border-radius: 20px;
    border: 4px solid $purple;
    margin: 0 auto;
    font-size: 40px;
    color: $white;
    width: 460px;
    margin-bottom: 80px;
    padding: 0 12px;
    @media screen {
      @media (max-width: 500px) {
        max-width: 90%;
        font-size: 8.2vw;
        aspect-ratio: 16 / 9;
        text-align: center;
      }
    }
  }
}
</style>
