'use client'
import { Canvas } from "@react-three/fiber"
import { MainStudioModel } from "./MainStudioModel"
import { OrbitControls } from "@react-three/drei"

const NewCanvas = () => {
  return (
    <Canvas style={{position: 'fixed', inset: 0, overflow: 'hidden'}}>
        <MainStudioModel/>
        <OrbitControls/>
    </Canvas>
  )
}

export default NewCanvas