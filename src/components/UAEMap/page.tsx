

// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'; // Don't forget to install this package
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import 'mapbox-gl/dist/mapbox-gl.css';

// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// export const UAEMap = () => {
//   const mapContainerRef = useRef(null);
//   const [coordinates, setCoordinates] = useState({ lng: 53.8478, lat: 23.4241 }); // Default center on UAE

//   useEffect(() => {
//     // Initialize Mapbox map
//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current, // Reference to the container element
//       style: 'mapbox://styles/mapbox/streets-v12',
//       center: [coordinates.lng, coordinates.lat], // Center the map on UAE
//       zoom: 6, // Set an appropriate zoom level
//     });

//     // Add navigation controls to the map (optional)
//     map.addControl(new mapboxgl.NavigationControl(), 'top-right');

//     // Initialize the marker and add it to the map
//     const marker = new mapboxgl.Marker()
//       .setLngLat([coordinates.lng, coordinates.lat])
//       .addTo(map);

//     // Initialize the geocoder and add it to the map
//     const geocoder = new MapboxGeocoder({
//       accessToken: mapboxgl.accessToken,
//       mapboxgl: mapboxgl,
//       marker: false, // Disable default marker
//       placeholder: 'Search for places in UAE', // Placeholder text
//       bbox: [51.583, 22.6304, 56.381, 26.072], // Bounding box for UAE (adjust if needed)
//       proximity: {
//         longitude: coordinates.lng,
//         latitude: coordinates.lat,
//       },
//     });

//     // Add geocoder to the map
//     map.addControl(geocoder);

//     // Add a source for a single point (for geocoder results)
//     map.on('load', () => {
//       map.addSource('single-point', {
//         type: 'geojson',
//         data: {
//           type: 'FeatureCollection',
//           features: [],
//         },
//       });

//       map.addLayer({
//         id: 'point',
//         source: 'single-point',
//         type: 'circle',
//         paint: {
//           'circle-radius': 10,
//           'circle-color': '#448ee4',
//         },
//       });

//       // Listen for the result event from the geocoder and update the map and marker
//       geocoder.on('result', (event:any) => {
//         const newCoordinates = event.result.geometry.coordinates;
//         map.getSource('single-point').setData(event.result.geometry);
//         marker.setLngLat(newCoordinates);
//         map.flyTo({ center: newCoordinates, zoom: 12 });
//         setCoordinates({ lng: newCoordinates[0], lat: newCoordinates[1] });
        
//       });
//     });

//     // Update marker on map click
//     map.on('click', (event) => {
//       const { lng, lat } = event.lngLat;
//       marker.setLngLat([lng, lat]);
//       setCoordinates({ lng, lat });
      
//     });

//     return () => map.remove();
//   }, []);

//   return (
//     <div>
//       <div id="mapContainer" ref={mapContainerRef} style={{ width: '100%', height: '300px' }} />
//       <p>Selected Coordinates: Longitude: {coordinates.lng}, Latitude: {coordinates.lat}</p>
//     </div>
//   );
// };

// export default UAEMap;


//with google map


// import React, { useRef, useEffect } from 'react';
// import mapboxgl from 'mapbox-gl';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import 'mapbox-gl/dist/mapbox-gl.css';

// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

// interface UAEMapProps {
//   coordinates: { lat: number; lng: number };
// }

// export const UAEMap = ({ coordinates }: UAEMapProps) => {
//   const mapContainerRef = useRef(null);

//   useEffect(() => {
//     console.log('Coordinates received by UAEMap:', coordinates);

//     if (!coordinates || isNaN(coordinates.lat) || isNaN(coordinates.lng)) {
//       console.error('Invalid coordinates received by UAEMap:', coordinates);
//       return;
//     }

//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/streets-v12',
//       center: [coordinates.lng, coordinates.lat],
//       zoom: 12,
//     });

//     const marker = new mapboxgl.Marker()
//       .setLngLat([coordinates.lng, coordinates.lat])
//       .addTo(map);

//     map.flyTo({ center: [coordinates.lng, coordinates.lat], zoom: 12 });

//     return () => map.remove();
//   }, [coordinates]);

//   return (
//     <div>
//       <div id="mapContainer" ref={mapContainerRef} style={{ width: '100%', height: '300px' }} />
//       <p>Selected Coordinates: Longitude: {coordinates.lng}, Latitude: {coordinates.lat}</p>
//     </div>
//   );
// };

// export default UAEMap;




//import in secondstep 
{/*
    
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>({ lat: 25.276987, lng: 55.296249 });
  

  const handleCoordinatesChange = (lat: number, lng: number) => {
    if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
      setCoordinates({ lat, lng });
    } else {
      console.error('Invalid coordinates:', { lat, lng });
    }
  };
  
  
  <GoogleMapSearch searchBoxRef={searchBoxRef} setValue={handleCoordinatesChange} />
<UAEMap coordinates={coordinates} /> */}