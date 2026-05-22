'use client'
import { Canvas } from "@react-three/fiber"
import { MainStudioModel } from "./MainStudioModel"
import Rig from "./Rig"

const ViewCanvas = () => {
  return (
    <Canvas style={{position: 'fixed', inset: 0, overflow: 'hidden'}} camera={{position: [0, 0.7, 3], fov: 30
    }}>
        <MainStudioModel/>
        <Rig/>
    </Canvas>
  )
}

export default ViewCanvas