<template>
  <article class="home">
    <div class="home_centered">
      <div class="home_logoname"><span>CyberQuince</span></div>
      <div class="home_slogan">{{$t('home.slogan') }}</div>
    </div>
    <div class="home_action">
      <router-link to="/services" class="base_link">
        <button type="button" class="btn btn_submit big">{{ $t('home.button_text') }}</button>
      </router-link>
    </div>
    <div class="home_dev">
      <div class="home_dev-title">NEED DEV? <span>NO PROBLEM.</span></div>
      <div class="home_dev-slogan">{{ $t('home.dev_slogan') }}</div>
      <div class="home_dev-cards">
        <div class="home_dev-card" data-index="01">
          <div class="card_description">{{ $t('home.cards.ux.description') }}</div>
          <div class="card_title">{{ $t('home.cards.ux.title') }}</div>
        </div>
        <div class="home_dev-card" data-index="02">
          <div class="card_description">{{ $t('home.cards.seo.description') }}</div>
          <div class="card_title">{{ $t('home.cards.seo.title') }}</div>
        </div>
        <div class="home_dev-card" data-index="03">
          <div class="card_description">{{ $t('home.cards.web.description') }}</div>
          <div class="card_title">{{ $t('home.cards.web.title') }}</div>
        </div>
        <div class="home_dev-card" data-index="04">
          <div class="card_description">{{ $t('home.cards.engineer.description') }}</div>
          <div class="card_title">{{ $t('home.cards.engineer.title') }}</div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.home{
  &_logoname{
    user-select: none;
    text-align: center;
    display: flex;
    justify-content: center;
    font-family: $logo-font;
    font-size: 128px;
    margin-bottom: 10px;
    @media screen {
      @media (max-width: 860px) {
        font-size: 14vw;
      }
    }
    span{
      background: linear-gradient(90deg, #1cc3eb 10%, #8034d8 80%, $purple 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    text-shadow: 0 0 20px rgba(121, 50, 202, 0.5);
  }
  &_centered{
    margin: 150px 0;
  }
  &_slogan{
    text-align: center;
    font-size: 98px;
     @media screen {
      @media (max-width: 860px) {
        font-size: 11vw;
      }
    }
  }
  &_action{
    display: flex;
    justify-content: center;
  }
  &_dev{
    margin-top: 130px;
    &-title{
      text-align: center;
      font-size: 72px;
      margin-bottom: -5px;
      @media screen {
        @media (max-width: 530px) {
          font-size: 12vw;
        }
      }
      span{
        color: $purple;
      }
    }
    &-slogan{
      text-align: center;
      font-size: 24px;
      @media screen {
        @media (max-width: 530px) {
          font-size: 20px;
          max-width: 90%;
          margin: 0 auto;
        }
      }
    }
    &-cards{
      padding: 75px 15px 100px 15px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 55px;
    }
    &-card{
      background: $card-bg;
      border-radius: 12px;
      min-height: 250px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      padding: 35px 25px;
      width: 450px;
      .card_title{
        font-size: 32px;
        color: $dark-blue;
      }
      .card_description{
        font-size: 22px;
        text-shadow: 1px 1px 5px rgba($color: black, $alpha: .5);
      }
      &:after{
        position: absolute;
        content: attr(data-index);
        font-size: 24px;
        color: #6126A599;
        bottom: 35px;
        right: 25px;
        font-size: 128px;
        line-height: 75px;
      }
    }
  }
}
</style>
