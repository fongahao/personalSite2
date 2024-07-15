function debounce(callback, wait = 500) {
    let timer
    return function () {
        let arg = arguments
        let content = this
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            callback.apply(content, arg)
        }, wait)

    }

}

function throttle() {

}
export {
    debounce
}