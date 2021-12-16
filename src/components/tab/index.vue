<template>
    <div :class="prefixCls" ref="rootTabRef">
        <router-link v-for="(item,index) in tabs" :key="index" :to="item.path" @click="goPath(index)">
            <span>
                {{item.title}}
            </span>
        </router-link>
        <span :style="{width:lineStyle.width + 'px',left:lineStyle.left + 'px'}" class="line"
            v-if="lineStyle.left"></span>
    </div>
</template>
<script>
    import {
        reactive,
        ref
    } from '@vue/reactivity'
    import {
        watchEffect,
        nextTick
    } from '@vue/runtime-core'
    import {
        useRoute
    } from 'vue-router'
    export default {
        name: 'm-header',
        components: {},
        props: {
            tabs: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        setup(props) {
            const prefixCls = 'tab'
            const rootTabRef = ref(null)
            const lineStyle = reactive({
                width: 0,
                left: 0
            })
            const route = useRoute()
            const goPath = async (idx) => {
                const domEle = rootTabRef.value
                await nextTick()
                try {
                    const currentTabEle = domEle.children[idx]
                    lineStyle.left = currentTabEle.getBoundingClientRect().left
                    lineStyle.width = currentTabEle.getBoundingClientRect().width
                } catch (err) {

                }
            }
            watchEffect(() => {
                const idx = props.tabs.findIndex(x => x.path === route.path)
                if (idx !== -1) {
                    goPath(idx)
                }
            })
            return {
                prefixCls,
                rootTabRef,
                lineStyle,
                goPath
            }
        }
    }
</script>

<style lang="scss" scoped>
    $prefixCls:'tab';

    .#{$prefixCls} {
        position: relative;

        .line {
            position: absolute;
            bottom: -.12rem;
            height: .09rem;
            background-color: $--color-primary;
            transition: left .2s ease;
        }

        a {
            margin-right: .4rem;
            vertical-align: middle;

            span {
                display: inline-block;
                padding-bottom: .06rem;
                font-size: .44rem;
                transition: all .1s;
            }

            &.router-link-active>span {
                color: #000;
                transform: scale(1.1);
            }
        }
    }
</style>
