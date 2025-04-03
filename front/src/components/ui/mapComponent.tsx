import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import { fetchRoute } from '@/components/api'

const MyMapComponent: React.FC<{ 
  pickupCoords: { lat: number, lon: number }; 
  dropoffCoords: { lat: number, lon: number };
  currentCoords: { lat: number, lon: number };
}> = ({ pickupCoords, dropoffCoords, currentCoords }) => {
    const [routePoints, setRoutePoints] = useState<[number, number][]>([
        [pickupCoords.lat, pickupCoords.lon],
        [dropoffCoords.lat, dropoffCoords.lon],
    ]);
    const [pickCurrPoints, setPickCurr] = useState<[number, number][]>([
        [currentCoords.lat, currentCoords.lon],
        [pickupCoords.lat, pickupCoords.lon],
    ]);

    useEffect(() => {
        const getRoute = async () => {
            try {
                const points = await fetchRoute(pickupCoords, dropoffCoords);
                const currentPonits = await fetchRoute(currentCoords, pickupCoords);
                setRoutePoints(points);
                setPickCurr(currentPonits);
            } catch (error) {
                console.error('Error getting route:', error);
            }
        };

        getRoute();
    }, [pickupCoords, dropoffCoords, currentCoords]);

    // Calculate bounds to fit both markers
    const bounds = [
        [pickupCoords.lat, pickupCoords.lon],
        [dropoffCoords.lat, dropoffCoords.lon],
        
    ];

    return (
        <div className='border-2 h-[700px] w-full flex justify-center items-center'>
            <MapContainer 
                bounds={bounds as any}
                style={{ height: '700px', width: '800px' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[pickupCoords.lat, pickupCoords.lon]} />
                <Marker position={[dropoffCoords.lat, dropoffCoords.lon]} />
                <Marker position={[currentCoords.lat, currentCoords.lon]} />
                <Polyline
                    positions={pickCurrPoints}
                    color='red'
                    weight={3}
                    opacity={0.7}
                >

                </Polyline>
                <Polyline 
                    positions={routePoints}
                    color="blue"
                    weight={3}
                    opacity={0.7}
                />
            </MapContainer>
        </div>
    )
}

export default MyMapComponent;