<template>
    <div :class="prefixCls">
        <div class="header">
            <i class="music-icon icon-back" @click="goBack"></i>
            <span :style="titleStyle">{{title}}</span>
        </div>
        <div class="bg-image" :style="bgImageStyle" ref="bgImage">
            <div class="filter" :style="filterStyle"></div>
        </div>
        <scroll class="main-content" :style="scrollStyle" :probeType="3" @scroll="onScroll" v-loading="isLoading"
            v-no-result="noResult">
            <div>
                <div class="play-btn-wrapper" v-if="!noResult">
                    <div class="play-btn" @click="random">
                        <i class="music-icon icon-play"></i>
                        <span class="text">随机播放全部</span>
                    </div>
                </div>
                <slot></slot>
            </div>
        </scroll>
    </div>
</template>

<script>
    import Scroll from '@/components/base/scroll/index.vue'
    const RESERVED_HEIGHT = 40
    export default {
        components: {
            Scroll
        },
        props: {
            title: String,
            pic: String,
            noResult: Boolean,
            isLoading: Boolean
        },
        data() {
            return {
                prefixCls: 'music-detail',
                imageHeight: 0,
                maxTranslateY: 0,
                scrollY: 0
            }
        },
        emits: ['randomPlay'],
        computed: {
            infoStyle() {
                const scrollY = this.scrollY
                let height = 'auto'
                if (scrollY < 0) {
                    height = (this.$refs.infoRef.clientHeight + (-scrollY)) + 'px'
                }
                return {
                    height
                }
            },
            titleStyle() {
                let opacity = '0'
                if (this.scrollY > this.maxTranslateY) {
                    opacity = '1'
                }
                return {
                    opacity
                }
            },
            bgImageStyle() {
                const scrollY = this.scrollY
                let zIndex = 0
                let height = 0
                let paddingTop = '70%'
                let translateZ = 0
                let scale = 1
                if (scrollY > this.maxTranslateY) {
                    zIndex = 10
                    height = 40 + 'px'
                    paddingTop = 0
                    translateZ = 1
                }
                if (scrollY < 0) {
                    scale = 1 + Math.abs(scrollY / this.imageHeight)
                }
                return {
                    zIndex,
                    paddingTop,
                    height,
                    backgroundImage: `url(${this.pic})`,
                    transform: `scale(${scale})translateZ(${translateZ}px)`
                }
            },
            filterStyle() {
                const scrollY = this.scrollY
                const imageHeight = this.imageHeight
                let blur = 0
                if (scrollY > 0) {
                    blur = Math.min(this.maxTranslateY / imageHeight, scrollY / imageHeight) * 10
                }
                return {
                    backdropFilter: `blur(${blur}px)`
                }
            },
            scrollStyle() {
                return {
                    top: `${this.imageHeight}px`
                }
            }
        },
        mounted() {
            this.imageHeight = this.$refs.bgImage.clientHeight
            this.maxTranslateY = this.imageHeight - RESERVED_HEIGHT
        },
        methods: {
            onScroll(page) {
                this.scrollY = -page.y
            },
            goBack() {
                this.$router.back()
            },
            random() {
                this.$emit('randomPlay')
            }
        }
    }
</script>

<style lang="scss" scoped>
    $prefixCls:'music-detail';

    .#{$prefixCls} {
        position: relative;
        height: 100%;

        .header {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 40px;
            line-height: 40px;
            display: flex;
            align-items: center;
            z-index: 20;
            font-size: .48rem;

            i {
                display: inline-block;
                padding: 0 .1rem 0 .4rem;
                color: #fff;
                font-size: .52rem;
            }

            span {
                line-height: .8rem;
                color: #fff;
                transition: all .3s;
                opacity: 0;
            }
        }

        .bg-image {
            position: relative;
            width: 100%;
            transform-origin: top;
            background-size: cover;
            background-position: center center;
            z-index: 0;

            .filter {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
                width: 100%;
                height: 100%;
                background-image: url('./user_top_mask.png');
                background-size: cover;
                background-position: center center;
            }
        }

        .main-content {
            position: absolute;
            bottom: 0;
            width: 100%;
            z-index: 0;

            >div {
                background-color: #fff;
            }

            .play-btn-wrapper {
                padding: .16rem 0 0 .48rem;
                width: 100%;

                .play-btn {
                    box-sizing: border-box;
                    width: 4rem;
                    padding: .16rem 0;
                    color: $--color-primary;
                    border-radius: 100px;
                    font-size: 0;
                }

                .icon-play {
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 6px;
                    font-size: .55rem;
                }

                .text {
                    display: inline-block;
                    vertical-align: middle;
                    font-size: .4rem;
                    color: $--color-dark-main;
                }
            }
        }
    }
</style>
