import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { getLyric } from '@/server/play'
import Lyric from 'lyric-parser'
export default function useLyric() {
    const currentLyric = ref(null)
    const store = useStore()
    const currentSong = computed(() => store.getters.currentSong)
    watch(currentSong, async (newV) => {
        if (!newV.id) return
        const lyric = await getLyric(newV)
        store.commit('addSongLyric', { song: newV, lyric })
        if (currentSong.value.lyric !== lyric) {
            return
        }
        currentLyric.value = new Lyric(lyric, handleFn)
        console.log(lyric)
    })
}
function handleFn() {

}
