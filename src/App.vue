<template>
    <div id="music-app">
        <tab :tabs="tabs"></tab>
        <router-view></router-view>
    </div>
</template>
<script>
    import Tab from '@/components/tab/index.vue'
    export default {
        components: {
            Tab
        },
        data() {
            return {
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
        }
    }
</script>
<style lang="scss">
    #music-app {
        .tab {
            padding: .2rem 0 0 .52rem;
        }
    }
</style>
