import axios from 'axios';
import type { Commit } from 'vuex';

type TDefault = {
  authors : string[],
  locations: string[],
  error: string,
};

const selectsModule = {
  state: ():TDefault => ({
    authors: [],
    locations: [],
    error: '',
  }),

  mutations: {
    setAuthors(state: { authors: string[]; }, array: string[]) {
      state.authors = array;
    },
    setLocations(state: { locations: string[]; }, array: string[]) {
      state.locations = array;
    },
    setError(state: { error: string; }, string: string) {
      state.error = string;
    },
  },

  getters: {
    authors(state: { authors: string[]; }) {
      return state.authors;
    },
    locations(state: { locations: string[]; }) {
      return state.locations;
    },
  },

  actions: {
    async fetchAuthors({ commit } : { commit:Commit}) {
      try {
        const response = await axios.get('https://test-front.framework.team/authors');
        commit('setAuthors', response.data);
      } catch (error) {
        commit('setError', error);
      }
    },

    async fetchLocations({ commit } : { commit:Commit}) {
      try {
        const response = await axios.get('https://test-front.framework.team/locations');
        commit('setLocations', response.data);
      } catch (error) {
        commit('setError', error);
      }
    },

  },
  namespaced: true,
};

export default selectsModule;
