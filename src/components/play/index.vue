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
            <div class="middle" @click="toggleView" @touchstart.prevent="onMiddleTouchStart"
            @touchmove.prevent="onMiddleTouchMove"
            @touchend.prevent="onMiddleTouchEnd"
            >
                <div class="content">
                    <div :style="{opacity:(currentView === 'cd' ? '1' : '0')}">
                        <div class="cd-border">
                            <div class="cd-wrapper" ref="cdRef" :style="cdMainStyle">
                                <div class="cd">
                                    <img :src="songInfo.al.picUrl" alt="" v-if="songInfo && songInfo.al.picUrl" ref="cdImageRef"
                                        :class="cdCls">
                                </div>
                            </div>
                            <div class="cd-wrapper right" :style="cdMainStyle">

                            </div>
                        </div>

                        <div class="playing-lyric-wrapper">
                            <p class="playing-lyric">{{playingLyric}}</p>
                        </div>
                    </div>
                    <scroll class="lyric-scroll" ref="scrollRef"
                        :style="{opacity:(currentView === 'lyric' ? '1' : '0')}">
                        <div class="lyric-wrapper">
                            <div v-if="currentLyric" ref="lyricRef">
                                <p v-for="(item, index) of currentLyric.lines" :key="item.time" class="text"
                                    :class="{'current': currentLineNum == index}">{{item.txt}}</p>
                            </div>
                        </div>
                    </scroll>
                </div>
            </div>
            <div class="bottom">
                <div class="progress-wrapper">
                    <span class="time time-l">{{formatTime(currentTime)}}</span>
                    <div class="progress-bar-wrapper">
                        <progress-bar :progress="progress" @progress-changing="progressChanging"
                            @progress-changed="progressChanged"></progress-bar>
                    </div>
                    <span class="time time-r">{{formatTime(duration)}}</span>
                </div>
                <div class="operators">
                    <div class="icon i-left">
                        <i class="music-icon" :class="modeIcon" @click="changeMode"></i>
                    </div>
                    <div class="icon i-left">
                        <i class="music-icon icon-prev" @click="prevPlay"></i>
                    </div>
                    <div class="icon i-center">
                        <i class="music-icon" :class="{'icon-pause': playing,'icon-mplay': !playing }"
                            @click="togglePlay"></i>
                    </div>
                    <div class="icon i-right">
                        <i class="music-icon icon-next" @click="nextPlay"></i>
                    </div>
                    <div class="icon i-right">
                        <i class="music-icon" :class="getFavoriteIcon(currentSong)"
                            @click="toggleFavorite(currentSong)"></i>
                    </div>
                </div>
            </div>
        </div>
        <audio ref="audioRef" @pause="pause" @canplay="ready" @error="error" @timeupdate="updateTime"
            @ended="end"></audio>
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
    import scroll from '@/components/base/scroll'
    import progressBar from './progress.vue'
    import useMode from './use-mode'
    import useFavorite from './use-favorite'
    import useLyric from './use-lyric'
    import useCd from './use-cd'
    import useMiddleInterActive from './use-middle-interactive'
    import {
        PLAY_MODE
    } from '@/assets/js/constant'
    import {
        formatTime
    } from '@/assets/js/utils'
    export default {
        name: 'play',
        components: {
            progressBar,
            scroll
        },
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

            // 歌曲进度条
            const currentTime = ref(0)
            const duration = ref(0)
            let isProgressChanging = false
            const progress = computed(() => {
                return currentTime.value / duration.value
            })

            function updateTime(e) {
                if (!isProgressChanging) {
                    currentTime.value = e.target.currentTime
                }
            }

            function progressChanging(progress) {
                isProgressChanging = true
                currentTime.value = duration.value * progress
                // 先同步歌词位置
                playLyric()
                // 暂停播放，手指松开再播放
                stopLyric()
            }

            function progressChanged(progress) {
                isProgressChanging = false
                audioRef.value.currentTime = currentTime.value = duration.value * progress
                playLyric()
            }

            function end() {
                if (playMode.value === PLAY_MODE.loop) {
                    loopPlay()
                } else {
                    nextPlay()
                }
            }

            const {
                modeIcon,
                playMode,
                changeMode
            } = useMode()
            const {
                getFavoriteIcon,
                toggleFavorite
            } = useFavorite()
            const {
                cdCls,
                cdRef,
                cdImageRef
            } = useCd()
            // 歌词
            const {
                currentLyric,
                currentLineNum,
                playLyric,
                stopLyric,
                scrollRef,
                lyricRef,
                playingLyric,
                currentView,
                toggleView
            } = useLyric({
                songReady,
                currentTime
            })

            // 歌曲左右滑动切歌
           const { cdMainStyle, onMiddleTouchStart, onMiddleTouchMove, onMiddleTouchEnd } = useMiddleInterActive()

            watch(currentSong, async (newSong) => {
                const songId = newSong.id
                if (!songId) {
                    return
                }
                currentTime.value = 0
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
                    playLyric()
                } else {
                    audioEl.pause()
                    stopLyric()
                }
            })
            const currentIndex = computed(() => store.state.currentIndex)
            const playList = computed(() => store.state.playlist)

            function ready() {
                if (songReady.value) return
                songReady.value = true
                console.log(playLyric)
                playLyric()
                setTimeout(() => {
                    duration.value = audioRef.value.duration
                }, 300)
            }

            function error() {
                songReady.value = true
            }

            function prevPlay() {
                const list = playList.value
                if (!songReady.value || !list.length || list.length === 1) return;
                (songInfo.value.al || {}).picUrl = ''
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
                if (!songReady.value || !list.length || list.length === 1) return;
                (songInfo.value.al || {}).picUrl = ''
                let index = currentIndex.value + 1
                if (index === list.length) {
                    index = 0
                }
                if (!playing.value) {
                    store.commit('setPlayingState', true)
                }
                store.commit('setCurrentIndex', index)
            }

            function loopPlay() {
                const audioEl = audioRef.value
                audioEl.currentTime = currentTime.value = 0
                audioEl.play()
                store.commit('setPlayingState', true)
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
                toggleFavorite,
                // 进度条
                progress,
                currentTime,
                updateTime,
                duration,
                formatTime,
                progressChanging,
                progressChanged,
                end,
                // cd
                cdCls,
                cdRef,
                cdImageRef,
                // lyric
                currentLyric,
                currentLineNum,
                scrollRef,
                lyricRef,
                playingLyric,
                currentView,
                toggleView,
                // middleInterActive
                cdMainStyle,
                onMiddleTouchStart,
                onMiddleTouchMove,
                onMiddleTouchEnd
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
            display: flex;
            flex-direction: column;
            background-color: #161824;

            .top {
                padding-bottom: .7rem;
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
                    padding-top: .1rem;
                    font-size: .4rem;
                }
            }

            .middle {
                flex: 1;

                .content {
                    position: relative;
                    width: 100%;
                    height: 0;
                    padding-top: 80%;
                    white-space: nowrap;

                    >div {
                        transition: all .3s linear;
                    }

                    .cd-border {
                        position: absolute;
                        top: 0;
                        left: 10%;
                        width: 80%;
                        height: 100%;
                        border: .4rem solid hsla(0,0%,100%,.1);
                        border-radius: 50%;
                    }

                    .cd-wrapper {
                        position: relative;
                        display: inline-block;
                        width: 100%;
                        height: 100%;
                        margin: auto auto;
                        box-sizing: border-box;
                        border-radius: 50%;
                        overflow: hidden;
                        background: url('./images/default-cd.png');
                        background-size: contain;
                        &.right {
                            margin-left: 40%;
                        }
                    }

                    .playing-lyric-wrapper {
                        width: 80%;
                        margin: .7rem auto 0 auto;
                        overflow: hidden;
                        text-align: center;
                        font-size: .4rem;
                        color: hsla(0, 0%, 100%, .8)
                    }

                    .cd {
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        width: 65%;
                        height: 65%;
                        border-radius: 50%;
                        overflow: hidden;
                        background-size: contain;
                        transform: translate(-50%, -50%);

                        img {
                            width: 100%;
                            height: 100%;

                            &.playing {
                                animation: playing 20s linear infinite;
                            }
                        }
                    }
                }

                .lyric-scroll {
                    position: fixed;
                    width: 100%;
                    top: 2rem;
                    bottom: 4rem;
                    white-space: nowrap;
                    font-size: 0;
                    overflow: hidden;

                    .lyric-wrapper {
                        width: 80%;
                        margin: 0 auto;
                        text-align: center;

                        .text {
                            line-height: .8rem;
                            font-size: .4rem;
                            color: hsla(0, 0%, 100%, .6);
                            white-space: pre-wrap;
                            transition: all .3s linear;

                            &.current {
                                color: #fff;
                                transform: scale(1.2);
                            }
                        }
                    }
                }
            }

            .bottom {
                width: 100%;
                padding-bottom: .5rem;

                .progress-wrapper {
                    display: flex;
                    align-items: center;
                    width: 80%;
                    margin: 0 auto;
                    padding: .5rem 0;

                    .progress-bar-wrapper {
                        flex: 1;
                    }

                    .time {
                        color: #fff;
                        font-size: .4rem;
                        width: 1.25rem;

                        &.time-l {
                            text-align: left;
                        }

                        &.time-r {
                            text-align: right;
                        }
                    }
                }

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
