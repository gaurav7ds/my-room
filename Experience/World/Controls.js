
import { EventEmitter } from "events";
import Experience from "../Experience.js";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger"
export default class Controls extends EventEmitter{
    constructor(){
        super()
        gsap.registerPlugin(ScrollTrigger)
        this.experience = new Experience();
        this.camera = this.experience.camera;
        this.sizes = this.experience.sizes;
        this.mouse = {
            x: 0,
            y: 0
        }
        window.addEventListener("mousemove", ()=>{
            this.mouse.x = (event.clientX / this.sizes.width)*2 - 1
            this.mouse.y = (-event.clientY / this.sizes.height)*2 + 1
            this.emit('update')
        })
        this.currentMode = 'home'
        document.querySelector('.about').addEventListener('click', () => {
            if(this.currentMode == 'about'){
                return
            }
            this.experience.camera.lookAtTv(this.currentMode)
            this.experience.screen.lookAtTv()
            this.currentMode = 'about'
        })
        document.querySelector('.home-btn').addEventListener('click', () => {
            if(this.currentMode == 'home'){
                return
            }
            this.experience.camera.lookAtHome(this.currentMode)
            this.experience.screen.lookAtHome()
            this.currentMode = 'home'
        })
        document.querySelector('.skills').addEventListener('click', () => {
            if(this.currentMode == 'skills'){
                return
            }
            this.experience.camera.lookAtSkills(this.currentMode)
            this.experience.camera.lookAtSkills()
            this.currentMode = 'skills'
        })
    }

}