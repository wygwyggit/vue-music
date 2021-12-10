import {
    ref,
    computed
} from 'vue'
export default function useShortCur(props, groupRef) {
    const bsRef = ref(null)
    const shortCutList = computed(() => {
        return props.data.map(item => item.title)
    })
    const touch = {}
    let SHORTCUTITEM_HEIGHT = 0
    const onShortCutTouchStart = function (e) {
        const idx = Number(e.target.dataset.index)
        SHORTCUTITEM_HEIGHT = e.target.clientHeight
        touch.y1 = e.touches[0].pageY
        touch.idx = idx
        scrollTo(idx)
    }
    const onShortCutTouchMove = function(e) {
        touch.y2 = e.touches[0].pageY
        const distance = (touch.y2 - touch.y1) / SHORTCUTITEM_HEIGHT | 0
        const idx = touch.idx + distance
        scrollTo(idx)
    }
    function scrollTo(index) {
        if (isNaN(index)) return
        index = Math.max(0, Math.min(index, shortCutList.value.length - 1))
        const targetEl = groupRef.value.children[index]
        const scroll = bsRef.value.bs
        scroll.scrollToElement(targetEl, 0)
    }
    return {
        shortCutList,
        onShortCutTouchStart,
        onShortCutTouchMove,
        bsRef
    }
}
