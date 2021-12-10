import { get } from './base'
const getBanner = function() {
   return get('/banner?type=2')
}
const getAlbums = function() {
    return get('/personalized')
}
export {
    getBanner,
    getAlbums
}
