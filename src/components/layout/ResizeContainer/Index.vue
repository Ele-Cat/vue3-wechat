<template>
  <div class="resize-border" :class="[border]" v-for="border in borderLists" :key="border"
    @mousedown="e => startResize(border, e)"></div>
</template>

<script setup>
import { reactive, watch } from "vue";
import useStore from "@/store";
const { useSystemStore } = useStore();

const diff = "6px";
const backgroundColor = "rgba(0, 0, 0, 0)";
let resizing = false;
let resizeType = "";
let startX = 0;
let startY = 0;
const minWidth = useSystemStore.windows.minWidth;
const minHeight = useSystemStore.windows.minHeight;
let width = 0;
let height = 0;
let top = 0;
let left = 0;
const borderLists = reactive([
  "top",
  "bottom",
  "left",
  "right",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
])

watch(() => useSystemStore.windows, (newVal) => {
  // 拿到实时的窗口信息
  width = newVal.width;
  height = newVal.height;
  top = newVal.top;
  left = newVal.left;
}, {
  immediate: true,
  deep: true,
})

const startResize = (type, event) => {
  // 开启拖拽
  resizing = true;
  resizeType = type;
  startX = event.clientX;
  startY = event.clientY;

  // 监听鼠标移动和释放事件
  document.addEventListener('mousemove', handleResize);
  document.addEventListener('mouseup', stopResize);
}

const handleResize = (event) => {
  if (resizing) {
    const offsetX = event.clientX - startX;
    const offsetY = event.clientY - startY;

    // 根据调整类型修改窗口的大小
    switch (resizeType) {
      case "top":
        height -= offsetY;
        height = height >= minHeight ? height : minHeight
        top += height > minHeight ? offsetY : 0;
        // event.target.style.cursor = "ns-resize";
        break;
      case "bottom":
        height += offsetY;
        // event.target.style.cursor = "ns-resize";
        break;
      case "left":
        width -= offsetX;
        width = width >= minWidth ? width : minWidth
        left += width > minWidth ? offsetX : 0;
        // event.target.style.cursor = "ew-resize";
        break;
      case "right":
        width += offsetX;
        // event.target.style.cursor = "ew-resize";
        break;
      case "top-left":
        height -= offsetY;
        height = height >= minHeight ? height : minHeight
        top += height > minHeight ? offsetY : 0;
        width -= offsetX;
        width = width >= minWidth ? width : minWidth
        left += width > minWidth ? offsetX : 0;
        // event.target.style.cursor = "nwse-resize";
        break;
      case "top-right":
        height -= offsetY;
        height = height >= minHeight ? height : minHeight
        top += offsetY;
        width += offsetX;
        // event.target.style.cursor = "nesw-resize";
        break;
      case "bottom-left":
        height += height >= minHeight ? offsetY : 0;
        width -= offsetX;
        width = width >= minWidth ? width : minWidth
        left += width > minWidth ? offsetX : 0;
        // event.target.style.cursor = "nesw-resize";
        break;
      case "bottom-right":
        height += offsetY;
        width += offsetX;
        // event.target.style.cursor = "nwse-resize";
        break;
    }

    // 限制窗口的最小宽度和最小高度
    width = Math.max(width, minWidth);
    height = Math.max(height, minHeight);
    useSystemStore.windows.top = top
    useSystemStore.windows.left = left
    useSystemStore.windows.width = width
    useSystemStore.windows.height = height

    startX = event.clientX;
    startY = event.clientY;
  } else {
    // event.target.style.cursor = "auto";
  }
}

const stopResize = (event) => {
  resizing = false;
  resizeType = "";
  // event.target.style.cursor = "auto";

  // 移除鼠标移动和释放事件的监听
  document.removeEventListener('mousemove', handleResize);
  document.removeEventListener('mouseup', stopResize);
}
</script>

<style lang="less" scoped>
.resize-border {
  position: absolute;
  background-color: v-bind(backgroundColor);

  &.top,
  &.bottom {
    left: 0;
    right: 0;
    height: v-bind(diff);
    cursor: ns-resize;
  }

  &.top {
    top: 0;
  }

  &.bottom {
    bottom: 0;
  }

  &.left,
  &.right {
    top: 0;
    bottom: 0;
    width: v-bind(diff);
    cursor: ew-resize;
  }

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }

  &.top-left,
  &.bottom-right {
    width: v-bind(diff);
    height: v-bind(diff);
    cursor: nwse-resize;
  }

  &.top-left {
    top: 0;
    left: 0;
  }

  &.bottom-right {
    bottom: 0;
    right: 0;
  }

  &.top-right,
  &.bottom-left {
    width: v-bind(diff);
    height: v-bind(diff);
    cursor: nesw-resize;
  }

  &.top-right {
    top: 0;
    right: 0;
  }

  &.bottom-left {
    bottom: 0;
    left: 0;
  }
}
</style>