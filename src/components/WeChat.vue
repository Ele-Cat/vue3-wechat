<template>
  <div class="wechat" :style="wechatStyle" ref="wechatRef" @mousedown="startResize" @mouseup="stopResize" :handle="handle">
    <ToolBar ref="handle" />
    <ListWrapper />
    <BoxWrapper />
    <ContextMenu />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useDraggable } from "@vueuse/core";
import useDetectOutsideClick from "@/hooks/useDetectOutsideClick";
import { listenGlobalKeyDown } from '@/utils/shortcutKey'
import useStore from "@/store";
const { useSystemStore } = useStore();
import ToolBar from './ToolBar/Index.vue'
import ListWrapper from './ListWrapper/Index.vue'
import BoxWrapper from './BoxWrapper/Index.vue'
import ContextMenu from './ContextMenu/Index.vue'

const handle = ref();
const wechatRef = ref();
const { innerWidth, innerHeight } = window;
const wechatStyle = ref(useSystemStore.wechatStyle);
const { x, y, style } = useDraggable(wechatRef, {
  // handle,
  initialValue: {
    x: useSystemStore.windows.left || (innerWidth - useSystemStore.windows.width) / 2,
    y: useSystemStore.windows.top || (innerHeight - useSystemStore.windows.height) / 2,
  },
});

watch(() => [x, y, style], () => {
  wechatStyle.value = Object.assign({}, wechatStyle.value, {
    left: `${x.value}px`,
    top: `${y.value}px`,
  })
  useSystemStore.windows.left = x.value
  useSystemStore.windows.top = y.value
}, {
  immediate: true,
  deep: true,
})

useDetectOutsideClick(wechatRef, () => {
  // 鼠标移动到外边松开，结束缩放
  isResizing = false;
});

// 是否缩放主窗口
let isResizing = false;
let isLeft = false;
let isRight = false;
let isTop = false;
let isBottom = false;
// 鼠标在主窗口按下
const startResize = (e) => {
  if (isLeft || isRight || isTop || isBottom) {
    isResizing = true;
    e.preventDefault();
  } else {
    isResizing = false;
  }
}
// 鼠标在主窗口抬起
const stopResize = () => {
  isResizing = false;
}
// 监听元素加载完毕，不然下边的wechat.addEventListener会报错
window.addEventListener('DOMContentLoaded', () => {
  // 加载全局键盘监听
  listenGlobalKeyDown()
  const wechat = document.querySelector('.wechat');
  // 监听鼠标在主窗口中移动
  wechat.addEventListener('mousemove', (e) => {
    const diff = 6; // 设定偏移量，相距diff距离展示对应鼠标样式
    const { clientX, clientY } = e;
    const { offsetWidth, offsetLeft, offsetHeight, offsetTop } = wechat;
    if (isResizing) {
      // 按下了鼠标，待补全
      // wechat.style.width = clientX + 'px';
      // wechat.style.height = clientY + 'px'; 
    } else {
      // 展示对应边框位置的鼠标样式
      isLeft = clientX - offsetLeft <= diff && clientX - offsetLeft >= 0;
      isRight = -clientX + offsetLeft + offsetWidth <= diff && -clientX + offsetLeft + offsetWidth >= 0;
      isTop = clientY - offsetTop <= diff && clientY - offsetTop >= 0;
      isBottom = -clientY + offsetTop + offsetHeight < diff && -clientY + offsetTop + offsetHeight >= 0;

      if ((isLeft && isTop) || (isRight && isBottom)) { // 左上 || 右下
        wechat.style.cursor = 'nwse-resize';
      } else if ((isLeft && isBottom) || (isRight && isTop)) { // 左下 || 右上
        wechat.style.cursor = 'nesw-resize';
      } else if (isLeft || isRight) { // 左 || 右
        wechat.style.cursor = 'ew-resize';
      } else if (isTop || isBottom) { // 上 || 下
        wechat.style.cursor = 'ns-resize';
      } else { // 默认auto
        wechat.style.cursor = 'auto';
      }
    }
  });
});
</script>

<style scoped>
.wechat {
  position: fixed;
  display: flex;
  width: 850px;
  height: 660px;
  box-shadow: 0 0 100px #333;
}
</style>