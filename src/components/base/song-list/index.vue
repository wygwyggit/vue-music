<template>
    <ul :class="prefixCls">
        <li class="item" v-for="(song, index) in songs" :key="song.id" @click="selectItem(song, index)">
            <div class="rank" v-if="rank">
                <span :class="getRankCls(index)">{{ getRankText(index) }}</span>
            </div>
            <div class="content">
                <p class="name">{{song.name}}</p>
                <p class="desc">{{getDesc(song)}}</p>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        name: 'song-list',
        props: {
            songs: {
                type: Array,
                default () {
                    return []
                }
            },
            rank: Boolean
        },
        emits: ['select'],
        data() {
            return {
                prefixCls: 'song-list'
            }
        },
        methods: {
            getDesc(song) {
                const singerStr = song.ar.map(x => x.name).join('/')
                const album = (song.al || {}).name || ''
                return `${singerStr}-${album}`
            },
            selectItem(song, index) {
                this.$emit('select', {
                    song,
                    index
                })
            },
            getRankCls(index) {
                if (index <= 2) {
                    return `icon icon${index}`
                } else {
                    return 'text'
                }
            },
            getRankText(index) {
                if (index > 2) {
                    return index + 1
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    $prefixCls:'song-list';

    .#{$prefixCls} {
        .item {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            height: 64px;
            .content {
                flex: 1;
                line-height: 20px;
                overflow: hidden;

                .name {
                    @include no-wrap();
                    color: $--color-dark-main;
                    font-size: .4rem;
                }

                .desc {
                    @include no-wrap();
                    margin-top: 4px;
                    color: $--color-text-desc;
                    font-size: .3rem;
                }
            }
        }
    }
</style>
