import axios from 'axios';

const nominatimURL = 'https://nominatim.openstreetmap.org/search';
const osrmURL = 'https://router.project-osrm.org/route/v1/driving';

export const fetchCoordinates = async (location: string) => {
  const response = await axios.get(nominatimURL, {
    params: {
      q: location,
      format: 'json'
    }
  });
  const data = response.data;
  if (data.length === 0) {
    throw new Error('Location not found');
  }
  return { lat: data[0].lat, lon: data[0].lon };
};

// New function to fetch the route between two points
export const fetchRoute = async (pickup: { lat: number, lon: number }, dropoff: { lat: number, lon: number }) => {
  try {
    const response = await axios.get(
      `${osrmURL}/${pickup.lon},${pickup.lat};${dropoff.lon},${dropoff.lat}`,
      {
        params: {
          overview: 'full',
          geometries: 'geojson'
        }
      }
    );

    if (response.data.code !== 'Ok') {
      return [[pickup.lat, pickup.lon], [dropoff.lat, dropoff.lon]];
    }

    // Convert coordinates from [lon, lat] to [lat, lon] for Leaflet
    return response.data.routes[0].geometry.coordinates.map(
      (coord: [number, number]) => [coord[1], coord[0]]
    );
  } catch (error) {
    console.error('Error fetching route:', error);
    // Fallback to straight line if route fetching fails
    return [[pickup.lat, pickup.lon], [dropoff.lat, dropoff.lon]];
  }
};