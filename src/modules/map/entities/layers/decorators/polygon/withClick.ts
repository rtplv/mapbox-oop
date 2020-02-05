import { MapLayerMouseEvent } from 'mapbox-gl';
import { Constructor } from '~types/decorators';
import { MapboxMouseEventCb } from '~src/modules/map/types/layer';

export type LayerTransitionAction = (props: GeoJSON.GeoJsonProperties) => void;

export interface ILayerWithClick {
  setMouseClickEvent (
    action: LayerTransitionAction
  ): this
}

export function withClick<T extends Constructor> (constructor: T): T {
  return class LayerWithClick extends constructor {
    clickCb?: MapboxMouseEventCb;

    constructor (...rest: any[]) {
      super(...rest);
    }

    setMouseClickEvent (action: LayerTransitionAction): this {
      this.clickCb = (e: MapLayerMouseEvent) => {
        if (e.features && e.features.length > 0) {
          const currentFeatureProperties = e.features[0].properties;

          action(currentFeatureProperties);
        }
      };

      return this;
    }
  };
}
