<script setup>
import { ref, watch } from "vue";
import { useLoop } from "@tresjs/core";
import { useTexture, useGLTF } from "@tresjs/cientos";
const { state } = useGLTF("/models/onion/yellow_onion_4k.gltf");
const { onBeforeRender } = useLoop();
const onion = ref();

onBeforeRender(({ delta, elapsed }) => {
  if (onion.value) {
    onion.value.rotation.y += delta * 2;
  }
});

const { state: texture } = useTexture(
  "/models/onion/textures/yellow_onion_diff_4k.jpg",
);

const clones = ref([]);

// const positions = [
//   [0, 3.1, 0],
//   [0.5, 3.1, 0.2],
//   [-0.3, 3.1, -0.1],
// ];

watch(state, (newVal) => {
  if (newVal?.scene) {
    // console.log("====================================");
    // console.log(`STATE`, newVal?.scene);
    // console.log("====================================");
    // clones.value = positions.map(() => newVal.scene.clone());
  }
});
</script>

<template lang="">
  <primitive
    v-if="state"
    ref="onion"
    :position="[0, 3.055, 0]"
    :object="state.scene"
    :scale="3"
  />
</template>

<style lang=""></style>
