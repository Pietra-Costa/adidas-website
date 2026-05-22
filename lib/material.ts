import * as THREE from 'three'

export function createMaterials(textures: Record<string, THREE.Texture>) {

    const mats:Record<string, THREE.MeshBasicMaterial> = {}

    for (const [key, texture] of Object.entries(textures)) {
        mats [key] = new THREE.MeshBasicMaterial({map: texture})
    }

    return mats
}