# leaflet-tilelayer-colorpicker
A Leaflet TileLayer with getColor(latLng)

## API
```
// factory
var layer = L.tilelayer.colorPicker(cors_enabled_url_template,options);
layer.addTo(map);

// getColor(latLng) returns Uint8Array ([r,g,b,a]) or null
var color = layer.getColor(map.getCenter()); 
var red = color[0];
var green = color[1];
var blue = color[2];
```

## Notice

+ CORS enabled Tile is required
+ DO NOT set `crossOrigin` option to false

## Demo : display color under cursor 

+ <https://frogcat.github.io/leaflet-tilelayer-colorpicker/>

## Demo : display elevation under cursor

+ <https://frogcat.github.io/leaflet-tilelayer-colorpicker/elevation.html>

See also : <http://maps.gsi.go.jp/development/demtile.html>
