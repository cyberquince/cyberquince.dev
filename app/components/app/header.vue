<template>
  <div class="header" :class="{ scrolled: isScrolled }">
    <div class="header_nav">
      <div class="header_nav-item burger">
        <div class="burger_button" @click="openBurger">
          <i class="cq-icon wh-40 burger-menu" />
        </div>
        <div v-show="burgerOpened" class="header_nav-subitems" @click="burgerOpened">
          <div class="header_nav-subitem">
            <NuxtLink to="/" class="base_link" @click.self="closeBurger">
              {{ $t('navbar.home') }}
            </NuxtLink>
          </div>
          <div class="header_nav-subitem">
            <NuxtLink to="/services" class="base_link" @click.self="closeBurger">
              {{ $t('navbar.services') }}
            </NuxtLink>
          </div>
          <div class="header_nav-subitem">
            <NuxtLink to="/contacts" class="base_link" @click.self="closeBurger">
              {{ $t('navbar.contacts') }}
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="header_nav-item" tabindex="-1">
        <NuxtLink to="/" class="base_link">
          {{ $t('navbar.home') }}
        </NuxtLink>
      </div>
      <div class="header_nav-item" tabindex="-1">
        <NuxtLink to="/services" class="base_link">
          {{ $t('navbar.services') }}
        </NuxtLink>
      </div>
      <div class="header_nav-item logo" tabindex="-1">
        <NuxtLink to="/" class="base_link">
          <img src="/img/logo.png" alt="Logotype" class="base_image">
        </NuxtLink>
      </div>
      <div class="header_nav-item" tabindex="-1">
        <NuxtLink to="/contacts" class="base_link">
          {{ $t('navbar.contacts') }}
        </NuxtLink>
      </div>
      <div class="header_nav-item langs" tabindex="-1">
        <div class="header_languages-wrapper" @click="toggleLangs">
          <Icon name="cq:lang" mode="svg" />
          <div v-show="shownLangs" class="header_languages-langs">
            <div
              v-for="(l, idx) in $i18n.availableLocales"
              :key="idx"
              class="lang"
              @click="$i18n.setLocale(l)"
            >
              {{ l }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  // components: { mIcon },
  data() {
    return {
      shownLangs: false,
      isScrolled: false,
      burgerOpened: false,
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    toggleLangs() {
      this.shownLangs = !this.shownLangs;
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 92;
    },
    openBurger() {
      this.burgerOpened = true;
    },
    closeBurger() {
      this.burgerOpened = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.header{
  position: fixed;
  display: flex;
  justify-content: center;
  width: 100%;
  top: 0;
  z-index: 1;
  transition: background .4s ease;
  &.scrolled{
    background: $black;
  }
  &_nav{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1440px;
    &-item{
      &.burger{
        display: none;
      }
      &:first-child{
        margin-left: 0;
      }
      &:last-child{
        margin-right: 0;
      }
      &:hover{
        background-size: 100% 100%;
        background-position-x: left;
      }
      &.logo{
        padding: 0;
        background-image: none;
        &:hover{
          background-image: none;
        }
      }
      color: $purple;
      padding: 30px 0;
      margin: 0 60px;
      font-size: 32px;
      font-weight: 400;
      background-image: linear-gradient(
        to bottom, transparent 0%, transparent 98%, $purple 98%, $purple 100%);
      background-repeat: no-repeat;
      background-size: 0% 100%;
      background-position-x: right;
      transition: background-size .4s;
      @media screen {
        @media (max-width: 930px) {
          margin: 0;
        }
      }
      @media screen {
        @media (max-width: 550px) {
          display: none;
          &.logo, &.langs, &.burger{
            display: block;
          }
        }
      }
    }
    @media screen {
      @media (max-width: 930px) {
        padding: 0 30px;
        justify-content: space-between;
      }
    }
    &-subitems{
      position: fixed;
      padding: 28px;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba($color: $white, $alpha: .12);
      backdrop-filter: blur(24px);
      &:before{
        content: '';
        position: absolute;
        width: 25%;
        left: 100%;
        height: 100%;
      }
    }
    &-subitem{
      margin-bottom: 10px;
    }
  }
  &_languages{
    &-wrapper{
      position: relative;
      .m-icon{
        position: relative;
        z-index: 3;
        cursor: pointer;
      }
    }
    &-langs{
      position: absolute;
      width: 100%;
      z-index: 0;
      top: 0;
      color: $white;
      text-transform: uppercase;
      background: linear-gradient(to bottom, $black 2%, #152F3C 35%);
      text-align: center;
      border-radius: 5px;
      padding-top: 32px;
      .lang{
        padding: 10px 0;
        font-size: 24px;
        &:hover{
          color: $blue;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
