import store from '@/utils/store'
function insertArr(arr, item, compare, maxLen) {
    const idx = arr.findIndex(compare)
    if (idx === -1) {
        arr.unshift(item)
    }
    if (maxLen && arr.length > maxLen) {
        arr.pop()
    }
}
function deleteFromArr(arr, compare) {
    const idx = arr.findIndex(compare)
    if (idx > -1) {
        arr.splice(idx, 1)
    }
}
export function save(item, key, compare, maxLen) {
    const items = store.get(key, [])
    insertArr(items, item, compare, maxLen)
    store.set(key, items)
    return items
}
export function remove(key, compare) {
    const items = store.get(key, [])
    deleteFromArr(items, compare)
    store.set(key, items)
    return items
}
export function load(key) {
    return store.get(key, [])
}
