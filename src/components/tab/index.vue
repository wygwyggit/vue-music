<template>
    <div :class="prefixCls">
        <router-link v-for="item in tabs" :key="item.path" :to="item.path" >
            <span>
                {{item.title}}
            </span>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: 'm-header',
        components: {},
        props: {
            tabs: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                prefixCls: 'tab'
            }
        }
    }
</script>

<style lang="scss" scoped>
  $prefixCls:'tab';

    .#{$prefixCls} {
        a {
            margin-right: .4rem;
            font-size: .44rem;
            vertical-align: middle;
            transition: all .3s;
            span {
                padding-bottom: .1rem;
                border-bottom: 1px solid #000;
            }
            &.router-link-active {
                color:#000;
                transform: scale(2);
            }
        }
    }
</style>
