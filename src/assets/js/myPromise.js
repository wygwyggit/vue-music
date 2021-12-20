// 2.1  A promise must be in one of three states: pending, fulfilled, or rejected.
const PENDING = 'pending'
const FULFIllED = 'fulfilled'
const REJECTED = 'rejected'
class MyPromise {
    constructor(executor) {
        this.state = PENDING
        this.value = undefined
        this.reason = undefined
        /**
         * then may be called multiple times on the same promise.
           If/when promise is fulfilled, all respective onFulfilled callbacks must execute in the order of their originating calls to then.
           If/when promise is rejected, all respective onRejected callbacks must execute in the order of their originating calls to then.
         */
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []
        const resolve = value => {
            if (value instanceof MyPromise) {
                value.then(resolve, reject)
                return
            }
            if (this.state === PENDING) {
                this.value = value
                this.state = FULFIllED
                this.onFulfilledCallbacks.forEach(fn => fn())
            }
        }
        const reject = reason => {
            if (this.state === PENDING) {
                this.reason = reason
                this.state = REJECTED
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }

    // 2.2 A promise must provide a then method to access its current or eventual value or reason.
    // 2.2.1 Both onFulfilled and onRejected are optional arguments
    then(onFulfilled, onRejected) {
        /**
         * 2.2.7.3 If onFulfilled is not a function and promise1 is fulfilled, promise2 must be fulfilled with the same value as promise1.
           2.2.7.4 If onRejected is not a function and promise1 is rejected, promise2 must be rejected with the same reason as promise1.
         */
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
            throw reason
        }
        const promise2 = new MyPromise((resolve, reject) => {
            // 2.2.2.1  it must be called after promise is fulfilled, with promise’s value as its first argument.
            if (this.state === FULFIllED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                }, 0)
            }
            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                }, 0)
            }
            if (this.state === PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    }, 0);
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (err) {
                            reject(err)
                        }
                    }, 0);
                })
            }
        })
        return promise2
    }

    catch (errorCallback) {
        return this.then(null, errorCallback)
    }

    static resolve(value) {
        return new MyPromise((resolve, reject) => {
            resolve(value)
        })
    }

    static reject(reason) {
        return new MyPromise((resole, reject) => {
            reject(reason)
        })
    }

    static all(promiseArr) {
        const resArr = []
        let idx = 0
        return new Promise((resolve, reject) => {
            promiseArr.forEach((promise, index) => {
                if (isPromise(promise)) {
                    promise.then(value => {
                        formatResArr(value, index, resolve)
                    }, reject)
                } else {
                    formatResArr(promiseArr, index, resolve)
                }
            })
        })

        function formatResArr(value, index, resolve) {
            resArr[index] = value
            if (++idx === promiseArr.length) {
                resolve(resArr)
            }
        }

        function isPromise(value) {
            if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
                return typeof value.then === 'function'
            }
            return false
        }
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    /**
     * 2.3.1  If promise and x refer to the same object, reject promise with a TypeError as the reason.
     */
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise'))
    }
    if ((x !== null && typeof x === 'object') || typeof x === 'function') {
        try {
            const then = x.then
            let called = false
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (err) {
            reject(err)
        }
    } else {
        resolve(x)
    }
}
export default MyPromise
