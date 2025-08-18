<template>
  <article class="services">
    <div class="services_title base_title">
      <span class="tourney">{{ $t('services.title') }}</span>
    </div>
    <hr class="services_delimetr base_hr">
    <div class="services_routes">
      <div class="services_routes-item">
        <router-link to="/web" class="base_link">
          <div class="services_routes-icon">
            <mIcon name="sourcecode" :w="128" :h="128" />
          </div>
          <span class="pre">{{ $t('services.icons.web') }}</span>
        </router-link>
      </div>
      <div class="services_routes-item">
        <router-link to="/design" class="base_link">
          <div class="services_routes-icon">
            <mIcon name="pentool" :w="128" :h="128" />
          </div>
          <span class="pre">{{ $t('services.icons.ux') }}</span>
        </router-link>
      </div>
      <div class="services_routes-item">
        <router-link to="/seo" class="base_link">
          <div class="services_routes-icon">
            <mIcon name="seoglass" :w="128" :h="128" />
          </div>
          <span class="pre">{{ $t('services.icons.seo') }}</span>
        </router-link>
      </div>
      <div class="services_routes-item">
        <router-link to="/data" class="base_link">
          <div class="services_routes-icon">
            <mIcon name="storage" :w="128" :h="128" />
          </div>
          <span class="pre">{{ $t('services.icons.engineer') }}</span>
        </router-link>
      </div>
    </div>
  </article>
</template>
<script>
import mIcon from '../components/materialIcon.vue';

export default {
  name: 'ServicesView',
  components: { mIcon },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.services{
  &_title{
    display: flex;
    justify-content: center;
  }
  &_routes{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    @media screen {
      @media (max-width: 900px) {
        flex-wrap: wrap;
        gap: 20px;
        padding-bottom: 90px;
      }
    }
  }
  &_delimetr{
    margin-bottom: 90px;
  }
  &_routes{
    &-icon{
      position: relative;
      margin-bottom: 12px;
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
    &-item{
      .m-icon{
        border-radius: 26px;
        background: transparent;
        padding: 36px;
      }
      display: flex;
      .base_link{
        font-size: 32px;
        text-align: center;
      }
      @media screen {
        @media (max-width: 900px) {
          flex-basis: calc(50% - 40px);
          justify-content: center;
        }
      }
    }
  }
}
</style>
