import './App.css'
import './index.css'

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { axiosInstance } from "@/components/axios"
import { useRef, useState } from 'react'
import { fetchCoordinates } from "@/components/api"
import MyMapComponent from './components/ui/mapComponent'

function App() {
  const pickuplocationRef = useRef<HTMLInputElement | null>(null)
  const dropofflocationRef = useRef<HTMLInputElement | null>(null)
  const currentlocationRef = useRef<HTMLInputElement | null>(null)
  const currentcycleusingRef = useRef<HTMLInputElement | null>(null)
  const [mapData, setMapData] = useState<{ pickupCoords: { lat: number, lon: number }; dropoffCoords: { lat: number, lon: number };currentCoords: { lat: number, lon: number } } | null>(null)
  const [display, setDisplay] = useState(false)
  const [errorField, setError] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const pickuplocation = pickuplocationRef.current?.value ?? '';
    const dropofflocation = dropofflocationRef.current?.value ?? '';
    const currentlocation = currentlocationRef.current?.value ?? '';
    const currentcycleusing = currentcycleusingRef.current?.value ?? '';

    if (!pickuplocation || !dropofflocation || !currentlocation || !currentcycleusing) {
      alert('All fields are required')
      return;
    }

    try {

          const response = await axiosInstance.post('http://localhost:8000/api/trip/', {
            "pickup_location": pickuplocation,
            "dropoff_location": dropofflocation,
            "current_location": currentlocation,
            "current_cycle_using": currentcycleusing,
          })
          if (response.status != 201) {
            console.error(response.data)
          }
          else {
            const pickupCoords = await fetchCoordinates(response.data.tripInfo.pickup_location);
            const dropoffCoords = await fetchCoordinates(response.data.tripInfo.dropoff_location);
            const currentCoords = await fetchCoordinates(response.data.tripInfo.current_location)
            setDisplay(true);
            setMapData({ pickupCoords, dropoffCoords, currentCoords });
          }
    }
    catch (error) {
      if (error instanceof Error && 'response' in error && typeof error.response === 'object' && error.response !== null && 'data' in error.response) {
        console.error(error.response.data);  
      } else {
        console.error('An unknown error occurred:', error);
      }
      setError(true);
    }
  }

  return (
    <>
      {!display ? (
        <form onSubmit={handleSubmit} className="w-full min-h-screen p-4">
          <Card className="
          min-h-[700px]
          min-w-[300px] 
          bg-gray-700/20 
          flex 
          justify-center 
          items-center 
          px-4 
          sm:px-6 
          md:px-8 
          lg:px-10
        ">
            <Card className="
            w-full
            max-w-[90%]
            min-w-[280px]
            sm:max-w-[450px]
            md:max-w-[500px]
            lg:max-w-[550px]
            h-auto
            min-h-[400px]
            bg-gray-100/60 
            p-4
            sm:p-6
            md:p-8
            space-y-4
            sm:space-y-6
            flex
            flex-col
            items-center 
            justify-center
          ">
              <Input
                className="
                w-full
                border 
                border-gray-600/50 
                h-12 
                rounded-md
                px-4
                mb-4
              "
                placeholder="pickup location"
                ref={pickuplocationRef}
              />
              <Input
                className="
                w-full
                border 
                border-gray-600/50 
                h-12 
                rounded-md
                px-4
                mb-4
              "
                placeholder="dropoff location"
                ref={dropofflocationRef}
              />
              <Input
                className="
                w-full
                border 
                border-gray-600/50 
                h-12 
                rounded-md
                px-4
                mb-4
              "
                placeholder="current location"
                ref={currentlocationRef}
              />
              <Input
                className="
                w-full
                border 
                border-gray-600/50 
                h-12 
                rounded-md
                px-4
                mb-4
              "
                placeholder="count of current cycle"
                ref={currentcycleusingRef}
              />
              <span>{errorField}</span>
              <Button
                variant="outline"
                className="
                w-full
                sm:w-32 
                h-12 
                text-lg
                transition-all
                hover:bg-gray-200
              "
                type="submit"
              >
                send
              </Button>
            </Card>
          </Card>
        </form>
      ) : (
        <div className="w-full h-screen">
          {mapData && <MyMapComponent
            pickupCoords={mapData.pickupCoords}
            dropoffCoords={mapData.dropoffCoords}
            currentCoords={mapData.currentCoords}
          />}
        </div>
      )}
    </>
  )
}

export default App