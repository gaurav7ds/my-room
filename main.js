import Experience from "./Experience/Experience";
import gsap from 'gsap'
const canvas = document.querySelector('canvas.webgl')
const experience = new Experience(canvas)

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

