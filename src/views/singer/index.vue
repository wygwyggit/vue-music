<template>
    <div :class="prefixCls">
        <index-list :data="singerList"></index-list>
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
                 singerList: []
             }
         },
         async created() {
            this.singerList = await getSingerList()
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
