<template>
    <div :class="prefixCls" v-loading="isLoading">
        <scroll class="scroll-content">
            <div>
                <div class="slide-wrapper">
                    <slide v-if="slidePage.length" :slidePage="slidePage"></slide>
                </div>
                <div class="recommend-list">
                    <div class="tit">推荐歌单</div>
                    <ul>
                        <li v-for="item in albums" class="item" :key="item.id">
                            <div class="icon">
                                <img v-lazy="item.picUrl">
                            </div>
                            <div class="text">
                                <h2 class="name">
                                    {{ item.name }}
                                </h2>
                                <p class="title">
                                    播放量:{{item.playCount}}
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroll>

    </div>
</template>

<script>
    import Slide from '@/components/base/slide/index.vue'
    import Scroll from '@/components/base/scroll/index.vue'
    import {
        getBanner,
        getAlbums
    } from '@/server/recommend'
    export default {
        components: {
            Slide,
            Scroll
        },
        data() {
            return {
                prefixCls: 'recommend',
                slidePage: [],
                albums: [],
                isLoading: true
            }
        },

        async created() {
            Promise.all([this.getBanner(), this.getAlbums()]).then(() => {
                this.isLoading = false
            })
        },
        methods: {
            getBanner() {
                return new Promise((resolve, reject) => {
                    getBanner().then(json => {
                        this.slidePage = json.banners
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })
            },
            getAlbums() {
                 return new Promise((resolve, reject) => {
                    getAlbums().then(json => {
                        this.albums = json.result
                        resolve()
                    }).catch(err => {
                        reject(err)
                    })
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    $prefixCls:'recommend';

    .#{$prefixCls} {
        position: fixed;
        width: 100%;
        top: 1.4rem;
        bottom: 0;

        .scroll-content {
            height: 100%;
            overflow: hidden;

            .slide-wrapper {
                width: 100%;
                min-height: 4.17rem;
                overflow: hidden;
            }

            .recommend-list {
                padding: .3rem .52rem .52rem .52rem;

                .tit {
                    height: .8rem;
                    font-size: .4rem;
                }

                .item {
                    display: flex;
                    box-sizing: border-box;
                    align-items: center;
                    padding-bottom: .52rem;

                    .icon {
                        width: 1.5rem;
                        height: 1.5rem;
                        padding-right: .4rem;
                        border-radius: .16rem;
                        overflow: hidden;

                        img {
                            width: 1.5rem;
                            height: 1.5rem;
                        }
                    }

                    .text {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        margin-left: .44rem;
                        flex: 1;
                        line-height: .52rem;
                        overflow: hidden;
                        font-size: .3rem;
                        color: $--color-text-primary;
                    }

                    .name {
                        margin-bottom: 10px;
                    }

                    .title {}
                }
            }
        }
    }
</style>
