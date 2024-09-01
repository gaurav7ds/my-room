import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import Experience from "./Experience";
import gsap from "gsap";

export default class Camera {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.setPerspectiveCamera()
    }

    setPerspectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 1000)
        this.perspectiveCamera.position.z = 2.23
        this.perspectiveCamera.position.x = 2.23
        this.perspectiveCamera.position.y = 1.3

        // const gui = new dat.GUI();
        // gui.add(this.perspectiveCamera.position, 'x').min(-5).max(5).step(0.001);
        // gui.add(this.perspectiveCamera.position, 'y').min(-5).max(5).step(0.001);
        // gui.add(this.perspectiveCamera.position, 'z').min(-15).max(15).step(0.001);
        // gui.add(this.perspectiveCamera.rotation, 'x').min(-1).max(1).step(0.001);
        // gui.add(this.perspectiveCamera.rotation, 'y').min(-1).max(1).step(0.001);
        // gui.add(this.perspectiveCamera.rotation, 'z').min(-1).max(1).step(0.001);

        this.perspectiveCamera.lookAt(0, 0, 0)
        this.scene.add(this.perspectiveCamera)
    }
    resize() {
        this.perspectiveCamera.aspect = this.sizes.aspect
        this.perspectiveCamera.updateProjectionMatrix()
    }
    lookAtTv(mode) {
        const screenMesh = this.experience.world.room.actualRoom.getObjectByName('tvScreen');
        const monitorMesh = this.experience.world.room.actualRoom.getObjectByName('monitor');
        const targetPosition = new THREE.Vector3();
        screenMesh.getWorldPosition(targetPosition);

        let target = { x: 0, y: 0, z: 0 }

        if (mode == 'home') {
            target = { x: 0, y: 0, z: 0 };
        } else {
            let monitorPosition = new THREE.Vector3();
            monitorMesh.getWorldPosition(monitorPosition);
            target = { x: monitorPosition.x, y: monitorPosition.y, z: monitorPosition.z };
        }
        const mm = gsap.matchMedia();
        mm.add("(max-width: 1000px)", () => {
            gsap.to(target, {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: .24,
                onUpdate: () => {
                    this.perspectiveCamera.lookAt(target.x, target.y, target.z);
                }
            });
            gsap.to(this.perspectiveCamera.position, {
                z: 0.76,
                x: 0.206,
                y: 0,
                duration: .24,
            });
        });
        mm.add("(min-width: 1000px)", () => {
            gsap.to(target, {
                x: targetPosition.x,
                y: targetPosition.y,
                z: targetPosition.z,
                duration: .24,
                onUpdate: () => {
                    this.perspectiveCamera.lookAt(target.x, target.y, target.z);
                }
            });
            gsap.to(this.perspectiveCamera.position, {
                z: 0.04,
                x: 0.5,
                y: 0.3,
                duration: .24,
            });
        })
        // mm.add("(max-width: 1000px)", () => {
        //     gsap.to(target, {
        //         x: targetPosition.x,
        //         y: targetPosition.y,
        //         z: targetPosition.z,
        //         duration: .24,
        //         onUpdate: () => {
        //             this.perspectiveCamera.lookAt(target.x, target.y, target.z);
        //         }
        //     });
        //     gsap.to(this.perspectiveCamera.position, {
        //         z: 0.76,
        //         x: 0.206,
        //         y: 0,
        //         duration: .24,
        //     });
        // })

    }
    lookAtHome(mode) {
        const screenMesh = this.experience.world.room.actualRoom.getObjectByName('tvScreen');
        const monitorMesh = this.experience.world.room.actualRoom.getObjectByName('monitor');
        const targetPosition = new THREE.Vector3();
        if (mode == 'about') {
            screenMesh.getWorldPosition(targetPosition);
        } else {
            monitorMesh.getWorldPosition(targetPosition);
        }
        const target = { x: 0, y: 0, z: 0 };

        gsap.to(targetPosition, {
            x: target.x,
            y: target.y,
            z: target.z,
            duration: .24,
            onUpdate: () => {
                this.perspectiveCamera.lookAt(targetPosition.x, targetPosition.y, targetPosition.z);
            }
        });

        gsap.to(this.perspectiveCamera.position, {
            z: 2.23,
            x: 2.23,
            y: 1.3,
            duration: .24,
        });
    }
    lookAtSkills(mode) {
        const monitorMesh = this.experience.world.room.actualRoom.getObjectByName('monitor');
        const screenMesh = this.experience.world.room.actualRoom.getObjectByName('tvScreen');
        const monitorPosition = new THREE.Vector3();
        monitorMesh.getWorldPosition(monitorPosition);

        let target = { x: 0, y: 0, z: 0 };

        if (mode === 'home') {
            target = { x: 0, y: 0, z: 0 };
        } else {
            let tvPosition = new THREE.Vector3();
            screenMesh.getWorldPosition(tvPosition);
            target = { x: tvPosition.x, y: tvPosition.y, z: tvPosition.z };

        }
        const mm = gsap.matchMedia();

        mm.add("(max-width: 1000px)", () => {
            gsap.to(target, {
                x: monitorPosition.x,
                y: monitorPosition.y,
                z: monitorPosition.z,
                duration: .24,
                onUpdate: () => {
                    this.perspectiveCamera.lookAt(target.x, target.y, target.z);
                }
            });
            gsap.to(this.perspectiveCamera.position, {
                x: 0.37,
                y: -0.14,
                z: 0,
                duration: .24,
            });
        })
        mm.add("(min-width: 1000px)", () => {
            gsap.to(target, {
                x: monitorPosition.x,
                y: monitorPosition.y,
                z: monitorPosition.z,
                duration: .24,
                onUpdate: () => {
                    this.perspectiveCamera.lookAt(target.x, target.y, target.z);
                }
            });
            gsap.to(this.perspectiveCamera.position, {
                x: -0.1,
                y: 0.3,
                z: 0,
                duration: .24,
            });
        })
    }
    update() {
        // this.perspectiveCamera.updateProjectionMatrix();
        // if (this.experience.world.room) {
        //     const screenMesh = this.experience.world.room.actualRoom.getObjectByName('monitor');
        //     const monitorPosition = new THREE.Vector3();
        //     screenMesh.getWorldPosition(monitorPosition);
        //     this.perspectiveCamera.lookAt(monitorPosition);
        // }
    }
}