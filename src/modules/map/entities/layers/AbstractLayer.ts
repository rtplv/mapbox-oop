import { AnySourceData, Layer } from 'mapbox-gl';
import {
  AnyLayerType,
  AnyMapPaint,
  ExtendedSymbolLayout,
  MapboxMouseEventCb
} from '~src/modules/map/types/layer';
import { MapboxSource } from '~src/modules/map/types/source';

export abstract class AbstractLayer implements Layer {
  // Custom Layer properties must be override on child classes, if it needed
  id: string = 'CustomLayer' + Math.abs(Math.random() * 1000);
  type?: AnyLayerType;

  source?: string | AnySourceData;
  paint?: AnyMapPaint;
  layout?: ExtendedSymbolLayout;

  'source-layer'?: string;
  filter?: any[];
  interactive?: boolean;

  maxzoom?: number;
  minzoom?: number;

  metadata?: any;
  ref?: string;

  clickCb?: MapboxMouseEventCb;
  mouseMoveCb?: MapboxMouseEventCb;
  mouseLeaveCb?: MapboxMouseEventCb;

  setSource (source: MapboxSource): this {
    this.source = source;

    return this;
  }

  setLayout (layout: ExtendedSymbolLayout): this {
    this.layout = layout;

    return this;
  }

  setPaint (paint: AnyMapPaint): this {
    this.paint = paint;

    return this;
  }

  setClickCb (cb: MapboxMouseEventCb): this {
    this.clickCb = cb;

    return this;
  }

  setMouseMoveCb (cb: MapboxMouseEventCb): this {
    this.mouseMoveCb = cb;

    return this;
  }

  setMouseLeaveCb (cb: MapboxMouseEventCb): this {
    this.mouseLeaveCb = cb;

    return this;
  }
}
