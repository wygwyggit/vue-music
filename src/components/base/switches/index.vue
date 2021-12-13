<template>
    <ul class="switches">
        <li class="switch-item" v-for="(item, index) in items" :key="item" :class="{'active':modelValue === index}"
            @click="switchItem(index)">
            <span>{{item}}</span>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'switches',
        props: {
            items: {
                type: Array,
                default () {
                    return []
                }
            },
            modelValue: {
                type: Number,
                default: 0
            }
        },
        methods: {
            switchItem(index) {
                this.$emit('update:modelValue', index)
            }
        }
    }
</script>

<style scoped lang="scss">
    .switches {
        display: flex;
        position: relative;
        align-items: center;
        padding: 0 2rem;

        .switch-item {
            position: relative;
            z-index: 10;
            flex: 1;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: .41rem;
            color: #666;

            &.active {
                &::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    width: 0.506666666666667rem;
                    height: 2px;
                    margin-left: -0.253333333333333rem;
                    background-color: $--color-primary;
                    left: 50%;
                }

            }
        }
    }
</style>
