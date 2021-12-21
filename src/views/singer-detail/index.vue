<template>
    <div :class="prefixCls">
        <music-detail :title="title" :pic="pic" :isLoading="isLoading" :noResult="noResult" @randomPlay="random">
            <song-list :songs="songs" @select="selectItem"></song-list>
        </music-detail>
    </div>
</template>

<script>
    import MusicDetail from '@/components/music-detail'
    import SongList from '@/components/base/song-list'
    import {
        getSingerDetail,
        getSingerTopSongs
    } from '@/server/singer'
    import {
        mapActions
    } from 'vuex'
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
            noResult() {
                return !this.isLoading && this.songs.length < 0
            },
            singerMid() {
                let mid = null
                if (this.singerId) {
                    mid = this.singerId
                } else {
                    mid = this.$route.params.id
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
            const songsData = await getSingerTopSongs(this.singerMid)
            res && (this.singer = res.data)
            songsData && (this.songs = songsData.songs)
            this.isLoading = false
        },
        methods: {
            selectItem({
                index
            }) {
                this.selectPlay({
                    list: this.songs,
                    index
                })
            },
            random() {
                this.randomPlay({
                    list: this.songs
                })
            },
            ...mapActions([
                'selectPlay',
                'randomPlay'
            ])
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

    }
</style>
