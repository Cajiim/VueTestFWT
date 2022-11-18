import { createStore } from 'vuex';
import selectsModule from './modules/selectsModule';
import paintingsModule from './modules/paintingModule';

export default createStore({
  modules: {
    selects: selectsModule,
    paintings: paintingsModule,
  },
});
