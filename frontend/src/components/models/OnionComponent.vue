<script setup>
import { useLoop } from "@tresjs/core";
import { ref } from "vue";
const onion = ref();

const props = defineProps({
  scene: { type: Object, default: {} },
  position: { type: Array, default: [0, 0, 0] },
  scale: { type: Number, default: 1 },
});

const { onBeforeRender } = useLoop();
onBeforeRender(({ delta, elapsed }) => {
  if (onion.value) {
    onion.value.rotation.y += delta * 2;
  }
});
</script>

<template>
  <primitive
    v-if="scene"
    ref="onion"
    :position="position"
    :object="scene"
    :scale="scale"
    dispose="true"
  />
</template>

<style lang=""></style>
