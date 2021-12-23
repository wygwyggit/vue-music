<template>
    <div :class="prefixCls">
        <div class="bar-inner">
            <div class="progress" :style="progressStyle" ref="progress"></div>
            <div class="progress-btn-wrapper" :style="btnStyle"
            @touchstart.prevent="onTouchStart"
            @touchmove.prevent="onTouchMove"
            @touchend.prevent="onTouchEnd"
             >
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'progress',
        props: {
            progress: {
                type: Number,
                default: 0
            }
        },
        emits: ['progress-changing', 'progress-changed'],
        data() {
            return {
                prefixCls: 'progress-bar',
                offset: 0,
                touch: {}
            }
        },
        computed: {
            progressStyle() {
                return `width:${this.offset}px`
            },
            btnStyle() {
                return `transform: translate3d(${this.offset}px, 0, 0)`
            }
        },
        methods: {
            onTouchStart(e) {
                this.touch.x1 = e.touches[0].pageX
                this.touch.beginWidth = this.$refs.progress.clientWidth
            },
            onTouchMove(e) {
                const delta = e.touches[0].pageX - this.touch.x1
                const curWidth = this.touch.beginWidth + delta
                const borWidth = this.$el.clientWidth - 15
                const progress = Math.max(0, Math.min(curWidth / borWidth, 1))
                this.offset = borWidth * progress
                this.$emit('progress-changing', progress)
            },
            onTouchEnd() {
                 const borWidth = this.$el.clientWidth - 15
                 const progress = this.$refs.progress.clientWidth / borWidth
                 this.$emit('progress-changed', progress)
            }
        },
        watch: {
            progress(newVal) {
                const borWidth = this.$el.clientWidth - 15
                this.offset = borWidth * newVal
            }
        }
    }
</script>

<style lang="scss" scoped>
    $prefixCls:'progress-bar';

    .#{$prefixCls} {
        height: .4rem;

        .bar-inner {
            position: relative;
            top: .19rem;
            height: .05rem;
            background: rgba(255, 255, 255, 0.3);

            .progress {
                position: absolute;
                height: 100%;
                background: #fff;
            }

            .progress-btn-wrapper {
                position: absolute;
                top: -13px;
                width: 30px;
                height: 30px;

                .progress-btn {
                    position: relative;
                    top: 6px;
                    box-sizing: border-box;
                    width: 15px;
                    height: 15px;
                    border: 3px solid #fff;
                    border-radius: 50%;
                    background: #fff;
                }
            }
        }

    }
</style>
