import { createStore } from 'vuex';
import i18n from '../services/translations.service';

export default createStore({
  state: {
    locale: localStorage.getItem('countryCode') || null,
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
      commit('setLocale', locale);
    },
    async fetchCountry({ commit }) {
      try {
        const response = await fetch('http://ip-api.com/json');
        const data = await response.json();
        commit('setCountry', data.countryCode);
        localStorage.setItem('countryCode', data.countryCode.toLowerCase());
      } catch (err) {
        console.error('Failed to fetch country:', err);
      }
    },
  },
  modules: {
  },
});
