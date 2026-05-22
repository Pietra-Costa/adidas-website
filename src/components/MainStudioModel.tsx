import { useGLTF, useTexture } from '@react-three/drei'
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

    function enterHandler(material: THREE.MeshBasicMaterial){
        document.body.style.cursor = 'pointer';
        setEnvMaterial(material)
    }

    function leaveHandler(){
        document.body.style.cursor = 'auto';
    }

    return (
        <group dispose={null}>
            <mesh
                geometry={nodes.Environment.geometry}
                material={envMaterial}
            />
            <mesh
                geometry={nodes.Shirt_White.geometry}
                position={[0.65, 0.7, -0.45]}
                rotation={[0, Math.PI / 9, 0]}
                material={mat.whiteShirt}
                onPointerEnter = {() =>enterHandler(mat.whiteStudio)}
                onPointerLeave = {leaveHandler}

            />
            <mesh
                geometry={nodes.Shirt_Sport.geometry}
                position={[0, 0.7, 0]}
                material={mat.sportShirt}
                onPointerEnter = {() =>enterHandler(mat.redStudio)}
                onPointerLeave = {leaveHandler}

            />
            <mesh
                geometry={nodes.Shirt_Gray.geometry}
                position={[-0.65, 0.7, -0.45]}
                rotation={[0, -Math.PI / 9, 0]}
                material={mat.grayShirt}
                onPointerEnter = {() =>enterHandler(mat.grayStudio)}
                onPointerLeave = {leaveHandler}
            />
            <mesh
                geometry={nodes.Hitbox.geometry}
                scale={[2.52, 1, 1]}
                visible={false}
                onPointerLeave = {() => setEnvMaterial(mat.defaultStudio)}
            />
        </group>
    )
}

useGLTF.preload('/models/main/MainStudio.glb')