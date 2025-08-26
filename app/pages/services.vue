<template>
  <article class="services">
    <h1 class="services_title base_title">
      <span class="tourney">{{ $t('services.title') }}</span>
    </h1>
    <hr class="services_delimetr base_hr">
    <div class="services_routes">
      <div class="services_routes-item">
        <NuxtLink class="base_link" to="/web">
          <div class="services_routes-icon">
            <Icon name="cq:sourcecode" :size="128" />
          </div>
          <span class="pre">{{ $t('services.icons.web') }}</span>
        </NuxtLink>
      </div>
      <div class="services_routes-item">
        <NuxtLink class="base_link" to="/design">
          <div class="services_routes-icon">
            <Icon name="cq:pentool" :size="128" />
          </div>
          <span class="pre">{{ $t('services.icons.ux') }}</span>
        </NuxtLink>
      </div>
      <div class="services_routes-item">
        <NuxtLink class="base_link" to="/seo">
          <div class="services_routes-icon">
            <Icon name="cq:seoglass" :size="128" />
          </div>
          <span class="pre">{{ $t('services.icons.seo') }}</span>
        </NuxtLink>
      </div>
      <div class="services_routes-item">
        <NuxtLink class="base_link" to="/data">
          <div class="services_routes-icon">
            <Icon name="cq:storage" :size="128" />
          </div>
          <span class="pre">{{ $t('services.icons.engineer') }}</span>
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
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
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
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
