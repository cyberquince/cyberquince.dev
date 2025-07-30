import { createStore } from 'vuex';
import i18n from '../services/translations.service';

export default createStore({
  state: {
    locale: 'ru',
  },
  getters: {
    locale: (state) => state.locale,
  },
  mutations: {
    setLocale(state, locale) {
      state.locale = locale;
    },
  },
  actions: {
    changeLocale({ commit }, locale) {
      i18n.global.locale = locale;
      commit('setLocale', locale);
    },
  },
  modules: {
  },
});
