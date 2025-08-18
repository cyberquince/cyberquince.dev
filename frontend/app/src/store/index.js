import { createStore } from 'vuex';
import i18n from '../services/translations.service';

export default createStore({
  state: {
    locale: localStorage.getItem('locale') || null,
    countryCode: localStorage.getItem('countryCode') || null,
  },
  getters: {
    locale: (state) => state.locale,
    countryCode: (state) => state.countryCode,
  },
  mutations: {
    setLocale(state, locale) {
      state.locale = locale;
    },
    setCountry(state, countryCode) {
      state.countryCode = countryCode;
    },
  },
  actions: {
    changeLocale({ commit }, locale) {
      i18n.global.locale = locale;
      localStorage.setItem('locale', locale);
      commit('setLocale', locale);
    },
    async fetchLocale({ commit }) {
      localStorage.setItem('locale', navigator.language);
      commit('setLocale', navigator.language);
    },
    async fetchCountry({ commit }) {
      try {
        const ipEndpoint = process.env.NODE_ENV === 'production' ? 'https://api.country.is/' : '/ip';
        const response = await fetch(ipEndpoint);
        const data = await response.json();
        commit('setCountry', data.country);
        localStorage.setItem('countryCode', data.country);
      } catch (err) {
        console.error('Failed to fetch country:', err);
      }
    },
  },
  modules: {
  },
});
