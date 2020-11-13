import mapboxgl from 'mapbox-gl'

class MapController {

    static drawMarker(map, position) {
        return new mapboxgl.Marker()
          .setLngLat(position)
          .addTo(map);
    }
    
    static drawPoint(map, point) {
        if (point && point.geom && point.geom.coordinates) {
            return this.drawMarker(map, point.geom.coordinates)
        }
        return null
    }
    
    static drawAllPoints(map, points) {
        const markers = []
        points.map(point => markers.push(this.drawPoint(map, point)));
        return markers
    }

    static zoomToMarkers(map, markers) {
        const points = [];
        markers.map(m => points.push(Object.values(m.getLngLat())))

        const bounds = points.reduce(function(bounds, coord) {
            return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(points[0], points[0]));

        map.fitBounds(bounds, {
        padding: { top: 200, bottom: 100, left: 100, right: 100 },
        easing(t) {
            return t * (2 - t);
        }
        });
    }

    static removeMarkers(markers) {
        if (markers) {
            markers.map(marker => marker.remove())
        }
    }

    static updateMarkers(map, points, oldMarkers) {
        const newMarkers = MapController.drawAllPoints(map, points)
        MapController.zoomToMarkers(map, newMarkers)
        this.removeMarkers(oldMarkers)
        return newMarkers
    }
}

export default MapController