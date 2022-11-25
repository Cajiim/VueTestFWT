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

type TFilter = {
  q?: string;
  author?: string;
  location?: string;
  gte?: string;
  lte?: string;
  page?: number;
  limit?: number;
};

type TObjFilter = {
  q?: string;
  authorId?: string;
  locationId?: string;
  created_gte?: string;
  created_lte?: string;
  _page?: number;
  _limit?: number;
  _sort?: string;
};

const paintingsModule = {
  state: () => ({
    paintings: [],
    totalCount: null,
    isLoading: false,
    error: '',
  }),

  mutations: {
    setPainting(state: { paintings: string[] }, array: string[]) {
      state.paintings = array;
    },
    setLoading(state: { isLoading: boolean }, boolean: boolean) {
      state.isLoading = boolean;
    },
    setError(state: { error: string }, string: string) {
      state.error = string;
    },
    setTotalCount(state: { totalCount: number }, number: number) {
      state.totalCount = number;
    },
  },

  getters: {
    paintings(state: { paintings: TPaintings[] }) {
      return state.paintings;
    },
    totalCount(state: { totalCount: number }) {
      return state.totalCount;
    },
  },

  actions: {
    async fetchPaintings(
      { commit }: { commit: Commit },
      { query, page, limit }: { query: TFilter; page: number; limit: number },
    ) {
      try {
        const paramsObject: TObjFilter = {};
        const {
          q, author, location, lte, gte,
        } = query;
        if (q) paramsObject.q = q;
        if (author) paramsObject.authorId = author;
        if (location) paramsObject.locationId = location;
        if (gte) paramsObject.created_gte = gte;
        if (lte) paramsObject.created_lte = lte;
        if (limit) paramsObject._limit = limit;
        if (page) paramsObject._page = page;
        paramsObject._sort = 'name';
        commit('setLoading', true);
        const response = await axios.get(
          'https://test-front.framework.team/paintings?_expand=author&_expand=location',
          {
            params: paramsObject,
          },
        );
        commit('setPainting', response.data);
        commit('setTotalCount', response.headers['x-total-count']);
      } catch (error) {
        commit('setError', error);
      } finally {
        commit('setLoading', false);
      }
    },
  },
  namespaced: true,
};

export default paintingsModule;
