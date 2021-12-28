<template>
    <div :class="prefixCls" v-show="!fullScreen" @click="showMainPlayer">
        <div class="cd-wrapper">
            <div class="cd" ref="cdRef">
                <img :src="songInfo.al.picUrl" alt="" v-if="songInfo && songInfo.al.picUrl" ref="cdImageRef"
                    :class="cdCls">
            </div>
        </div>
            <div class="control">
                <progress-circle :radius="32" :progress="progress">
                    <i class="music-icon" :class="miniIconPlay"></i>
                </progress-circle>
            </div>
    </div>
</template>

<script>
    import progressCircle from './progress-circle.vue'
    import {
        computed
    } from '@vue/reactivity'
    import {
        useStore
    } from 'vuex'
    import useCd from './use-cd'
    export default {
        components: {
            progressCircle
        },
        props: {
            songInfo: {
                type: Object,
                default () {
                    return {}
                }
            },
            progress: {
                type: Number,
                default: 0
            }
        },
        setup() {
            const prefixCls = 'mini-play'
            const store = useStore()
            const fullScreen = computed(() => store.state.fullScreen)
            const playing = computed(() => store.state.playing)
            const miniIconPlay = computed(() => {
                return playing.value ? 'icon-mini-pause' : 'icon-mini-play'
            })
            const {
                cdCls,
                cdRef,
                cdImageRef
            } = useCd()

            function showMainPlayer() {
                store.commit('setFullScreen', true)
            }
            return {
                prefixCls,
                fullScreen,
                cdCls,
                cdRef,
                cdImageRef,
                showMainPlayer,
                miniIconPlay
            }
        }
    }
</script>

<style lang="scss" scoped>
    $prefixCls:'mini-play';

    .#{$prefixCls} {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 1.6rem;
        display: flex;
        align-items: center;
        box-shadow: 0 -4px 20px 0 rgb(0 0 0 / 15%);
        z-index: 9;
        background-color: #fff;

        .cd-wrapper {
            padding: 0 .3rem 0 .52rem;

            .cd {
                width: 1.17rem;
                height: 1.17rem;
                border-radius: 50%;
                overflow: hidden;
                background: #000;
            }

            img {
                width: 100%;
                height: 100%;

                &.playing {
                    animation: playing 25s linear infinite;
                }

                &.pause {
                    animation-play-state: paused;
                }
            }
        }
        .control {
            .progress-circle {
                i {
                    position: absolute;
                    left: 10px;
                    top: 8px;
                    font-size: .45rem;
                }
            }
        }
    }
</style>
