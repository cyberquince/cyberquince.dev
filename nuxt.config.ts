// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxt/icon',
  ],
  devtools: { enabled: true },
  css: ['~/assets/main.scss'],
  compatibilityDate: '2025-07-15',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/variables.scss" as *;`,
        },
      },
    },
  },
  eslint: {
    config: {
      stylistic: {
        semi: true,
        quotes: 'single',
        indent: 2,
      },
    },
  },
  fonts: {
    assets: {
      prefix: '~/assets/fonts/',
    },
  },
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'ru', name: 'Русский', file: 'ru.json' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
  },
  icon: {
    customCollections: [
      {
        prefix: 'cq',
        dir: './public/icons',
        normalizeIconName: false,
      },
    ],
  },
});
