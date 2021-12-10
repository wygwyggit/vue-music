<template>
  <div ref="rootRef">
      <slot></slot>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useScroll } from './useScroll'
export default {
    props: {
        click: {
            type: Boolean,
            default: true
        },
        probeType: {
            type: Number,
            default: 0
        }
    },
    emits: ['scroll'],
    setup(props, { emit }) {
        const rootRef = ref(null)
        const { bs } = useScroll(rootRef, props, emit)
        return {
            rootRef,
            bs
        }
    }
}
</script>

<style>

</style>
