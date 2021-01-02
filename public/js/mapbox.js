export const displayMap = (locations) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoidG9raXlhLTAyIiwiYSI6ImNrajhxY2VwMzZ3eG0ycnFqa3JvYWxwNnEifQ.ZI5B-b0yuLXnmmNugaaspw';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/tokiya-02/ckj8qkvo726l218nsvtjivtmn',
        scrollZoom: false
        // center: [-118.113491,34.11745],
        // zoom:10,
        // interactive: false
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc => {
        // Create marker
        const el = document.createElement('div');
        el.className = 'marker';

        // Add marker
        new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
        })
        .setLngLat(loc.coordinates)
        .addTo(map);

        // Add popup
        new mapboxgl.Popup({
            offset: 30
        })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map);

        //  Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds,{
        padding: {
        top: 200,
        buttom: 150,
        left: 100,
        right: 100
        }
    });
}