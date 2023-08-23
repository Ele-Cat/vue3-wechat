<template>
  <div
    class="we-relative-box"
    v-show="useRelativeBoxStore.boxVisible"
    :style="{
      top: useRelativeBoxStore.boxTop + 'px',
      left: useRelativeBoxStore.boxLeft + 'px',
    }"
    @click.stop
  >
    <slot />
  </div>
</template>

<script setup>
import useStore from "@/store";
const { useRelativeBoxStore } = useStore();
</script>

<style lang="less" scoped>
.we-relative-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  padding: 24px;
  background-color: #fff;
  border: 1px solid #E5E5E5;
  box-sizing: border-box;
  box-shadow: 0 0 8px 0px rgba(0, 0, 0, 0.12);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
