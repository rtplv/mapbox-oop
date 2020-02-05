import mapboxgl, { Map, LngLatLike } from 'mapbox-gl';
import { MapboxMap } from '~src/modules/map/entities/map/MapboxMap';

export class TilesMap extends MapboxMap {
  zoom = 2;
  maxZoom = 10;
  center: LngLatLike = [101.85572555137924, 67.72683976721297];
  style: string = 'mapbox://styles/mapbox/streets-v11';

  init (container: string | HTMLElement): Map {
    mapboxgl.accessToken = this.token;

    this.instance = new mapboxgl.Map({
      container,
      style: this.style,
      center: this.center,
      zoom: this.zoom,
      maxZoom: this.maxZoom,
      minZoom: this.zoom,
      attributionControl: false
    });

    this.setDefaultMapControls();

    return this.instance;
  }

  protected setDefaultMapControls (): void {
    if (!this.instance) {
      throw new Error('HeatMap.instance need be initialized');
    }

    this.instance.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  }
}
