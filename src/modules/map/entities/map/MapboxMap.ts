import { Map, Layer } from 'mapbox-gl';
import { AbstractMap } from './AbstractMap';
import { LayersContainer } from '~src/modules/map/entities/containers/LayersContainer';
import { AbstractLayer } from '~src/modules/map/entities/layers/AbstractLayer';
import { AnyMapMouseEventType, MapboxMouseEventCb } from '~src/modules/map/types/layer';

export class MapboxMap extends AbstractMap {
  instance?: Map;

  checkLayerExist (id: string) {
    if (!this.instance) {
      throw new Error('HeatMap.instance need be initialized');
    }

    return Boolean(this.instance.getLayer(id));
  }

  getLayers (): Layer[] | [] {
    if (!this.instance) {
      throw new Error('HeatMap.instance need be initialized');
    }

    return this.instance.getStyle().layers || [];
  }

  addLayerEventListener (eventType: AnyMapMouseEventType, layer: AbstractLayer, callback: MapboxMouseEventCb): void {
    if (!this.instance) {
      throw new Error('HeatMap.instance need be initialized');
    }

    this.instance.off(eventType, layer.id, callback);
    this.instance.on(eventType, layer.id, callback);
  }

  renderLayersContainer (layersContainer: LayersContainer): this {
    if (!this.instance) {
      throw new Error('HeatMap.instance need be initialized');
    }

    // Здесь реверсим, так как для mapbox самый верхний слой равен первому элементу в массиве, а не последнему
    const layers = Object.values(layersContainer.getAll()).reverse();

    let lastMapLayer = this.getLayers()[0];

    layers.forEach((layer: AbstractLayer) => {
      const isExist = this.checkLayerExist(layer.id);

      if (isExist) {
        this.instance!.removeSource(layer.id);
        this.instance!.removeLayer(layer.id);
      }

      this.instance!.addLayer(layer, lastMapLayer.id);

      if (layer.clickCb) {
        this.addLayerEventListener('click', layer, layer.clickCb);
      }

      if (layer.mouseMoveCb) {
        this.addLayerEventListener('mousemove', layer, layer.mouseMoveCb);
      }

      if (layer.mouseLeaveCb) {
        this.addLayerEventListener('mouseleave', layer, layer.mouseLeaveCb);
      }

      lastMapLayer = layer;
    });

    return this;
  }
}
