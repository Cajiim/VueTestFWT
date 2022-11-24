import { readonly, ref } from 'vue';

const useState = (initialState: any) => {
  const state = ref(initialState);
  const setState = (newState: any) => {
    state.value = newState;
  };

  return [readonly(state), setState];
};

export default useState;
