import * as THREE from 'three'
import gsap from 'gsap'
import Experience from '../Experience'
import Environment from './Environment'
import Room from './Room'
import Controls from './Controls'

export default class World {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.controls = new Controls()
        this.theme = this.experience.theme
        this.resources.on('ready', () => {
            this.environment = new Environment()
            this.room = new Room()
            this.scene.add(this.room.actualRoom)
        })
        this.theme.on('switch', (theme) => {
            this.swithTheme(theme)
        })
    }
    update(){ 
        if(this.room){
            const chair = this.room.chair
            chair.rotation.z = Math.sin(-this.experience.time.elapsed)*0.6 + 2.5            
        }
    }  

    swithTheme(theme){
        if(theme === 'dark'){
            this.room.material.map = this.room.nightTexture

            this.room.actualRoom.traverse((child) => {
                if(child instanceof THREE.Mesh && child.name!=='monitor' && child.name!=='macScreen'){
                    child.material = this.room.material
                    child.material.needsUpdate = true
                }
            })
            // this.room.screenMesh.material = this.room.screenMaterial
            // this.room.screenMesh.material.needsUpdate = true     
        }
        else if(theme === 'light'){
            this.room.material.map = this.room.dayTexture

            this.room.actualRoom.traverse((child) => {
                if(child instanceof THREE.Mesh && child.name!=='monitor' && child.name!=='macScreen'){
                    child.material = this.room.material
                    child.material.needsUpdate = true
                }
            })
        }
    }
}