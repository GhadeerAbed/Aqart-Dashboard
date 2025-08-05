import { useEffect, useRef } from "react";

export default function GoogleMapSearch({
  searchBoxRef,
  setValue,
}: {
  searchBoxRef: any;
  setValue: any;
}) {
  const mapRef = useRef(null);
  const markerRef = useRef<google.maps.Marker | null>(null); // Ref to store the current marker

  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current || !searchBoxRef.current) {
        console.error("Map or search input ref is null");
        return;
      }

      // Initialize the map centered on Dubai
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 25.276987, lng: 55.296249 },
        zoom: 12,
        restriction: {
          latLngBounds: {
            north: 26.055,
            south: 22.631,
            west: 51.531,
            east: 56.396,
          },
          strictBounds: true,
        },
      });

      // Initialize the SearchBox with UAE bounds
      const uaeBounds = {
        north: 26.055,
        south: 22.631,
        west: 51.531,
        east: 56.396,
      };
      const searchBox = new google.maps.places.SearchBox(searchBoxRef.current, {
        bounds: uaeBounds,
      });

      // Bias the SearchBox results towards the UAE bounds
      map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
      });

      // Listener for the event when a user selects a place from the dropdown
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (!places || places.length === 0) {
          console.error("No places found");
          return;
        }

        const place = places[0];
        if (!place.geometry || !place.geometry.location) {
          console.error("Returned place contains no geometry");
          return;
        }

        // Ensure the selected place is within the UAE
        const latLng = place.geometry.location;
        const isInUAE = latLng.lat() >= 22.631 && latLng.lat() <= 26.055 &&
                        latLng.lng() >= 51.531 && latLng.lng() <= 56.396;

        if (!isInUAE) {
          console.error("Selected place is outside the UAE");
          return;
        }

        // Remove the previous marker, if it exists
        if (markerRef.current) {
          markerRef.current.setMap(null);
        }

        // Create a new marker for the selected place
        const marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: place.name,
        });

        // Store the new marker in the ref
        markerRef.current = marker;

        map.setCenter(latLng);
        map.setZoom(14);

        setValue("x", latLng.lat());
        setValue("y", latLng.lng());

        const addressComponents = place.address_components;
        let city = "";
        let area = "";
        let district = "";
        let buildingName = place.name;

        if (addressComponents) {
          addressComponents.forEach((component: any) => {
            const types = component.types;
            if (types.includes("locality") || types.includes("administrative_area_level_2")) {
              city = component.long_name;
            }
            if (types.includes("sublocality") || types.includes("neighborhood")) {
              area = component.long_name;
            }
            if (types.includes("route")) {
              district = component.long_name;
            }
          });
        }

        setValue("city", city);
        setValue("area", area);
        setValue("district", district);
        setValue("buildingName", buildingName);
      });
    };

    if (typeof google !== "undefined" && google.maps) {
      initMap();
    } else {
      console.error("Google Maps API is not loaded");
    }
  }, [searchBoxRef, setValue]);

  return (
    <div>
      <div ref={mapRef} id="map" style={{ height: "500px", width: "100%" }} />
    </div>
  );
}


//intgration with mapbox
// import { useEffect, useRef } from 'react';

// export default function GoogleMapSearch({
//   searchBoxRef,
//   setValue,
// }: {
//   searchBoxRef: any;
//   setValue: any;
// }) {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const initMap = () => {
//       if (!mapRef.current || !searchBoxRef.current) {
//         console.error("Map or search input ref is null");
//         return;
//       }

//       const map = new google.maps.Map(mapRef.current, {
//         center: { lat: 25.276987, lng: 55.296249 },
//         zoom: 12,
//         restriction: {
//           latLngBounds: {
//             north: 26.055,
//             south: 22.631,
//             west: 51.531,
//             east: 56.396,
//           },
//           strictBounds: true,
//         },
//       });

//       const searchBox = new google.maps.places.SearchBox(searchBoxRef.current);

//       map.addListener("bounds_changed", () => {
//         searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
//       });

//       searchBox.addListener("places_changed", () => {
//         const places = searchBox.getPlaces();
//         if (!places || places.length === 0) {
//           console.error("No places found");
//           return;
//         }

//         const place = places[0];
//         if (!place.geometry || !place.geometry.location) {
//           console.error("Returned place contains no geometry");
//           return;
//         }

//         const lat = place.geometry.location.lat();
//         const lng = place.geometry.location.lng();

//         console.log("Latitude:", lat);
//         console.log("Longitude:", lng);

//         setValue(lat, lng);

//         map.setCenter(place.geometry.location);
//         map.setZoom(14);

//         const marker = new google.maps.Marker({
//           position: place.geometry.location,
//           map: map,
//           title: place.name,
//         });

//         const addressComponents = place.address_components;
//         let city = "";
//         let buildingName = place.name;

//         addressComponents.forEach((component) => {
//           const types = component.types;
//           if (
//             types.includes("locality") ||
//             types.includes("administrative_area_level_2")
//           ) {
//             city = component.long_name;
//           }
//         });

//         setValue("city", city);
//         setValue("buildingName", buildingName);
//       });
//     };

//     if (typeof google !== "undefined" && google.maps) {
//       initMap();
//     } else {
//       console.error("Google Maps API is not loaded");
//     }
//   }, [searchBoxRef, setValue]);

//   return (
//     <div>
//       <div ref={mapRef} id="map" style={{ height: "500px", width: "100%" }} />
//     </div>
//   );
// }
