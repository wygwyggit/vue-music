<template>
    <div :class="prefixCls" v-show="fullScreen">
        <div class="main-play" v-show="fullScreen">
            <div class="bg-img" :style="bgImageStyle">
            </div>
            <div class="top">
                <i class="back music-icon icon-down"></i>
                <div class="song-name">
                    {{currentSong.name}}
                </div>
                <div class="song-singer">{{ songSingers }}</div>
            </div>
        </div>
        <audio ref="audioRef"></audio>
    </div>
</template>

<script>
    import {
        computed,
        ref
    } from '@vue/reactivity'
    import {
        getSongsDetail,
        getSongsUrl
    } from '@/server/play'
    import {
        useStore
    } from 'vuex'
    import {
        watch
    } from '@vue/runtime-core'
    export default {
        name: 'play',
        setup() {
            const prefixCls = 'play'
            const audioRef = ref(null)
            const songInfo = ref(null)
            const store = useStore()
            // 初始化main-play播放器
            const fullScreen = computed(() => store.state.fullScreen)
            const currentSong = computed(() => store.getters.currentSong)
            const songSingers = computed(() => {
                const arr = (currentSong.value.ar || []).map(x => x.name)
                return arr.join('/')
            })
            const bgImageStyle = computed(() => {
                let backgroundImage = ''
                const songInfoV = songInfo.value
                console.log(songInfoV, 'hhhhh')
                if (songInfoV) {
                    backgroundImage = `url(${songInfoV.al.picUrl})`
                }
                return {
                    backgroundImage
                }
            })
            watch(currentSong, async (newSong) => {
                if (!newSong.id) {
                    return
                }
                const songId = currentSong.value.id
                const res = await getSongsDetail(songId)
                const url = await getSongsUrl(songId)
                songInfo.value = (res.songs || [])[0]
                Object.assign(songInfo.value, { songUrl: url })
                const audioEl = audioRef.value
                audioEl.src = songInfo.value.songUrl
                audioEl.play()
            })
            return {
                prefixCls,
                fullScreen,
                currentSong,
                songSingers,
                songInfo,
                bgImageStyle,
                audioRef
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
                filter: blur(30px);

                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>
