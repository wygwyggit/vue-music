<template>
    <div class="no-result">
        <div class="no-result-icon"></div>
        <p class="no-result-text">{{title}}</p>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'noResult',
        data() {
            return {
                title: '暂无数据'
            }
        }
    }
</script>

<style scoped lang="scss">
    .no-result {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        text-align: center;

        .no-result-icon {
            width: 9rem;
            height: 3.5rem;
            margin: 0 auto;
            background-image: url('./empty.png');
            background-size: cover;
        }

        .no-result-text {
            margin-top: 30px;
            font-size: 12px;
            color: #828282;
        }
    }
</style>
