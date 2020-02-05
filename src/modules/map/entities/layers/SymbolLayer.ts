import { AbstractLayer } from '~src/modules/map/entities/layers/AbstractLayer';
import { AnyLayerType, AnyMapPaint, ExtendedSymbolLayout } from '~src/modules/map/types/layer';

export class SymbolLayer extends AbstractLayer {
  type: AnyLayerType = 'symbol';

  paint: AnyMapPaint = {
    'text-color': '#202',
    'text-halo-color': '#fff',
    'text-halo-width': 2
  };

  layout: ExtendedSymbolLayout = {
    'text-field': ['get', 'name'],
    'text-variable-anchor': ['top', 'bottom'],
    'text-radial-offset': 1.5,
    'text-size': 14
  }
}
