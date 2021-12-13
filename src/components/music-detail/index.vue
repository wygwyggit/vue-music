<template>
    <div :class="prefixCls" v-loading="isLoading">
        <div class="header">
            <i class="'music-icon icon-back" @click="goBack"></i>
            <span>{{title}}</span>
        </div>
        <div class="bg-image" :style="bgImageStyle" ref="bgImage">
            <div class="filter" :style="filterStyle"></div>
        </div>
        <scroll class="main-content" :style="scrollStyle" :probeType="3" @scroll="onScroll">
            <slot></slot>
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
            isLoading: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                prefixCls: 'music-detail',
                imageHeight: 0,
                maxTranslateY: 0,
                scrollY: 0
            }
        },
        computed: {
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
            display: flex;
            align-items: center;
            z-index: 20;

            i {
                display: inline-block;
                padding: .16rem .16rem .16rem .4rem;
                color: #fff;
                font-size: .6rem;
            }

            span {
                margin-left: 2.9rem;
                font-size: .48rem;
                line-height: .8rem;
                color: #fff;
            }
        }

        .bg-image {
            position: relative;
            width: 100%;
            transform-origin: top;
            background-size: cover;
            z-index: 0;

            .filter {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(7, 17, 27, 0.4);
            }
        }

        .main-content {
            position: absolute;
            bottom: 0;
            width: 100%;
            z-index: 0;
        }
    }
</style>
