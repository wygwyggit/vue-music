<template>
    <div id="music-app">
        <router-view></router-view>
    </div>
</template>
<script>
    import MyPromise from '@/assets/js/myPromise.js'
    export default {
        setup() {
            const p1 = new MyPromise((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error('error'))
                }, 1000);
            })
            const p2 = new MyPromise((resolve, reject) => {
                setTimeout(() => {
                    resolve('success')
                }, 2000);
            })
            MyPromise.race([p1, p2]).then(value => {
                console.log(value)
            }, reason => {
                console.log(reason)
            })
        }
    }
</script>
<style lang="scss">
</style>
