import { get } from './base'
import pinyin from 'pinyin'
export async function getSingerList(pageSize = 1, limit = 100) {
  const result = await get(`/top/artists?offset=${(pageSize - 1) * limit}&limit=${limit}`)
  const singerList = result.artists
  const singerMap = {
      hot: {
          title: '热',
          list: map(singerList.slice(0, 10))
      }
  }
  singerList.forEach(item => {
      // 把歌手名转成拼音
      const p = pinyin(item.name)
      if (!p || !p.length) {
          return
      }
      // 获取歌手名拼音的首字母
      const key = p[0][0].slice(0, 1).toUpperCase()
      if (key) {
          if (!singerMap[key]) {
              singerMap[key] = {
                  title: key,
                  list: []
              }
          }
          singerMap[key].list.push(map([item])[0])
      }
  });
  const hot = []
  const letter = []
  for (const key in singerMap) {
      const item = singerMap[key]
      if (item.title.match(/[a-zA-Z]/)) {
          letter.push(item)
      } else if (item.title === '热') {
          hot.push(item)
      }
  }
  letter.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0)
  })
  return hot.concat(letter)
}
function map(singerList) {
    return singerList.map(item => ({
        id: item.id,
        name: item.name,
        pic: item.img1v1Url + '?param=130y130'
    }))
}
