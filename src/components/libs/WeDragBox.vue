<template>
  <span
    ref="draggable"
    @mousedown="startDragging"
    @mousemove="dragging"
    @mouseup="stopDragging"
    class="drag-container"
  >
    <slot></slot>
  </span>
</template>

<script setup>
import { ref } from "vue";
import useStore from "@/store";
const { useSystemStore } = useStore();
import useDetectOutsideClick from "@/hooks/useDetectOutsideClick";

const draggable = ref(null);
const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);

useDetectOutsideClick(draggable, () => {
  isDragging.value = false;
});

const startDragging = (event) => {
  isDragging.value = true;
  startX.value = event.clientX;
  startY.value = event.clientY;
};

const dragging = (event) => {
  if (!isDragging.value) return;

  const noDrag = !!event.target.closest('.no-drag');
  if (noDrag) {
    isDragging.value = false;
    return;
  }

  const offsetX = event.clientX - startX.value;
  const offsetY = event.clientY - startY.value;
  useSystemStore.windows.left += offsetX;
  useSystemStore.windows.top += offsetY;

  // 在此处可以执行你想要的操作，比如更新拖动后的位置坐标
  startX.value = event.clientX;
  startY.value = event.clientY;
};

const stopDragging = () => {
  isDragging.value = false;
};
</script>

<style lang="less" scoped>
.drag-container {
  // flex: 1;
  height: 100%;
}
</style>