'use client'
import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Cube } from './Cube'

const Test = () => {
  return (
    <Canvas style={{position:"fixed"}}>
        <Environment preset='studio'/>
        <OrbitControls/>
        <mesh position={[-1,0,0]}>
            <boxGeometry/>
            <meshStandardMaterial color='pink'/>
        </mesh>

          {/* <mesh  position={[1,0,0]} scale={2}>
            <boxGeometry/>
            <meshBasicMaterial color='blue'/>
        </mesh> */}
        <Cube/>
    </Canvas>
  )
}

export default Test