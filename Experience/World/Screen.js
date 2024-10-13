import * as THREE from 'three'
import Experience from '../Experience'
import * as dat from 'lil-gui'
import gsap from 'gsap'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

export default class Screen {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.cssScene = new THREE.Scene();
        this.setCSSRenderer()
        this.setIfame()
        this.update()
    }

    setCSSRenderer() {
        this.cssRenderer = new CSS3DRenderer();
        this.cssRenderer.setSize(this.sizes.width, this.sizes.height);
        this.cssRenderer.domElement.style.position = 'absolute';
        this.cssRenderer.domElement.style.top = 0;
        this.cssRenderer.domElement.style.zIndex = 1; 
        document.body.appendChild(this.cssRenderer.domElement);
        this.cssRenderer.render(this.cssScene, this.experience.camera.perspectiveCamera);
    }
    resize(){
        this.cssRenderer.setSize(this.sizes.width, this.sizes.height)
    }

    setIfame() {
        this.iframe = document.createElement('iframe');
        this.iframe.src = 'https://my-folio-omega.vercel.app/';
        this.iframe.style.width = '1200px';
        this.iframe.style.height = '800px';
        this.iframe.style.border = 'none';

        this.iframe.style.overflow = 'auto';
        this.iframe.tabIndex = 0;
        this.iframe.style.zIndex = 2; 
        this.cssObject = new CSS3DObject(this.iframe);        
        if(this.sizes.width < 1000){
            this.cssObject.position.set(-9.47,-6.88,-12.701)
            this.cssObject.scale.set(0.00168, 0.0012, 0.0011);
            this.cssObject.rotation.set(-0.06, -0.1045, 0.04);
        }else{
            this.cssObject.position.set(-2.64,-1.705,-6.5578)
            this.cssObject.scale.set(0.002, 0.0015, 0.0011);
            this.cssObject.rotation.set(-0.0326, -0.1045, 0.03);
        }
        // const gui = new dat.GUI();
        // gui.add(this.cssObject.position, 'x').min(-10).max(5).step(0.0001);
        // gui.add(this.cssObject.position, 'y').min(-10).max(5).step(0.0001);
        // gui.add(this.cssObject.position, 'z').min(-15).max(5).step(0.0001);
        // gui.add(this.cssObject.scale, 'x').min(0.001).max(1).step(0.0001);
        // gui.add(this.cssObject.scale, 'y').min(0.001).max(1).step(0.0001);
        // gui.add(this.cssObject.scale, 'z').min(0.001).max(1).step(0.0001);
        // gui.add(this.cssObject.rotation, 'x').min(-1).max(1).step(0.0001);
        // gui.add(this.cssObject.rotation, 'y').min(-1).max(1).step(0.0001);
        // gui.add(this.cssObject.rotation, 'z').min(-1).max(1).step(0.0001);
        this.cssScene.add(this.cssObject);
    }

    lookAtTv() {
        const mm = gsap.matchMedia();
        mm.add("(max-width: 1000px)", () => {
            // this.cssObject.position.set(0.176,-0.79,-6.8006)
            // this.cssObject.scale.set(0.0018, 0.0014, 0.0011);
            // this.cssObject.rotation.set(0, 0, -0.005);
            gsap.to(this.cssObject.position, {
                x:0.176,
                y: -0.79,
                z: -6.8006,
                duration: .23,
            });
            gsap.to(this.cssObject.scale, {
                x: 0.0018,
                y: 0.0014,
                z: 0.0011,
                duration: .23,
            });
            gsap.to(this.cssObject.rotation, {
                x: 0,
                y: 0,
                z: -0.005,
                duration: .23,
            });
        })
        mm.add("(min-width: 1000px)", () => {
            gsap.to(this.cssObject.position, {
                x:0.535,
                y: -0.1628,
                z: -6.5578,
                duration: .23,
            });
            gsap.to(this.cssObject.scale, {
                x: 0.0047,
                y: 0.0037,
                z: 0.0011,
                duration: .23,
            });
            gsap.to(this.cssObject.rotation, {
                x: 0,
                y: 0,
                z: -0.007,
                duration: .23,
            });
        })
    }

    lookAtHome() {
        const mm = gsap.matchMedia();
        mm.add("(max-width: 1000px)", () => {
            gsap.to(this.cssObject.position, {
                x:-9.47,
                y: -6.88,
                z: -12.701,
                duration: .23,
            });
            gsap.to(this.cssObject.scale, {
                x: 0.00168,
                y: 0.0012,
                z: 0.0011,
                duration: .23,
            });
            gsap.to(this.cssObject.rotation, {
                x: -0.06,
                y: -0.1045,
                z: 0.04,
                duration: .23,
            });

        })
        mm.add("(min-width: 1000px)", () => {
            gsap.to(this.cssObject.position, {
                x:-2.64,
                y: -1.705,
                z: -6.5578,
                duration: .23,
            });
            gsap.to(this.cssObject.scale, {
                x: 0.002,
                y: 0.0015,
                z: 0.0011,
                duration: .23,
            });
            gsap.to(this.cssObject.rotation, {
                x: -0.0326,
                y: -0.1045,
                z: 0.03,
                duration: .23,
            });
        })
    }

    update(){
        this.cssRenderer.render(this.cssScene, this.experience.camera.perspectiveCamera);
    }
}

