import { ref } from 'vue'

export default function useMiddleInterActive() {
    const cdMainStyle = ref(null)
    const touch = {}
    let isTranslate = false
    function onMiddleTouchStart(e) {
        touch.startX = e.touches[0].pageX
    }
    function onMiddleTouchMove(e) {
        touch.deltaX = e.touches[0].pageX - touch.startX
        touch.percent = Math.abs(touch.deltaX / window.innerWidth)
        if (touch.percent > 0.2) {
            isTranslate = true
        } else {
            isTranslate = false
        }
        cdMainStyle.value = {
            transform: `translate3D(${touch.deltaX}px, 0, 0)`,
            transitionDuration: '0ms'
        }
    }
    function onMiddleTouchEnd(e) {
        let offsetWidth
        if (!isTranslate) {
           offsetWidth = 0
        } else {
            offsetWidth = touch.deltaX < 0 ? -window.innerWidth : window.innerWidth
        }
        cdMainStyle.value = {
            transform: `translate3D(${offsetWidth}px, 0, 0)`,
            transitionDuration: '300ms'
        }
    }
    return {
        cdMainStyle,
        onMiddleTouchStart,
        onMiddleTouchMove,
        onMiddleTouchEnd
    }
}
