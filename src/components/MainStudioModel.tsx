import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useMainStudioTextures } from '../../lib/useTextures'
import { createMaterials } from '../../lib/material'
import { studioTextures } from '../../lib/textures'


type GLFTResult = {
    nodes: {
        [name: string]: THREE.Mesh
    }
}


export function MainStudioModel() {

    const { nodes } = useGLTF('/models/main/MainStudio.glb') as unknown as GLFTResult

    const textures = useMainStudioTextures()
    const mat = createMaterials(textures) as Record<keyof typeof studioTextures.main, THREE.MeshBasicMaterial>

    return (
        <group dispose={null}>
            <mesh
                geometry={nodes.Environment.geometry}
                material={mat.defaultStudio}
            />
            <mesh
                geometry={nodes.Shirt_White.geometry}
                position={[0.65, 0.7, -0.45]}
                rotation={[0, Math.PI / 9, 0]}
                material={mat.whiteShirt}

            />
            <mesh
                geometry={nodes.Shirt_Sport.geometry}
                position={[0, 0.7, 0]}
                material={mat.sportShirt}

            />
            <mesh
                geometry={nodes.Shirt_Gray.geometry}
                position={[-0.65, 0.7, -0.45]}
                rotation={[0, -Math.PI / 9, 0]}
                material={mat.grayShirt}

            />
            <mesh
                geometry={nodes.Hitbox.geometry}
                scale={[2.52, 1, 1]}
                visible={false}
            />
        </group>
    )
}

useGLTF.preload('/models/main/MainStudio.glb')