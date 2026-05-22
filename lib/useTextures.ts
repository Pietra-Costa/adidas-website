import { useTexture } from "@react-three/drei"
import { studioTextures } from "./textures"
import * as THREE from 'three'

export const useMainStudioTextures = () => {
    const textures = useTexture(studioTextures.main)

    Object.values(textures).forEach((texture) => {
        texture.flipY = false;
        texture.colorSpace = THREE.SRGBColorSpace;
    })
    return textures
}