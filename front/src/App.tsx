import './App.css'
import './index.css'

import {Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/components/axios"
import {useRef, useState} from 'react'
import {fetchCoordinates} from "@/components/api"
import MyMapComponent from './components/ui/mapComponent'

function App() {

    const pickuplocationRef = useRef<HTMLInputElement | null>(null)
    const dropofflocationRef = useRef<HTMLInputElement | null>(null)
    const currentlocationRef = useRef<HTMLInputElement | null>(null)
    const currentcycleusingRef = useRef<HTMLInputElement | null>(null)
    const [mapData, setMapData] = useState<{pickupCoords: {lat: number, lon: number}; dropoffCoords: {lat: number, lon: number}}  | null> (null)
    const [display, setDisplay] = useState(false)
    const [start, setStart] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const pickuplocation = pickuplocationRef.current?.value ?? '';
      const dropofflocation = dropofflocationRef.current?.value ?? '';
      const currentlocation = currentlocationRef.current?.value ?? '';
      const currentcycleusing = currentcycleusingRef.current?.value ?? '';

      if (!pickuplocation ||!dropofflocation ||!currentlocation ||!currentcycleusing) {
        alert('All fields are required')
        return;
      }
      if (pickuplocationRef.current) pickuplocationRef.current.value = ''
      if (dropofflocationRef.current) dropofflocationRef.current.value = ''
      if (currentlocationRef.current) currentlocationRef.current.value = ''
      if (currentcycleusingRef.current) currentcycleusingRef.current.value = ''
      
      
      const response = await axiosInstance.post('http://localhost:8000/api/trip/',{
        "pickup_location":  pickuplocation,
        "dropoff_location":  dropofflocation,
        "current_location":  currentlocation,
        "current_cycle_using":  currentcycleusing,
      })
      if (response.status != 201){
          console.error(response.data)
      }
      else {
        try{
          const pickupCoords = await fetchCoordinates(response.data.tripInfo.pickup_location);
          const dropoffCoords = await fetchCoordinates(response.data.tripInfo.dropoff_location);
          setDisplay(true);
          setMapData({pickupCoords, dropoffCoords});
        }
        catch(error){
          console.error(error)
        }
      }


    }
    
  return (
    <>
    
      <div className='h-[700px] w-full flex-col justify-center items-center'>
        <h1 className='text-5xl text-gray-900'>Welcome to Cycle-Safe</h1>
        <Button variant="outline" className='w-32 h-12 text-lg' onClick={() => setStart(true)}>send</Button>
      </div>
    {!display ? (
      <form onSubmit={handleSubmit}>
      <Card className='h-[700px] bg-gray-700/20 flex justify-center items-center'>
        <Card  className='h-[400px] w-[400px] min-w-[250px] bg-gray-100/60 p-5 gap-5 flex-col items-center justify-center'>
        {/* <Label> pickup location</Label> */}
          <Input className='border border-gray-600/50 h-12' placeholder='pickup location' ref={pickuplocationRef}></Input>
        {/* <Label>dropoff location</Label> */}
          <Input className='border border-gray-600/50 h-12' placeholder='dropoff location'  ref={dropofflocationRef} ></Input>
        {/* <Label>current location</Label> */}
          <Input className='border border-gray-600/50 h-12' placeholder='current location'  ref={currentlocationRef} ></Input>
        {/* <Label>current cycle using</Label> */}
          <Input className='border border-gray-600/50 h-12' placeholder='count of current cycle'  ref={currentcycleusingRef}></Input>
          <Button variant="outline" className='w-32 h-12 text-lg' type='submit'>send</Button>

        </Card>
      </Card>
    </form>
      ):(
        mapData && <MyMapComponent pickupCoords={mapData.pickupCoords} dropoffCoords={mapData.dropoffCoords}></MyMapComponent>

    )
    }

    </>
  )
}

export default App
