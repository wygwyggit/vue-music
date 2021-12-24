import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
export default function useCd() {
    const store = useStore()
    const cdRef = ref(null)
    const cdImageRef = ref(null)
    const playing = computed(() => store.state.playing)
    const cdCls = computed(() => {
       return playing.value ? 'playing' : ''
    })
    watch(playing, (newVal) => {
        if (!newVal) {
            asyncTransform(cdRef.value, cdImageRef.value)
        }
    })
    function asyncTransform(wrapper, inner) {
        const wrapperTransform = getComputedStyle(wrapper).transform
        const innerTransform = getComputedStyle(inner).transform
        wrapper.style.transform = wrapperTransform === 'none' ? innerTransform : wrapperTransform.concat(' ', innerTransform)
    }
    return {
        cdCls,
        cdRef,
        cdImageRef
    }
}
