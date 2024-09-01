import Experience from "../Experience";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EventEmitter } from "events";

export default class Resources extends EventEmitter
{
    constructor(assets)
    {
        super()
        this.experience = new Experience()
        this.assets = assets
        this.length = assets.length
        this.assetsLoaded = 0
        this.items = {}
        this.setLoaders()
        this.startLoading()
    }   

    setLoaders(){
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
    }

    startLoading(){
        for(const asset of this.assets){
            if(asset.type === 'gltfModel'){
                this.loaders.gltfLoader.load(asset.path, (file) => {
                    this.loadItem(asset, file)
                })
            }else if(asset.type === 'imageTexture'){
                this.loaders.textureLoader.load(asset.path, (file) => {
                    this.loadItem(asset, file)
                })
            }
        }
    }

    loadItem(asset, file){
        this.items[asset.name] = file
        this.assetsLoaded++
        if(this.assetsLoaded === this.length){
            this.emit('ready')
        }
    }
}