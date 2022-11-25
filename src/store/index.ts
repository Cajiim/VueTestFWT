import { createStore } from 'vuex';
import selectsModule from './modules/selectsModule';
import paintingsModule from './modules/paintingModule';
import themeModule from './modules/themeModule';

export default createStore({
  modules: {
    selects: selectsModule,
    paintings: paintingsModule,
    theme: themeModule,
  },
});
