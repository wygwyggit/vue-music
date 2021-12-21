<template>
    <div :class="prefixCls" v-show="fullScreen">
        <div class="main-play" v-show="fullScreen">
            <div class="bg-img" :style="bgImageStyle">
            </div>
            <div class="top">
                <i class="back music-icon icon-down" @click="goBack"></i>
                <div class="song-name">
                    {{currentSong.name}}
                </div>
                <div class="song-singer">{{ songSingers }}</div>
            </div>
            <div class="bottom">
                <div class="operators">
                    <div class="icon i-left">
                        <i class="music-icon" :class="modeIcon" @click="changeMode"></i>
                    </div>
                    <div class="icon i-left">
                        <i class="music-icon icon-prev" @click="prevPlay"></i>
                    </div>
                    <div class="icon i-center">
                        <i class="music-icon" :class="{'icon-pause': playing,'icon-mplay': !playing }" @click="togglePlay"></i>
                    </div>
                    <div class="icon i-right">
                        <i class="music-icon icon-next" @click="nextPlay"></i>
                    </div>
                    <div class="icon i-right">
                        <i class="music-icon" :class="getFavoriteIcon(currentSong)" @click="toggleFavorite(currentSong)"></i>
                    </div>
                </div>
            </div>
        </div>
        <audio ref="audioRef" @pause="pause" @canplay="ready" @error="error"></audio>
    </div>
</template>

<script>
    import {
        computed,
        ref
    } from '@vue/reactivity'
    import {
        getSongInfo
    } from '@/server/play'
    import {
        useStore
    } from 'vuex'
    import {
        watch
    } from '@vue/runtime-core'
    import useMode from './use-mode'
    import useFavorite from './use-favorite'
    export default {
        name: 'play',
        setup() {
            const prefixCls = 'play'
            const audioRef = ref(null)
            const songInfo = ref(null)
            // 歌曲是否准备好
            const songReady = ref(false)
            const store = useStore()
            // 初始化main-play播放器
            const fullScreen = computed(() => store.state.fullScreen)
            const currentSong = computed(() => store.getters.currentSong)
            const songSingers = computed(() => {
                const arr = (currentSong.value.ar || []).map(x => x.name)
                return arr.join('/')
            })
            const playing = computed(() => store.state.playing)
            const bgImageStyle = computed(() => {
                let backgroundImage = ''
                const songInfoV = songInfo.value
                if (songInfoV) {
                    backgroundImage = `url(${songInfoV.al.picUrl})`
                }
                return {
                    backgroundImage
                }
            })
            const {
                modeIcon,
                changeMode
            } = useMode()
            const {
                getFavoriteIcon,
                toggleFavorite
            } = useFavorite()
            watch(currentSong, async (newSong) => {
                const songId = newSong.id
                if (!songId) {
                    return
                }
                songReady.value = false
                songInfo.value = await getSongInfo(songId)
                const audioEl = audioRef.value
                if (!songInfo.value.songUrl) {
                    audioEl.src = ''
                    songReady.value = true
                    store.commit('setPlayingState', false)
                    return console.log('歌曲暂时无法播放')
                }
                audioEl.src = songInfo.value.songUrl
                audioEl.play()
            })
            watch(playing, newVal => {
                const audioEl = audioRef.value
                if (newVal) {
                    audioEl.play()
                } else {
                    audioEl.pause()
                }
            })
            const currentIndex = computed(() => store.state.currentIndex)
            const playList = computed(() => store.state.playlist)

            function ready() {
                if (songReady.value) return
                songReady.value = true
            }
            function error() {
                songReady.value = true
            }
            function prevPlay() {
                const list = playList.value
                if (!songReady.value || !list.length || list.length === 1) return
                let index = currentIndex.value - 1
                if (index < 0) {
                    index = list.length - 1
                }
                if (!playing.value) {
                    store.commit('setPlayingState', true)
                }
                store.commit('setCurrentIndex', index)
            }
            function togglePlay() {
                if (!songInfo.value.songUrl || !songReady.value) return
                store.commit('setPlayingState', !playing.value)
            }
            function nextPlay() {
                const list = playList.value
                if (!songReady.value || !list.length || list.length === 1) return
                let index = currentIndex.value + 1
                if (index === list.length) {
                    index = 0
                }
                if (!playing.value) {
                    store.commit('setPlayingState', true)
                }
                store.commit('setCurrentIndex', index)
            }
            // 播放器退出全屏
            function goBack() {
                store.commit('setFullScreen', false)
            }
            function pause() {
                store.commit('setPlayingState', false)
            }

            return {
                prefixCls,
                fullScreen,
                currentSong,
                songSingers,
                songInfo,
                bgImageStyle,
                playing,
                audioRef,
                goBack,
                togglePlay,
                ready,
                error,
                prevPlay,
                nextPlay,
                pause,
                // mode
                modeIcon,
                changeMode,
                // favorite
                getFavoriteIcon,
                toggleFavorite
            }
        }
    }
</script>

<style lang="scss" scoped>
    $prefixCls:'play';

    .#{$prefixCls} {
        .main-play {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #161824;

            .top {
                color: #fff;
                text-align: center;

                .back {
                    position: absolute;
                    top: .16rem;
                    left: .5rem;
                    z-index: 50;
                    font-size: .5rem;
                }

                .song-name {
                    width: 70%;
                    margin: 0 auto;
                    line-height: 1rem;
                    text-align: center;
                    @include no-wrap();
                    font-size: .5rem;
                }

                .song-singer {
                    font-size: .4rem;
                }
            }

            .bottom {
                position: absolute;
                bottom: .67rem;
                width: 100%;

                .operators {
                    display: flex;
                    align-items: center;

                    .icon {
                        flex: 1;
                        color: #fff;

                        i {
                            font-size: 30px;
                        }
                    }

                    .i-left {
                        text-align: right;
                    }

                    .i-center {
                        padding: 0 20px;
                        text-align: center;

                        i {
                            font-size: 1.3rem;
                        }
                    }

                    .i-right {
                        text-align: left
                    }

                    .icon-like {
                        color: $--color-danger;
                    }
                }
            }

            .bg-img {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                opacity: .6;
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                filter: blur(40px);

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>
