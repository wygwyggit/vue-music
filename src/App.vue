<template>
    <div id="music-app">
        <tab :tabs="tabs"></tab>
        <div class="slide-wrapper">
            <slide v-if="slidePage.length" :slidePage="slidePage"></slide>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
    import Tab from '@/components/tab/index.vue'
    import Slide from '@/components/base/slide/index.vue'
    import {
        getBanner
    } from '@/server/recommend'
    export default {
        components: {
            Slide,
            Tab
        },
        data() {
            return {
                slidePage: [],
                tabs: [
                    {
                        title: '推荐',
                        path: '/recommend'
                    },
                     {
                        title: '歌手',
                        path: '/singer'
                    }, {
                        title: '排序',
                        path: '/rank'
                    }, {
                        title: '搜索',
                        path: '/search'
                    }
                ]
            }
        },
        async created() {
            const result = await getBanner()
            this.slidePage = result
            console.log(result)
        }
    }
</script>
<style lang="scss">
    #music-app {
        padding-top: .4rem;
        .tab {
            padding-left: .4rem;
        }
        .slide-wrapper {
            position: absolute;
            padding-top: .4rem;
            width: 100%;
            height: 4.173333333333333rem;
        }
    }
</style>
