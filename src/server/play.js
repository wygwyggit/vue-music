import { get } from './base'
export function getSongsDetail(id) {
    return get(`song/detail?ids=${id}`)
}
export async function getSongsUrl(id) {
    const res = await get(`song/url?id=${id}`)
    console.log(res, '222')
    return (res.data || [])[0].url
}
