import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { getLyric } from '@/server/play'
import Lyric from 'lyric-parser'
export default function useLyric({ songReady, currentTime }) {
    const currentLyric = ref(null)
    const currentLineNum = ref(0)
    const scrollRef = ref(null)
    const lyricRef = ref(null)
    const playingLyric = ref(null)
    const currentView = ref('cd')
    const store = useStore()
    const currentSong = computed(() => store.getters.currentSong)
    watch(currentSong, async (newV) => {
        if (!newV.id) return
        stopLyric()
        currentLyric.value = null
        currentLineNum.value = 0
        const lyric = await getLyric(newV)
        store.commit('addSongLyric', { song: newV, lyric })
        if (currentSong.value.lyric !== lyric) {
            return
        }
        currentLyric.value = new Lyric(lyric, handleFn)
        if (songReady.value) {
            playLyric()
        }
    })
    return {
        currentLyric,
        currentLineNum,
        playLyric,
        stopLyric,
        scrollRef,
        lyricRef,
        playingLyric,
        currentView,
        toggleView
    }
    function playLyric() {
        const currentLyricV = currentLyric.value
        if (currentLyricV) {
            currentLyricV.seek(currentTime.value * 1000)
        }
    }
    function stopLyric() {
        const currentLyricV = currentLyric.value
        if (currentLyricV) {
            currentLyricV.stop()
        }
    }
    function handleFn({ lineNum, txt }) {
        // 歌词播放一行后执行的callback
        currentLineNum.value = lineNum
        const scrollComp = scrollRef.value
        const lyricEl = lyricRef.value
        playingLyric.value = txt
        if (lineNum > 7) {
            scrollComp.bs.scrollToElement(lyricEl.children[lineNum - 7], 1000)
        } else {
            scrollComp.bs.scrollTo(0, 0, 1000)
        }
    }
    function toggleView() {
        if (currentView.value === 'cd') {
            currentView.value = 'lyric'
        } else {
            currentView.value = 'cd'
        }
    }
}
