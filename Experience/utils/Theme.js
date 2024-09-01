import { EventEmitter } from 'events'
import gsap from 'gsap'
export default class Theme extends EventEmitter {
    constructor() {
        super()
        this.theme = 'light'
        this.toggler = document.querySelector('.toggle-bg')
        this.toggleBall = document.querySelector('.toggle-ball')

        this.toggler.addEventListener('click', () => {
            this.changeTheme()
        })

        const splitText = [...document.querySelectorAll('.split-text')]
        const tl = gsap.timeline()
        setTimeout(() => {
            tl.to(splitText, {
                opacity: 1,
                duration: 4,
                stagger: .3
            })
                .to('.home-loader', {
                    yPercent: -100,
                    duration: 1,
                    ease: 'power4.inOut',
                })
        }, 100)

    }

    changeTheme() {
        setTimeout(() => {
            this.toggleBall.classList.toggle('active')
        }, 100)
        this.theme = this.theme === 'light' ? 'dark' : 'light'
        this.emit('switch', this.theme)
    }
}