import { Map } from 'mapbox-gl';
import Vue from 'vue';
import { AbstractView } from '~src/modules/map/entities/views/AbstractView';
import { VuexStore } from '~src/modules/map/entities/store/VuexStore';
import { MapState } from '~src/modules/map/store/state';
import { TilesMap } from '~src/modules/map/entities/map/TilesMap';
import { LayersContainer } from '~src/modules/map/entities/containers/LayersContainer';

export abstract class TilesMapView<S> extends AbstractView {
  map: TilesMap = new TilesMap();

  mainStore?: VuexStore<MapState>;
  mainStorePath: string[] = [ 'map' ];

  moduleStore?: VuexStore<S>;
  moduleStorePath?: string[];

  constructor (
    protected vm: Vue
  ) {
    super();
  }

  render (mapContainer: string | HTMLElement): this {
    const mainStore = this.initStore();

    this.initMap(mapContainer);

    mainStore.commit('setLoadingState', true);

    this.map!.instance!.once('load', async () => {
      await this.renderLayers();

      setTimeout(() => mainStore.commit('setLoadingState', false), 5000);
    });

    return this;
  }

  protected initStore (): VuexStore<MapState> {
    this.mainStore = new VuexStore<MapState>(this.vm.$store, this.mainStorePath);
    this.moduleStore = new VuexStore<S>(this.vm.$store, this.moduleStorePath);

    return this.mainStore;
  }

  protected initMap (mapContainer: string | HTMLElement): Map {
    if (!mapContainer) {
      throw new Error('You must specify the class or element of the container');
    }

    return this.map.init(mapContainer);
  }

  protected async renderLayers (): Promise<Map> {
    if (!this.mainStore) {
      throw new Error('You must set main store into HeatMapView');
    } else if (!this.map || !this.map.instance) {
      throw new Error('You must set map into HeatMapView');
    }

    this.map.renderLayersContainer(new LayersContainer());

    return this.map.instance;
  }
}
