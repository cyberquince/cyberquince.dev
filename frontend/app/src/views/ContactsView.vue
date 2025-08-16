<template>
  <article class="contacts">
    <div class="contacts_title">{{ $t('contacts.title') }}</div>
    <div class="contacts_slogan">{{ $t('contacts.slogan') }}</div>
    <div class="contacts_body">
      <div class="contacts_body-bullets">
        <div class="contacts_body-bullet" data-index="01">
          <div class="contacts_body-bullet_title">{{ $t('contacts.bullets.about.title') }}</div>
          <div class="contacts_body-bullet_description">
            {{ $t('contacts.bullets.about.description') }}
          </div>
        </div>
        <div class="contacts_body-bullet" data-index="02">
          <div class="contacts_body-bullet_title">{{ $t('contacts.bullets.desire.title') }}</div>
          <div class="contacts_body-bullet_description">
            {{ $t('contacts.bullets.desire.description') }}
          </div>
        </div>
        <div class="contacts_body-bullet" data-index="03">
          <div class="contacts_body-bullet_title">{{ $t('contacts.bullets.budget.title') }}</div>
          <div class="contacts_body-bullet_description">
            {{ $t('contacts.bullets.budget.description') }}
          </div>
        </div>
      </div>
      <div class="contacts_body-form">
        <InfoForm :formTitle="$t('contacts.form.title')"/>
      </div>
    </div>
  </article>
</template>
<script>
import InfoForm from '../components/InfoForm.vue';

export default {
  name: 'ContactsView',
  components: { InfoForm },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
@import "@/assets/variables.scss";
.contacts{
  &_title{
    margin-top: 90px;
    font-size: 64px;
    text-align: center;
    @media screen {
      @media (max-width: 800px) {
        font-size: 7vw;
      }
      @media (max-width: 530px) {
        margin-top: 45px;
      }
    }
  }
  &_slogan{
    max-width: 784px;
    font-size: 24px;
    margin: 0 auto;
    @media screen {
      @media (max-width: 800px) {
        font-size: 2.6vw;
        text-align: center;
      }
    }
  }
  &_body{
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
    padding-bottom: 90px;
    @media screen {
      @media (max-width: 1100px) {
        flex-direction: column;
        align-items: center;
      }
    }
    &-form{
      width: calc(50% - 40px);
      min-height: 450px;
      @media screen {
        @media (max-width: 1100px) {
          height: 450px;
          margin-top: 40px;
          min-width: 560px;
          width: auto;
        }
        @media (max-width: 580px) {
          min-width: 90%;
        }
      }
    }
    &-bullets{
      width: calc(50% - 40px);
      @media screen {
        @media (max-width: 1100px) {
          width: auto;
        }
        @media (max-width: 580px) {
          max-width: 90%;
        }
      }
      max-width: 560px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    &-bullet{
      background: $card-bg;
      border-radius: 12px;
      padding: 20px 22px;
      position: relative;
      min-width: 518px;
      @media screen {
        @media (max-width: 580px) {
          min-width: auto;
        }
      }
      &:after{
        content: attr(data-index);
        position: absolute;
        font-size: 64px;
        color: $purple;
        right: 22px;
        top: calc(50% - 40px);
        @media screen {
          @media (max-width: 580px) {
            font-size: 12vw;
          }
        }
      }
      &_title{
        font-size: 38px;
        color: $dark-blue;
        white-space: nowrap;
        @media screen {
          @media (max-width: 580px) {
            font-size: 6vw;
          }
        }
      }
      &_description{
        font-size: 22px;
        @media screen {
          @media (max-width: 580px) {
            font-size: 3.7vw;
          }
        }
      }
      &_title,
      &_description{
        max-width: 80%;
      }
    }
  }
}
</style>
