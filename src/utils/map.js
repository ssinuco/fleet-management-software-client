import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import esriConfig from "@arcgis/core/config";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";

export const createMapView = (container) => {
    esriConfig.apiKey = 'AAPK44e9c618069b43c6a35a53b189a82166QXlK3SGlw0bSp59lHOhq0X1m3LvQyFOvjD0SN1aJNGff5pPqfzdea3PJ82USdecm';

    const map = new Map({
        basemap: 'topo-vector'
    });

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    const point = { //Create a point
        type: "point",
        longitude: 116.40537,
        latitude: 39.96796
    };
    const simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],  // Orange
        outline: {
            color: [255, 255, 255], // White
            width: 1
        }
    };

    const pointGraphic = new Graphic({
        geometry: point,
        symbol: simpleMarkerSymbol
    });
    graphicsLayer.add(pointGraphic);

    const view = new MapView({
        container: container,
        map: map,
        center: [116.50847, 39.90633],
        zoom: 10
    });

    return view;
}

export const addPoints = (view, positions) => {
    if(!view){
        return;
    }
    const graphics = view.map.layers;
    for (const graphic of graphics){
        graphic.removeAll();
        positions.forEach(
            position => {
                const point = { //Create a point
                    type: "point",
                    longitude: position.longitude,
                    latitude: position.latitude
                };
                const simpleMarkerSymbol = {
                    type: "simple-marker",
                    color: [226, 119, 40],  // Orange
                    outline: {
                        color: [255, 255, 255], // White
                        width: 1
                    }
                };

                const pointGraphic = new Graphic({
                    geometry: point,
                    symbol: simpleMarkerSymbol
                });
                graphic.add(pointGraphic);
            }
        );
    }
}
