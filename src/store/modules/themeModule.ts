import { Commit } from 'vuex';

const themeModule = {
  state: () => ({
    isDarkTheme: false,
  }),

  mutations: {
    changeTheme(state: { isDarkTheme: boolean; }) {
      state.isDarkTheme = !state.isDarkTheme;
    },
  },

  getters: {
    isDarkTheme: ({ isDarkTheme } : {isDarkTheme : boolean}) => isDarkTheme,
  },

  actions: {
    changeTheme({ commit } : {commit : Commit}) {
      commit('changeTheme');
    },
  },
  namespaced: true,
};

export default themeModule;
