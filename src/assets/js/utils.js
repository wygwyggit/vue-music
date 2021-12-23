/**
 * 洗牌算法随机数组
 * @param {*} array 随机原数组
 * @param {*} size  随机数组长度
 * @returns
 */
function shuffleSelf(array, size) {
    var newArray = array.slice()
    var index = -1
    var length = newArray.length
    var lastIndex = length - 1
    size = size === undefined ? length : size;
    while (++index < size) {
        var rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
        var value = newArray[rand];
        newArray[rand] = newArray[index];
        newArray[index] = value;
    }
    newArray.length = size;
    return newArray;
}

function formatTime(interval) {
    interval = interval | 0
    const minute = ((interval / 60 | 0) + '').padStart(2, '0')
    const second = (interval % 60 + '').padStart(2, '0')
    return `${minute}:${second}`
}
export {
    shuffleSelf,
    formatTime
}
