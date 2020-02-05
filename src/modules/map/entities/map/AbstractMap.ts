import { token } from '~config/map/mapbox';

export abstract class AbstractMap {
  readonly token: string = token;
}
