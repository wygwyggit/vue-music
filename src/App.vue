<template>
    <div id="music-app">
        <router-view></router-view>
    </div>
</template>
<script>
    import MyPromise from '@/assets/js/myPromise.js'
    export default {
        setup() {
            const promise = new MyPromise(function(resolve, reject) {
               resolve(new MyPromise((resolve, reject) => {
                  resolve('123')
               }))
            })
            console.log(promise.state)
            promise.then(value => {
                console.log(value, '111')
            })

            MyPromise.all([MyPromise.resolve('1'), MyPromise.resolve('2')]).then(value => {
                console.log(value, 'all')
            })
        }
    }
</script>
<style lang="scss">
</style>
