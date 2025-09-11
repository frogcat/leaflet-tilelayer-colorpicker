import { TileLayer } from "leaflet";

export default class TileLayerWithColorPicker extends TileLayer {
  static {
    this.setDefaultOptions({
      crossOrigin: "anonymous",
    });
  }
  getColor(latlng) {
    const size = this.getTileSize();
    const point = this._map.project(latlng, this._tileZoom).floor();
    const coords = point.unscaleBy(size).floor();
    const offset = point.subtract(coords.scaleBy(size));
    coords.z = this._tileZoom;
    const tile = this._tiles[this._tileCoordsToKey(coords)];
    if (!tile || !tile.loaded) return null;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      const context = canvas.getContext("2d");
      context.drawImage(tile.el, -offset.x, -offset.y, size.x, size.y);
      return context.getImageData(0, 0, 1, 1).data;
    } catch (e) {
      return null;
    }
  }
}
