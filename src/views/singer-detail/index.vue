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
            title() {
                return (this.singer.artist || {}).name || ''
            },
            pic() {
                return (this.singer.artist || {}).cover || ''
            }
        },
        async created() {
            const res = await getSingerDetail(this.singerId)
            const songsData = await getSingerSongs(this.singerId)
            res && (this.singer = res.data)
            songsData && (this.songs = songsData.songs)
            this.isLoading = false
            console.log(this.singer)
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
            > div {
                background-color: #fff;
            }
        }

    }
</style>
