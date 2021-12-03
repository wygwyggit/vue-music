import { get } from './base'
const getBanner = function() {
   return get('/banner?type=2')
}
export {
    getBanner
}
