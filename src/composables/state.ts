import { readonly, ref } from 'vue';

const useState = (initialState: boolean | string) => {
  const state = ref(initialState);
  const setState = (newState: boolean | string) => {
    state.value = newState;
  };

  return [readonly(state), setState];
};

export default useState;
