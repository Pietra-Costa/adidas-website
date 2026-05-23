'use client'
import { Canvas } from "@react-three/fiber"
import Rig from "./Rig"
import { View } from "@react-three/drei"
import { useEffect, useState } from "react"

const ViewCanvas = () => {

  const [eventSource, setEventSource] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setEventSource(document.body)
  }, [])

  return (
    <Canvas 
    style={{position: 'fixed', inset: 0, overflow: 'hidden'}} camera={{position: [0, 0.7, 3], fov: 30
    }}
    eventSource={eventSource ?? undefined}
    >
        <View.Port/>
        <Rig/>
    </Canvas>
  )
}

export default ViewCanvas