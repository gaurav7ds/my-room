import * as THREE from 'three'

import Experience from '../Experience'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.addAmbientLight()
        //this.addDirectionalLight()
    }

    addAmbientLight(){
        this.ambientLight = new THREE.AmbientLight('#ffffff', 10)
        this.scene.add(this.ambientLight)
    }

    addDirectionalLight(){
        // this.directionalLight = new THREE.DirectionalLight('#ffffff', 20)
        // this.directionalLight.position.set(3, 3, 1)
        // this.scene.add(this.directionalLight)
    }
}