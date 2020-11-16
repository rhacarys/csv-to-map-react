import mapboxgl from "mapbox-gl";

/**
 * Kit of static methods for handling a mapbox-gl map.
 */
class MapController {
  /**
   * Inserts a Marker into the given map.
   *
   * @param map The map to insert the Marker.
   * @param position An array containing the latitude and longitude to draw the Marker.
   */
  static drawMarker(map, position) {
    return new mapboxgl.Marker().setLngLat(position).addTo(map);
  }

  /**
   * Inserts a Marker into the given map.
   *
   * @param map The map to insert the Marker.
   * @param point An object containing a geom attribute, to extract the coordinates to draw the Marker.
   */
  static drawPoint(map, point) {
    if (point && point.geom && point.geom.coordinates) {
      return this.drawMarker(map, point.geom.coordinates);
    }
    return null;
  }

  /**
   * Inserts a set of Markers into the given map.
   *
   * @param map The map to insert the Markers.
   * @param points An array of objects that contains a geom attribute, to extract the coordinates to draw the Markers.
   */
  static drawAllPoints(map, points) {
    const markers = [];
    points.map((point) => markers.push(this.drawPoint(map, point)));
    return markers;
  }

  /**
   * Performs zoom and pan actions on the map, in order to frame all the given markers on the screen.
   *
   * @param map The map to make the interatcion.
   * @param markers The markers to frame in the screen.
   */
  static zoomToMarkers(map, markers) {
    const points = [];
    markers.map((m) => points.push(Object.values(m.getLngLat())));

    const bounds = points.reduce(function (bounds, coord) {
      return bounds.extend(coord);
    }, new mapboxgl.LngLatBounds(points[0], points[0]));

    map.fitBounds(bounds, {
      padding: { top: 200, bottom: 100, left: 100, right: 100 },
      easing(t) {
        return t * (2 - t);
      },
    });
  }

  /**
   * Removes all the given Markers from his maps.
   *
   * @param markers The markers to remove.
   */
  static removeMarkers(markers) {
    if (markers) {
      markers.map((marker) => marker.remove());
    }
  }

  /**
   * Removes the old markers from his maps. Then, inserts new markers on the given map.
   *
   * @param map The map to insert the Markers.
   * @param points An array of objects that contains a geom attribute, to extract the coordinates to draw the Markers.
   * @param oldMarkers The old markers to be removed from his maps.
   */
  static updateMarkers(map, points, oldMarkers) {
    this.removeMarkers(oldMarkers);
    const newMarkers = MapController.drawAllPoints(map, points);
    MapController.zoomToMarkers(map, newMarkers);
    return newMarkers;
  }
}

export default MapController;
