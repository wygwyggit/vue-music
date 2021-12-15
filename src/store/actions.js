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
