<template>
    <div :class="prefixCls" ref="slideWrapper">
        <div class="banner-wrapper">
            <div class="slide-page" v-for="(item,index) of slidePage" :key="index">
                <a :href="item.href">
                    <img :src="item.pic">
                </a>
            </div>
        </div>
        <div class="dots-wrapper">
            <span class="dot" v-for="(item,index) of slidePage" :key="index"
                :class="{'active': currentPageIndex === index}"></span>
        </div>
    </div>
</template>

<script>
    import {
        ref
    } from '@vue/reactivity'
    import {
        useSlide
    } from './useSlide'
    export default {
        name: 'slider',
        props: {
            slidePage: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        setup() {
            const prefixCls = 'slide-content'
            const slideWrapper = ref(null)
            const {
                currentPageIndex
            } = useSlide(slideWrapper)
            const nextPage = () => {

            }
            const prePage = () => {

            }
            return {
                prefixCls,
                slideWrapper,
                currentPageIndex,
                nextPage,
                prePage
            }
        }
    }
</script>

<style lang="scss" scoped>
    $prefixCls:'slide-content';

    .#{$prefixCls} {
        position: relative;
        min-height: 1px;
        font-size: 0;
        touch-action: pan-y;

        .banner-wrapper {
            white-space: nowrap;
            font-size: 0;
            overflow: hidden;

            .slide-page {
                display: inline-block;
                transform: translate3d(0, 0, 0);
                backface-visibility: hidden;

                a {
                    display: block;
                    width: 100%;
                }

                img {
                    display: block;
                    width: 100%;
                }
            }
        }

        .dots-wrapper {
            position: absolute;
            left: 50%;
            bottom: .2rem;
            transform: translateX(-50%);
            white-space: nowrap;

            .dot {
                display: inline-block;
                margin: 0 4px;
                width: .4rem;
                height:.05rem;
                background: $--color-white-l;
                &.active {
                    background-color: #fff;
                }
            }
        }
    }
</style>
