import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useMainStudioTextures } from '../../lib/useTextures'
import { createMaterials } from '../../lib/material'
import { studioTextures } from '../../lib/textures'
import { useState } from 'react'


type GLFTResult = {
    nodes: {
        [name: string]: THREE.Mesh
    }
}


export function MainStudioModel() {

    const { nodes } = useGLTF('/models/main/MainStudio.glb') as unknown as GLFTResult

    const textures = useMainStudioTextures()
    const mat = createMaterials(textures) as Record<keyof typeof studioTextures.main, THREE.MeshBasicMaterial>

    const [envMaterial, setEnvMaterial] = useState<THREE.MeshBasicMaterial>(mat.defaultStudio)

    const shirts = [
        {
            position: [0.65, 0.7, -0.45] as [number, number, number],
            rotation: [0, Math.PI / 9, 0] as [number, number, number],
            geometry: nodes.Shirt_White.geometry,
            material: mat.whiteShirt,
            hoverMat: mat.whiteStudio,
            slug: 'white'
        },
        {
            position: [0, 0.7, 0] as [number, number, number],
            rotation: [0, Math.PI / 9, 0] as [number, number, number],
            geometry: nodes.Shirt_Sport.geometry,
            material: mat.sportShirt,
            hoverMat: mat.redStudio,
            slug: 'sport'
        },
        {
            position: [-0.65, 0.7, -0.45] as [number, number, number],
            rotation: [0, Math.PI / 9, 0] as [number, number, number],
            geometry: nodes.Shirt_Gray.geometry,
            material: mat.grayShirt,
            hoverMat: mat.grayStudio,
            slug: 'gray'
        }
    ]


    function enterHandler(material: THREE.MeshBasicMaterial) {
        document.body.style.cursor = 'pointer';
        setEnvMaterial(material)
    }

    function leaveHandler() {
        document.body.style.cursor = 'auto';
    }

    return (
        <group dispose={null}>
            <mesh
                geometry={nodes.Environment.geometry}
                material={envMaterial}
            />

            {shirts.map((shirt, index) => (
                <mesh
                    key={index}
                    geometry={shirt.geometry}
                    material={shirt.material}
                    position={shirt.position}
                    rotation={shirt.rotation}
                    onPointerEnter={() => enterHandler(shirt.hoverMat)}
                    onPointerLeave={() => leaveHandler()}
                />
            ))}

            <mesh
                geometry={nodes.Hitbox.geometry}
                scale={[2.52, 1, 1]}
                visible={false}
                onPointerLeave={() => setEnvMaterial(mat.defaultStudio)}
            />
        </group>
    )
}

useGLTF.preload('/models/main/MainStudio.glb')