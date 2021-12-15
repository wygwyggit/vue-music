
import {
    createApp
} from 'vue'
export function createLikeLoadingDirective(comp) {
    const name = comp.name
    return {
        mounted(el, binding) {
            const instance = createApp(comp).mount(document.createElement('div'))
            const title = binding.arg
            if (typeof title !== 'undefined') {
                instance.setTitle(title)
            }
            if (!el[name]) {
                el[name] = {}
            }
            el[name].instance = instance
            el.instance = instance
            if (binding.value) {
                append(el)
            }
        },
        updated(el, binding) {
            const title = binding.title
            if (typeof title !== 'undefined') {
                el[name].instance.setTitle(title)
            }
            if (binding.value !== binding.oldValue) {
                binding.value ? append(el) : remove(el)
            }
        }
    }
    function append(el) {
        el.appendChild(el[name].instance.$el)
    }
    function remove(el) {
        el.removeChild(el[name].instance.$el)
    }
}
