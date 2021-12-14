/**
 * 本地存储实现,封装localStorage和sessionStorage
 */
const store = {
    storage: window.localStorage,
    session: {
        storage: window.sessionStorage
    }
}
const api = {
    set(key, val) {
        if (val === undefined) {
            return this.remove(key)
        }
        this.storage.setItem(key, serialize(val))
        return val
    },
    get(key) {
        return deserialize(this.storage.getItem(key))
    },
    has(key) {
        return this.get(key) !== undefined
    },
    remove(key) {
        this.storage.removeItem(key)
    },
    clear() {
        this.storage.clear()
    },
    getAll() {
        const res = {}
        this.forEach(function(key, value) {
            res[key] = value
        })
        return res
    },
    forEach(callback) {
        for (let i = 0; i < this.storage.length; i++) {
            const key = this.storage.key(i)
            callback(key, this.get(key))
        }
    }
}

Object.assign(store, api)
Object.assign(store.session, api)

function serialize(val) {
    return JSON.stringify(val)
}
function deserialize(val) {
    if (typeof val !== 'string') {
        return undefined
    }
    try {
        return JSON.parse(val)
    } catch {
        return val || undefined
    }
}

export default store
