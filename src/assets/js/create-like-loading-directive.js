
import {
    createApp
} from 'vue'
export function createLikeLoadingDirective(comp) {
    return {
        mounted(el, binding) {
            const instance = createApp(comp).mount(document.createElement('div'))
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
            console.log(binding.value, binding.oldValue)
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
        console.log(el)
        el.appendChild(el.instance.$el)
    }
    function remove(el) {
        el.removeChild(el.instance.$el)
    }
}
