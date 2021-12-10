import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import {
    ref,
    onMounted,
    onUnmounted
} from '@vue/runtime-core'
BScroll.use(ObserveDOM)
export function useScroll(scrollWrapper, options, emit) {
    const bs = ref(null)
    onMounted(() => {
        // 虽然DOM已经渲染好了，但是此时请求是异步的，scrollWrapper的一个盒子的高度还没有撑开，不会进行滚动
        // 使用observe-dom,当这些 DOM 元素发生变化时，将会触发 scroll 的 refresh 方法
        bs.value = new BScroll(scrollWrapper.value, {
            observeDOM: true,
            ...options
        })
        if (options.probeType > 0) {
            bs.value.on('scroll', pos => {
                emit('scroll', pos)
            })
        }
    })
    onUnmounted(() => {
        bs.value.destroy()
    })
    return {
        bs
    }
}
