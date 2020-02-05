import {
  BackgroundPaint,
  CirclePaint,
  FillExtrusionPaint,
  FillPaint, HeatmapPaint, HillshadePaint,
  LinePaint, MapMouseEvent,
  RasterPaint, SymbolLayout,
  SymbolPaint
} from 'mapbox-gl';

export type AnyLayerType = 'fill' | 'line' | 'symbol' | 'circle' | 'fill-extrusion' | 'raster' | 'background' | 'heatmap' | 'hillshade';
export type AnyMapPaint = BackgroundPaint | FillPaint | FillExtrusionPaint | LinePaint | SymbolPaint | RasterPaint | CirclePaint | HeatmapPaint | HillshadePaint;
export type AnyMapMouseEventType = 'mousedown' | 'mouseup' | 'click' | 'dblclick' | 'mousemove' | 'mouseover' | 'mouseenter' | 'mouseleave' | 'mouseout' | 'contextmenu';

// Эти свойства не указаны в типе AnyLayout
export interface ExtendedSymbolLayout extends SymbolLayout {
  'text-variable-anchor': string[],
  'text-radial-offset': number,
}

export type MapboxMouseEventCb = (event: MapMouseEvent) => void;
