import {
    computed
} from 'vue'
export default function useShortCur(props) {
    const shortCutList = computed(() => {
        return props.data.map(item => item.title)
    })
    return {
        shortCutList
    }
}
