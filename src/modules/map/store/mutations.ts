import { MapState } from '~src/modules/map/store/state';

export const setLoadingState = function (state: MapState, isLoading: boolean) {
  state.isLoading = isLoading;
};
