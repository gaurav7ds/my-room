import {EventEmitter} from 'events'
import gsap from 'gsap'
export default class Theme extends EventEmitter{
    constructor(){
        super()
        this.theme = 'light'
        this.toggler = document.querySelector('.toggle-bg')
        this.toggleBall = document.querySelector('.toggle-ball')

        this.toggler.addEventListener('click', ()=>{
            this.changeTheme()
        })

    }

    changeTheme(){
        setTimeout(()=>{
            this.toggleBall.classList.toggle('active')
        },100)
        this.theme = this.theme === 'light' ? 'dark' : 'light'
        this.emit('switch', this.theme)
    }
}