<template>
    <div :class="prefixCls">
        <music-detail :title="title" :pic="pic" :isLoading="isLoading">
            <div>
                <song-list :songs="songs"></song-list>
            </div>
        </music-detail>
    </div>
</template>

<script>
    import MusicDetail from '@/components/music-detail'
    import SongList from '@/components/base/song-list'
    import storage from '@/utils/store.js'
    import {
        SINGER_MID
    } from '@/assets/js/constant'
    import {
        getSingerDetail,
        getSingerSongs
    } from '@/server/singer'
    export default {
        name: 'singer-detail',
        components: {
            MusicDetail,
            SongList
        },
        props: {
            singerId: Number
        },
        data() {
            return {
                prefixCls: 'singer-detail',
                singer: {},
                songs: [],
                isLoading: true
            }
        },
        computed: {
            singerMid() {
                let mid = null
                if (this.singerId) {
                    mid = this.singerId
                } else {
                    const cacheSingerMid = storage.session.get(SINGER_MID)
                    if (cacheSingerMid && cacheSingerMid === this.$route.params.id) {
                        mid = cacheSingerMid
                    }
                }
                return mid
            },
            title() {
                return (this.singer.artist || {}).name || ''
            },
            pic() {
                return (this.singer.artist || {}).cover || ''
            }
        },
        async created() {
            const res = await getSingerDetail(this.singerMid)
            const songsData = await getSingerSongs(this.singerMid)
            res && (this.singer = res.data)
            songsData && (this.songs = songsData.songs)
            this.isLoading = false
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
        background: #fff;

        .switches {
            padding-top: .16rem;
            padding-bottom: .25rem;
        }

        .song-list {
            padding: 0 .52rem;
        }

        .main-content {
            >div {
                background-color: #fff;
            }
        }

    }
</style>
