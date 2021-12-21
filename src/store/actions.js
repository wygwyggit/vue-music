import { PLAY_MODE } from '@/assets/js/constant'
import { shuffleSelf } from '@/assets/js/utils'
export function selectPlay ({ commit }, { list, index }) {
    commit('setPlayMode', PLAY_MODE.sequence)
    commit('setSequenceList', list)
    commit('setPlaylist', list)
    commit('setPlayingState', true)
    commit('setCurrentIndex', index)
    commit('setFullScreen', true)
}
export function randomPlay ({ commit }, { list }) {
    commit('setPlayMode', PLAY_MODE.random)
    commit('setSequenceList', list)
    commit('setPlaylist', shuffleSelf(list))
    commit('setPlayingState', true)
    commit('setCurrentIndex', 0)
    commit('setFullScreen', true)
}
export function changeMode({ commit, state, getters }, mode) {
    const id = getters.currentSong.id
    if (mode === PLAY_MODE.random) {
        commit('setPlaylist', shuffleSelf(state.sequenceList))
    } else {
        commit('setPlaylist', state.sequenceList)
    }
    const index = state.playlist.findIndex(x => x.id === id)
    commit('setCurrentIndex', index)
    commit('setPlayMode', mode)
}
