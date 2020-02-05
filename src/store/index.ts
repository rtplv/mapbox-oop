import Vue from 'vue';
import Vuex from 'vuex';
import { MapModule } from '~src/modules/map/store';

Vue.use(Vuex);

export interface RootState {}

export default new Vuex.Store<RootState>({
  modules: {
    map: MapModule,
  },
});

