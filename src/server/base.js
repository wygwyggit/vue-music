import axios from 'axios'
const baseURL = 'http://localhost:3000/'
const ERR_OK = 200
axios.defaults.baseURL = baseURL
const get = function (url, params) {
    return axios.get(url, {
        params
    }).then(res => {
        const serverData = res.data
        if (serverData.code === ERR_OK) {
            return serverData.banners
        }
    }).catch(e => {
        console.log(e)
    })
}
export {
    get
}
