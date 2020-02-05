import { Module } from 'vuex';
import { MapState, state } from '~src/modules/map/store/state';
import * as mutations from '~src/modules/map/store/mutations';
import { RootState } from '~store/index.ts';

const namespaced: boolean = true;

export const MapModule: Module<MapState, RootState> = {
  namespaced,
  state,
  mutations,
};
