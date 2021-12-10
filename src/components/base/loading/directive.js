import loading from './index.vue'
import {
    createApp
} from 'vue'
const loadingDirective = {
    mounted(el, binding) {
        const instance = createApp(loading).mount(document.createElement('div'))
        const title = binding.arg
        if (typeof title !== 'undefined') {
            instance.setTitle(title)
        }
        el.instance = instance
        if (binding.value) {
            append(el)
        }
    },
    updated(el, binding) {
        const title = binding.title
        if (typeof title !== 'undefined') {
            el.instance.setTitle(title)
        }
        if (binding.value !== binding.oldValue) {
            binding.value ? append(el) : remove(el)
        }
    }
}

function append(el) {
    el.appendChild(el.instance.$el)
}

function remove(el) {
    el.removeChild(el.instance.$el)
}
export default loadingDirective
