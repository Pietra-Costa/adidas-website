import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'

type GLFTResult = {
    nodes: {
        [name: string]: THREE.Mesh
    }
}

export function Cube() {
    const { nodes } = useGLTF('test/cube.glb') as unknown as GLFTResult

    const texture = useTexture("test/baked-texture.png");

    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;

    return (
        <group dispose={null}>
            <mesh
                position={[1, 0, 0]}
                geometry={nodes.Cube.geometry}
            >
                <meshBasicMaterial map={texture} />
            </mesh>
        </group>
    )
}

useGLTF.preload('test/cube.glb')
