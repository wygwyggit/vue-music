import {
    ref,
    watch,
    computed,
    nextTick
} from 'vue'
export default function useFixed(props) {
    const titleHeight = ref(0)
    const groupRef = ref(null)
    const listHeights = ref([])
    const scrollY = ref(0)
    const currentIndex = ref(0)
    const distance = ref(0)
    const fixedTitle = computed(() => {
        if (scrollY.value < 0) {
            return ''
        }
        const currentGroup = props.data[currentIndex.value]
        return currentGroup ? currentGroup.title : ''
    })
    const fixidStyle = computed(() => {
        const distanceVal = distance.value
        const diff = (distanceVal > 0 && distanceVal < titleHeight.value) ? distanceVal - titleHeight.value : 0
        return {
            transform: `translate3D(0,${diff}px,0)`
        }
    })
    watch(() => props.data, async () => {
        await nextTick()
        caculate()
    })
    watch(scrollY, newV => {
        const listHeightsVal = listHeights.value
        for (let i = 0; i < listHeightsVal.length - 1; i++) {
            const top = listHeightsVal[i]
            const bottom = listHeightsVal[i + 1]
            if (newV >= top && newV <= bottom) {
                currentIndex.value = i
                distance.value = bottom - newV
            }
        }
    })

    function caculate() {
        const list = groupRef.value.children
        titleHeight.value = list[0] ? list[0].firstChild.clientHeight : 30
        const listHeightsVal = listHeights.value
        listHeightsVal.length = 0
        let height = 0
        listHeightsVal.push(height)
        for (let i = 0; i < list.length; i++) {
            height += list[i].clientHeight
            listHeightsVal.push(height)
        }
    }

    function onScroll(pos) {
        scrollY.value = -pos.y
    }
    return {
        groupRef,
        onScroll,
        fixedTitle,
        fixidStyle,
        currentIndex
    }
}
