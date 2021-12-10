<template>
    <scroll class="index-list" :probeType="3" @scroll="onScroll" v-loading="!data.length" ref="bsRef">
        <ul ref="groupRef">
            <li v-for="group in data" :key="group.title" class="group">
                <h2 class="title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.list" :key="item.id" class="item">
                        <img class="avatar" v-lazy="item.pic">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="fixed" v-show="fixedTitle" :style="fixidStyle">
            <h2 class="fixed-title">{{fixedTitle}}</h2>
        </div>
        <ul class="shortcut" @touchstart.stop.prevent="onShortCutTouchStart" @touchmove.stop.prevent="onShortCutTouchMove">
            <li v-for="(item, index) of shortCutList" :key="index" :data-index="index" class="item"
                :class="{'current':currentIndex===index}">{{item}}</li>
        </ul>
    </scroll>
</template>

<script>
    import Scroll from '@/components/base/scroll/index.vue'
    import useFixed from './useFixed'
    import useShortCur from './useShortCut'
    export default {
        components: {
            Scroll
        },
        props: {
            data: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        setup(props) {
            const {
                groupRef,
                onScroll,
                fixedTitle,
                fixidStyle,
                currentIndex
            } = useFixed(props)
            const {
                shortCutList,
                onShortCutTouchStart,
                onShortCutTouchMove,
                bsRef
            } = useShortCur(props, groupRef)
            return {
                groupRef,
                onScroll,
                fixedTitle,
                fixidStyle,
                shortCutList,
                onShortCutTouchStart,
                onShortCutTouchMove,
                currentIndex,
                bsRef
            }
        }
    }
</script>

<style lang="scss" scoped>
    .index-list {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .group {
            padding-bottom: .4rem;
            &:last-child {
                padding-bottom: 5rem;
            }
            .title {
                height: .8rem;
                line-height: .8rem;
                padding-left: .52rem;
                font-size: .4rem;
                background-color: $--background-color-base;

            }

            .item {
                display: flex;
                align-items: center;
                padding: .4rem 0 0 .52rem;

                .avatar {
                    width: 1.17rem;
                    height: 1.17rem;
                    border-radius: 50%;
                }

                .name {
                    margin-left: .4rem;
                    font-size: .373rem;
                }
            }
        }

        .shortcut {
            position: absolute;
            right: .3rem;
            top: 50%;
            transform: translateY(-50%);
            padding: .18rem 0;
            width: .7rem;
            border-radius: .2rem;
            background-color: #fff;
            color: $--color-text-secondary;
            box-shadow: 0 0 20px 0 hsl(0deg 0% 84% / 50%);

            .item {
                padding: .1rem;
                line-height: 1;
                font-size: .3rem;
                text-align: center;

                &.current {
                    color: $--color-primary;
                }
            }
        }

        .fixed {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;

            .fixed-title {
                height: .8rem;
                line-height: .8rem;
                padding-left: .52rem;
                font-size: .4rem;
                background-color: $--background-color-base;
            }
        }
    }
</style>
