import './style.css'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import {
  Cartesian3,
  Cesium3DTileset,
  Cesium3DTileStyle,
  Credit,
  OpenStreetMapImageryProvider,
  Terrain,
  Viewer
} from 'cesium'

async function main() {
  const raster_tile = new OpenStreetMapImageryProvider({
    url: 'https://cyberjapandata.gsi.go.jp/xyz/std/',
    credit: new Credit("<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院地図</a>"),
    maximumLevel: 18,
  })

  const viewer = new Viewer('app', {
    baseLayerPicker: false,
    terrain: Terrain.fromWorldTerrain(),
  })

  viewer.scene.imageryLayers.addImageryProvider(raster_tile)

  viewer.camera.setView({
    destination: Cartesian3.fromDegrees(140.00, 36.14, 20000000.0),
  })

  const endpoint = "https://tiles.smellman.org/kakegawa_v1.1/tileset.json"

  const tileset = await Cesium3DTileset.fromUrl(endpoint)
  viewer.scene.primitives.add(tileset)
  tileset.style = new Cesium3DTileStyle({
    pointSize: 5,
  })

  viewer.zoomTo(tileset)
}
main()
