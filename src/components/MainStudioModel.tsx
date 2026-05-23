import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useMainStudioTextures } from '../../lib/useTextures'
import { createMaterials } from '../../lib/material'
import { studioTextures } from '../../lib/textures'
import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRouter } from 'next/navigation'

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

    const meshRefs = useRef<(THREE.Mesh | null)[]>([])

    const tlRefs = useRef<GSAPTimeline[]>([])

    const router = useRouter()

    useGSAP(() => {
        if (!meshRefs.current) return;
        meshRefs.current.forEach((mesh, index) => {
            if (!mesh) return;
            tlRefs.current[index] = gsap.timeline({paused: true}).to(mesh.rotation, {y:0, duration: 1, ease: 'power1.inOut'})
            .to(mesh.scale, {x:1.05, y:1.05, z:1.05, duration: 1, ease: 'power1.inOut'}, "<")
        })
    })

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

    useEffect(() => {
        shirts.forEach((shirt) => {
            router.prefetch(`/shirts/${shirt.slug}`)
        })
    }, [router])


    function enterHandler(index: number,material: THREE.MeshBasicMaterial) {
        document.body.style.cursor = 'pointer';
        setEnvMaterial(material)
        tlRefs.current[index].play()
    }

    function leaveHandler(index: number) {
        document.body.style.cursor = 'auto';
        tlRefs.current[index].reverse()
    }

    function handleClick(slug: string) {
        router.push(`/shirts/${slug}`)
    }

    return (
        <group dispose={null}>
            <mesh
                geometry={nodes.Environment.geometry}
                material={envMaterial}
            />

            {shirts.map((shirt, index) => (
                <mesh
                ref={(m) => {
                    if (!m) return;
                    meshRefs.current[index] = m;
                }}
                    key={index}
                    geometry={shirt.geometry}
                    material={shirt.material}
                    position={shirt.position}
                    rotation={shirt.rotation}
                    onPointerEnter={() => enterHandler(index,shirt.hoverMat)}
                    onPointerLeave={() => leaveHandler(index)}
                    onClick={() => handleClick(shirt.slug)}
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