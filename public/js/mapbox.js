export const displayMap = async (locations) => {
  // mapboxgl.accessToken =
  //   'pk.eyJ1Ijoia2lsbGlhbmdlbW9ldHMiLCJhIjoiY2xiczhwMG9oMHl0MDN1bXZ2cjBlOWhpNiJ9.1kpBKmU2mRSHDE9jE4GlEA';
  mapboxgl.accessToken =
    'pk.eyJ1Ijoia2lsbGlhbmdlbW9ldHMiLCJhIjoiY2xiczkyYnJlMTFpNjNwa2UwZ2xyYzRociJ9.0Ah6r0O7rKXzUFCA52j_8g';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    // style: 'mapbox://styles/killiangemoets/clbsa4sb7002v15pntvkabk6v', // style URL
    style: 'mapbox://styles/killiangemoets/clcdpld4j009w14oxa2fmtnvx', // style URL
    //   center: [-118.1, 34.1], // starting position [lng, lat]
    zoom: 4, // starting zoom
    //   interactive: false,
    // scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Create Popup
    const popup = new mapboxgl.Popup({
      offset: 30,
    })
      .setHTML(`<h3>Day ${loc.day}: ${loc.description}</h3>`)
      .addTo(map);

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .setPopup(popup)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<h3>Day ${loc.day}: ${loc.description}</h3>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });

  const directions = await axios(
    `https://api.mapbox.com/directions/v5/mapbox/walking/${locations
      .reduce((acc, loc) => {
        return acc + `${loc.coordinates[0]},${loc.coordinates[1]};`;
      }, '')
      .slice(
        0,
        -1
      )}?access_token=pk.eyJ1Ijoia2lsbGlhbmdlbW9ldHMiLCJhIjoiY2xjZHIzOTI4MDF6MTNybjBwNXRnZjM1YyJ9.6KlAze9wPLj3rmb2ykhgdQ&geometries=geojson`
  );

  map.on('load', () => {
    map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: directions.data.routes[0].geometry.coordinates,
        },
      },
    });
    map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#CC704B',
        'line-width': 6,
      },
    });
  });
};
