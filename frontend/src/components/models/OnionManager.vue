<script setup>
import OnionComponent from "./OnionComponent.vue";
import { shallowRef, ref, watch, markRaw } from "vue";
import { useGLTF } from "@tresjs/cientos";
const { state } = useGLTF("/models/onion/yellow_onion_4k.gltf");
const onions = shallowRef([]);

const props = defineProps({
  count: { type: Number, default: 0 },
  position: { type: Array, default: [0, 3.055, 0] },
});

watch(
  () => props.count,
  (val) => {
    onions.value = [];
    for (let i = 1; i <= val; i++) {
      const scene = state.value.scene.clone();
      const item = {
        scene: markRaw(scene),
        position: props.position.map((elem, index) =>
          index == 0 ? i * 0.2 : elem,
        ),
        scale: 3,
      };
      onions.value.push(item);
    }
  },
);
</script>

<template>
  <OnionComponent
    v-for="(item, index) in onions"
    :key="index"
    :scene="item.scene"
    :position="item.position"
    :scale="item.scale"
  />
</template>

<style></style>
