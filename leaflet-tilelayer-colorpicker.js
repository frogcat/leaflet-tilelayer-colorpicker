(function() {
  L.TileLayer.ColorPicker = L.TileLayer.extend({
    options: {
      crossOrigin: "anonymous"
    },
    getColor: function(latlng) {
      var size = this.getTileSize();
      var point = this._map.project(latlng, this._tileZoom).floor();
      var coords = point.unscaleBy(size).floor();
      var offset = point.subtract(coords.scaleBy(size));
      coords.z = this._tileZoom;
      var tile = this._tiles[this._tileCoordsToKey(coords)];
      if (!tile || !tile.loaded) return null;
      try {
        var canvas = document.createElement("canvas");
        canvas.width = 1;
        canvas.height = 1;
        var context = canvas.getContext('2d');
        context.drawImage(tile.el, -offset.x, -offset.y, size.x, size.y);
        return context.getImageData(0, 0, 1, 1).data;
      } catch (e) {
        return null;
      }
    }
  });
  L.tileLayer.colorPicker = function(url, options) {
    return new L.TileLayer.ColorPicker(url, options);
  };
})();
