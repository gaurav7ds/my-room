import * as THREE from 'three'
import Experience from '../Experience'

export default class Room {
    constructor() {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.room = this.resources.items.room
        this.dayTexture = this.resources.items.dayTexture
        this.nightTexture = this.resources.items.nightTexture
        this.screenTexture = this.resources.items.skillsTexture
        this.macTexture = this.resources.items.macTexture
        this.setModel()
    }

    setModel() {
        this.actualRoom = this.room.scene
        this.dayTexture.flipY = false
        this.nightTexture.flipY = false
        this.screenTexture.flipY = false
        this.macTexture.flipY = false
        this.macTexture.colorSpace = THREE.SRGBColorSpace
        this.screenTexture.colorSpace = THREE.SRGBColorSpace
        this.dayTexture.colorSpace = THREE.SRGBColorSpace
        this.nightTexture.colorSpace = THREE.SRGBColorSpace
        this.material = new THREE.MeshBasicMaterial({
            map: this.dayTexture
        })
        this.screenMaterial = new THREE.MeshBasicMaterial({
            map: this.screenTexture
        })
        this.macMaterial = new THREE.MeshBasicMaterial({
            map: this.macTexture
        })
        this.actualRoom.traverse((child) => {
            if (child instanceof THREE.Mesh && child.name!=='monitor' && child.name!=='macScreen') {
                child.material = this.material
            }
        })
        this.screenMesh = this.actualRoom.getObjectByName('monitor');
        this.macMesh = this.actualRoom.getObjectByName('macScreen');
        this.chair = this.actualRoom.getObjectByName('chair');
        this.screenMesh.material = this.screenMaterial
        this.macMesh.material = this.macMaterial
        this.screenMesh.material.needsUpdate = true
        this.macMesh.material.needsUpdate = true

        this.actualRoom.position.y = -.35
        if(this.experience.sizes.width<1000){
            this.actualRoom.scale.setScalar(.08);
        }else{
            this.actualRoom.scale.setScalar(.2);
        }


    }
}