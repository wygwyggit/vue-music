<template>
    <div class="loading">
        <div class="loading-content">
            <img src="./loading.gif" alt="">
            <p class="desc">{{title}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'loading',
        data() {
            return {
                title: ''
            }
        },
        methods: {
            setTitle(title) {
                this.title = title
            }
        }
    }
</script>

<style scoped lang="scss">
    .loading {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;
        .loading-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);

            img {
                width: 1.2rem;
            }

            .desc {
                line-height: 40px;
                font-size: 13px;
                color: #7d7e80;
            }
        }
    }
</style>
