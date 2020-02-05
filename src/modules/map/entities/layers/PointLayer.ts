import { AbstractLayer } from '~src/modules/map/entities/layers/AbstractLayer';
import { AnyLayerType, AnyMapPaint } from '~src/modules/map/types/layer';

export class PointLayer extends AbstractLayer {
  type: AnyLayerType = 'circle';
  paint: AnyMapPaint = {
    'circle-radius': 12,
    'circle-color': '#000000'
  };
}
