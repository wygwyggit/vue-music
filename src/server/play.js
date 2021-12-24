import { get } from './base'
export async function getSongInfo(id) {
    const songDetail = await getSongDetail(id)
    const songUrl = await getSongUrl(id)
    return {
        ...(songDetail.songs || [])[0],
        songUrl
    }
}
function getSongDetail(id) {
   return get(`song/detail?ids=${id}`)
}
async function getSongUrl(id) {
    const res = await get(`song/url?id=${id}`)
    return (res.data || [])[0].url
}

const songLyricMap = {}
export async function getLyric(song) {
    if (song.lyric) {
        return Promise.resolve(song.lyric)
    }
    const id = song.id
    const lyric = songLyricMap[id]
    if (lyric) {
        return lyric
    }
    const res = await get(`/lyric?id=${song.id}`)
    const mlyric = (res.lrc || {}).lyric || '[00:00.000]该歌曲暂时没有歌词'
    songLyricMap[id] = mlyric
    return mlyric
}
