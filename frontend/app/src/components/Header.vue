<template>
  <div class="header" :class="{ scrolled: isScrolled }">
    <div class="header_nav">
      <div class="header_nav-item burger">
        <div class="burger_button" @click="toggleBurger">
          <i class="cq-icon wh-40 burger-menu"></i>
        </div>
        <div class="header_nav-subitems" v-show="burgerOpened"
          @click="burgerOpened = false">
          <div class="header_nav-subitem">
            <router-link to="/" class="base_link">
              {{ $t('navbar.home') }}
            </router-link>
          </div>
          <div class="header_nav-subitem">
            <router-link to="/services" class="base_link">
              {{ $t('navbar.services') }}
            </router-link>
          </div>
          <div class="header_nav-subitem">
            <router-link to="/contacts" class="base_link">
              {{ $t('navbar.contacts') }}
            </router-link>
          </div>
        </div>
      </div>
      <div class="header_nav-item">
        <router-link to="/" class="base_link">
          {{ $t('navbar.home') }}
        </router-link>
      </div>
      <div class="header_nav-item">
        <router-link to="/services" class="base_link">
          {{ $t('navbar.services') }}
        </router-link>
      </div>
      <div class="header_nav-item logo">
        <router-link to="/" class="base_link">
          <img src="/img/logo.png" class="base_image logo" alt="Logo">
        </router-link>
      </div>
      <div class="header_nav-item">
        <router-link to="/contacts" class="base_link">
          {{ $t('navbar.contacts') }}
        </router-link>
      </div>
      <div class="header_nav-item langs">
        <div class="header_languages-wrapper" @click="toggleLangs">
          <mIcon name="lang" :w="32" :h="32"/>
          <div class="header_languages-langs" v-show="shownLangs">
            <div class="lang" v-for="(l, idx) in $i18n.availableLocales" :key="idx"
              @click="$store.dispatch('changeLocale', l)">
              {{ l }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mIcon from './materialIcon.vue';

export default {
  name: 'Header',
  components: { mIcon },
  data() {
    return {
      shownLangs: false,
      isScrolled: false,
      burgerOpened: true,
    };
  },
  methods: {
    toggleLangs() {
      this.shownLangs = !this.shownLangs;
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 92;
    },
    toggleBurger() {
      this.burgerOpened = !this.burgerOpened;
    },
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
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
