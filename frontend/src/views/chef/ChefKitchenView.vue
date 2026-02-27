<script setup>
import { TresCanvas } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
import * as Tres from "@tresjs/core";
console.log(Object.keys(Tres));
import OnionManager from "@/components/models/OnionManager.vue";

</script>

<template>
  <div class="container">
    <TresCanvas clear-color="#82DBC5">
      <!-- Камера -->
      <TresPerspectiveCamera :position="[6, 6, 5]" :look-at="[1, 2, 0]" />
      <OrbitControls />
      <!-- <FlyControls /> -->

      <!-- Освещение -->
      <TresAmbientLight :intensity="0.5" />
      <TresDirectionalLight :position="[2, 5, 3]" :intensity="1" cast-shadow />

      <TresGroup :position="[0, 0, 0]">
        <!-- Верхняя доска -->
        <!-- position: X , Y , Z -->
        <TresMesh ref="desk" :position="[0, 3, 0]" cast-shadow receive-shadow>
          <!-- args: длина, высота, ширина  -->
          <TresBoxGeometry :args="[2, 0.1, 0.8]" />
          <TresMeshStandardMaterial />
        </TresMesh>

        <!-- Задняя стенка -->
        <TresMesh :position="[0, 2.75, -0.35]" cast-shadow receive-shadow>
          <TresBoxGeometry :args="[2, 0.5, 0.1]" />
          <TresMeshStandardMaterial />
        </TresMesh>

        <OnionManager />

      </TresGroup>

      <!-- Пол -->
      <TresMesh :position="[0, 0, 2]" receive-shadow>
        <TresBoxGeometry :args="[5, 0.1, 5]" />
        <TresMeshStandardMaterial color="#cccccc" />
      </TresMesh>
    </TresCanvas>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}
</style>
