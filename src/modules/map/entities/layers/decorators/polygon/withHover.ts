import mapboxgl, { LngLat, Map, MapLayerMouseEvent, Popup } from 'mapbox-gl';
import { AnyMapPaint, MapboxMouseEventCb } from '../../../../types/layer';
import { Constructor } from '~types/decorators';
import { AbstractLayer } from '~src/modules/map/entities/layers/AbstractLayer';

export type HoverPopupTemplateBuilder = (props: GeoJSON.GeoJsonProperties) => string;

export interface ILayerWithHover {
  setHoverMouseEvents (
    map: Map,
    withPopup?: boolean,
    popupTemplateBuilder?: HoverPopupTemplateBuilder
  ): this
}

export function withHover<T extends Constructor<AbstractLayer>> (constructor: T) {
  return class LayerWithHover extends constructor {
    id!: string;
    paint: AnyMapPaint = {
      'fill-color': ['case',
        ['boolean', ['feature-state', 'hover'], false],
        '#8B1080',
        ['get', 'color', ['literal', { color: '#9b9b9b' }]]
      ],
      'fill-opacity': 1,
      'fill-outline-color': '#D1D4E0'
    };

    protected hoveredItem: GeoJSON.Feature | null = null;
    protected hoverPopup: Popup | null = null;

    mouseMoveCb?: MapboxMouseEventCb;
    mouseLeaveCb?: MapboxMouseEventCb;

    constructor (...rest: any[]) {
      super(...rest);
    }

    setHoverMouseEvents (
      map: Map,
      withPopup: boolean = true,
      popupTemplateBuilder: HoverPopupTemplateBuilder = props => props?.name
    ): this {
      this.mouseMoveCb = (e: MapLayerMouseEvent) => {
        if (e.features && e.features.length > 0) {
          const currentFeature = e.features[0];

          if (this.hoveredItem) {
            map.setFeatureState({ source: `${this.id}`, id: this.hoveredItem.id }, { hover: false });
          }

          if (this.hoverPopup) {
            this.detachHoverPopup();
          }

          if (withPopup && currentFeature.properties) {
            this.setHoverPopup(map, e.lngLat, popupTemplateBuilder(currentFeature.properties));
          }

          this.hoveredItem = currentFeature;

          map.setFeatureState({ source: `${this.id}`, id: this.hoveredItem.id }, { hover: true });
        }
      };

      this.mouseLeaveCb = () => {
        if (this.hoveredItem) {
          map.setFeatureState({ source: `${this.id}`, id: this.hoveredItem.id }, { hover: false });
        }

        if (this.hoverPopup) {
          this.detachHoverPopup();
        }

        this.hoveredItem = null;
      };

      return this;
    }

    protected setHoverPopup (map: Map, coords: LngLat, text: string): void {
      this.hoverPopup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

      this.hoverPopup.setLngLat(coords)
        .setHTML(text)
        .addTo(map);
    }

    protected detachHoverPopup (): void {
      if (!this.hoverPopup) {
        return;
      }

      this.hoverPopup.remove();
      this.hoverPopup = null;
    }
  };
}
