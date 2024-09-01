import * as THREE from 'three'

import Sizes from './utils/Sizes'
import Time from './utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import Resources from './utils/Resources'
import World from './World/World'

import Theme from './utils/Theme'
import Screen from './World/Screen'

import assets from './utils/assets'

export default class Experience {
    static instance
    constructor(canvas){
        if (Experience.instance) {
            return Experience.instance
        }
        Experience.instance = this
        this.canvas = canvas
        this.sizes = new Sizes()
        this.scene = new THREE.Scene()
        this.theme = new Theme()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.time = new Time()
        this.resources = new Resources(assets)
        this.screen = new Screen()
        this.world = new World()

        this.sizes.on('resize', () => {
            this.resize()
        })
        this.time.on('update', () => {
            this.update()
        })
    }

    resize(){
        this.camera.resize()    
        this.renderer.resize()    
    }
    update(){
        this.renderer.update()
        this.screen.update()
        this.world.update()
    }
}