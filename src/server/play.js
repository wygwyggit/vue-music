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
