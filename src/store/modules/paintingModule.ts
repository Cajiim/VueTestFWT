import axios from 'axios';
import type { Commit } from 'vuex';

type TPaintings = {
  author?: {
    name?: string;
  };
  created?: string;
  id?: number;
  imageUrl?: string;
  location?: {
    location?: string;
  };
  name?: string;
};

const paintingsModule = {
  state: () => ({
    paintings: [],
    isLoading: false,
    error: '',
  }),

  mutations: {
    setPainting(state: { paintings: string[]; }, array: string[]) {
      state.paintings = array;
    },
    setLoading(state: { isLoading: boolean; }, array: boolean) {
      state.isLoading = array;
    },
    setError(state: { error: string; }, string: string) {
      state.error = string;
    },
  },

  getters: {
    paintings(state: { paintings: TPaintings[]; }) {
      return state.paintings;
    },
  },

  actions: {
    async fetchPaintings({ commit } : { commit:Commit}) {
      try {
        const response = await axios.get('https://test-front.framework.team/paintings?_expand=author&_expand=location');
        commit('setPainting', response.data);
      } catch (error) {
        commit('setError', error);
      }
    },
  },
  namespaced: true,
};

export default paintingsModule;
