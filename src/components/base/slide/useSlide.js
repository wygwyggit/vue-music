import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import {
    ref,
    onMounted,
    onUnmounted
} from '@vue/runtime-core'
BScroll.use(Slide)
export function useSlide(slideWrapper) {
    const slide = ref(null)
    const currentPageIndex = ref(0)
    onMounted(() => {
        const slideVal = slide.value = new BScroll(slideWrapper.value, {
            click: true,
            scrollX: true,
            scrollY: false,
            momentum: false,
            bounce: false,
            probeType: 2,
            slide: true
        })
        slideVal.on('slideWillChange', page => {
            currentPageIndex.value = page.pageX
        })
    })
    onUnmounted(() => {
        slide.value.destroy()
    })
    return {
        slide,
        currentPageIndex
    }
}
