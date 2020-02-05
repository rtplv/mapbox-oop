import { AbstractLayer } from '~src/modules/map/entities/layers/AbstractLayer';
import { AnyLayerType, AnyMapPaint } from '~src/modules/map/types/layer';

export class PolygonLayer extends AbstractLayer {
  type: AnyLayerType = 'fill';
  paint: AnyMapPaint = {
    'fill-color': '#9b9b9b',
    'fill-opacity': 1,
    'fill-outline-color': '#D1D4E0'
  };
}
