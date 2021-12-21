<template>
    <div :class="prefixCls"></div>
</template>

<script>
    export default {
        name: 'progress',
        data() {
            return {
                prefixCls: 'progress-bar'
            }
        }
    }
</script>

<style lang="scss" scoped>
    $prefixCls:'progress-bar';

    .#{$prefixCls} {
    }

</style>
