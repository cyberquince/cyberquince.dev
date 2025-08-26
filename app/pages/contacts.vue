<template>
  <article class="contacts">
    <h1 class="contacts_title">
      {{ $t('contacts.title') }}
    </h1>
    <h4 class="contacts_slogan">
      {{ $t('contacts.slogan') }}
    </h4>
    <div class="contacts_body">
      <AppSteps :steps="$tm('contacts.bullets')" column class="contacts_body-bullets" />
      <div class="contacts_body-form">
        <AppForm :form-title="$t('contacts.form.title')" />
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped>
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
    font-size: 24px;
    text-align: center;
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
    &-bullets{
      width: calc(50% - 40px);
      max-width: 560px;
      gap: 20px;
      @media screen {
        @media (max-width: 1100px) {
          width: 100%;
        }
        @media (max-width: 580px) {
          max-width: 90%;
        }
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
  }
}
</style>
