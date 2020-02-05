import { Map } from 'mapbox-gl';
import { AbstractMap } from '~src/modules/map/entities/map/AbstractMap';
import { AbstractStore } from '~src/modules/map/entities/store/AbstractStore';

export abstract class AbstractView {
  abstract map?: AbstractMap;

  store?: AbstractStore;

  abstract render(mapContainer: string | HTMLElement): this;

  protected abstract initMap(mapContainer: string | HTMLElement): Map | void;
  protected initStore?(): AbstractStore | void;
}
