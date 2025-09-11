# leaflet-tilelayer-colorpicker

A Leaflet TileLayer with getColor(latLng)

# for Leaflet 1.x

## API

```javascript
// factory
var layer = L.tilelayer.colorPicker(cors_enabled_url_template, options);
layer.addTo(map);

// getColor(latLng) returns Uint8Array ([r,g,b,a]) or null
var color = layer.getColor(map.getCenter());
var red = color[0];
var green = color[1];
var blue = color[2];
```

### Preconditions

- CORS enabled Tiles are required.
- `crossOrigin` option is set to **anonymous** by default, DO NOT set to false manually.

## Demo

### display color under cursor

- <https://frogcat.github.io/leaflet-tilelayer-colorpicker/>

### display elevation under cursor using GSI's DEM PNG Tile

- <https://frogcat.github.io/leaflet-tilelayer-colorpicker/elevation.html>

See also : <http://maps.gsi.go.jp/development/demtile.html>

### display color under cursor, map tiles are obtained via CORS enabled WMS

- <https://frogcat.github.io/leaflet-tilelayer-colorpicker/wms.html>

See also : <https://pacific-data.sprep.org/dataset/landsat-8-satellite-imagery-collection-1-papua-new-guinea>

# for Leaflet 2.x

[leaflet-tilelayer-colorpicker.js](https://github.com/frogcat/leaflet-tilelayer-colorpicker/blob/master/leaflet-tilelayer-colorpicker.js)
has been rewritten as
[TileLayerWithColorPicker.js](https://github.com/frogcat/leaflet-tilelayer-colorpicker/blob/master/TileLayerWithColorPicker.js),
an ES Module for Leaflet 2.0.

## Usage

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>TileLayerWithColorPicker for leaflet 2.0.0-alpha.1</title>
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0" />
    <link href="https://unpkg.com/leaflet@2.0.0-alpha.1/dist/leaflet.css" rel="stylesheet" />
    <script type="importmap">
      {
        "imports": {
          "leaflet": "https://unpkg.com/leaflet@2.0.0-alpha.1/dist/leaflet.js",
          "colorpicker": "https://frogcat.github.io/leaflet-tilelayer-colorpicker/TileLayerWithColorPicker.js"
        }
      }
    </script>
  </head>
  <body>
    <div id="map" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0"></div>
    <script type="module">
      import { Map } from "leaflet";
      import TileLayerWithColorPicker from "colorpicker";

      const map = new Map("map").setView([35.6323, 139.768815], 15);

      const colorpicker = new TileLayerWithColorPicker(
        "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
        {
          maxZoom: 18,
          attribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html">GSI pale</a>',
        }
      ).addTo(map);

      map.on("pointermove", function (event) {
        const a = colorpicker.getColor(event.latlng);
        if (a !== null) {
          const hex = "#" + (0x1000000 + (a[0] << 16) + (a[1] << 8) + a[2]).toString(16).substr(1);
          var tmpl = "<b style='background:@;color:black;'>@</b>";
          if (Math.min(a[0], a[1], a[2]) < 0x40) tmpl = tmpl.replace("black", "white");
          map.attributionControl.setPrefix(tmpl.replace(/@/g, hex));
        } else {
          map.attributionControl.setPrefix("unavailable");
        }
      });
    </script>
  </body>
</html>
```

## Demo

### display color under cursor for Leaflet 2.0

- <https://frogcat.github.io/leaflet-tilelayer-colorpicker/TileLayerWithColorPicker.html>
