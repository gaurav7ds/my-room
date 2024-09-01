import { EventEmitter } from "events";
import * as THREE from 'three'
export default class Time extends EventEmitter{
    constructor(){
        super()
        this.clock = new THREE.Clock()
        this.current = 0
        this.elapsed = 0
        this.delta = 0

        this.tick()
    }

    tick(){
        this.current = this.clock.getElapsedTime()
        this.delta = this.current - this.elapsed
        this.elapsed = this.current
        this.emit('update')
        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}

