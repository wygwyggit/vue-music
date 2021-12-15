<template>
    <div :class="prefixCls">
        <index-list :data="singerList" @select="selectSinger"></index-list>
        <router-view v-slot="{ Component }">
            <transition name="slide">
                <component :is="Component" :singerId="selectedSinger" />
            </transition>
        </router-view>
    </div>
</template>

<script>
    import IndexList from '@/components/base/index-list'
    import {
        getSingerList
    } from '@/server/singer'
    export default {
         name: 'singer',
         components: {
             IndexList
         },
         data() {
             return {
                 prefixCls: 'singer',
                 singerList: [],
                 selectedSinger: null
             }
         },
         async created() {
            this.singerList = await getSingerList()
         },
         methods: {
             selectSinger(item) {
                 this.selectedSinger = item.id
                 this.$router.push({
                     path: `/singer/${item.id}`
                 })
             }
         }
    }
</script>

<style lang="scss" scoped>
    $prefixCls:'singer';

    .#{$prefixCls} {
        position: fixed;
        width: 100%;
        top: 1.4rem;
        bottom: 0;
    }
</style>
