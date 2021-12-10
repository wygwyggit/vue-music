<template>
    <div :class="prefixCls">123</div>
</template>

<script>
    import {
        getSingerDetail
    } from '@/server/singer'
    export default {
        name: 'singer-detail',
        props: {
            singer: Object
        },
        data() {
            return {
                prefixCls: 'singer-detail'
            }
        },
        async created() {
            const res = await getSingerDetail(this.singer.id)
            console.log(res)
        }
    }
</script>

<style lang="scss" scoped>
    $prefixCls:'singer-detail';

    .#{$prefixCls} {
        position: fixed;
        z-index: 10;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: #222;
    }
</style>
