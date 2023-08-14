<template>
  <div class="wechat" ref="wechat" @mousedown="startResize" @mouseup="stopResize">
    <ToolBar />
    <ListWrapper />
    <BoxWrapper />
    <ContextMenu />
  </div>
</template>

<script setup>
import ToolBar from './ToolBar/Index.vue'
import ListWrapper from './ListWrapper/Index.vue'
import BoxWrapper from './BoxWrapper/Index.vue'
import ContextMenu from './ContextMenu/Index.vue'

// 是否缩放主窗口
let isResizing = false;
// 鼠标在主窗口按下
const startResize = (e) => {
  isResizing = true;
  e.preventDefault();
}
// 鼠标在主窗口抬起
const stopResize = () => {
  isResizing = false;
}
// 监听元素加载完毕，不然下边的wechat.addEventListener会报错
window.addEventListener('DOMContentLoaded', () => {
  const wechat = document.querySelector('.wechat');
  // 监听鼠标在主窗口中移动
  wechat.addEventListener('mousemove', (e) => {
    const diff = 5; // 设定偏移量，相距diff距离展示对应鼠标样式
    const { clientX, clientY } = e;
    const { offsetWidth, offsetLeft, offsetHeight, offsetTop } = wechat;
    if (isResizing) {
      // 按下了鼠标，待补全
      // wechat.style.width = clientX + 'px';
      // wechat.style.height = clientY + 'px';
    } else {
      // 展示对应边框位置的鼠标样式
      const isLeft = clientX - offsetLeft <= diff && clientX - offsetLeft >= 0;
      const isRight = -clientX + offsetLeft + offsetWidth <= diff && -clientX + offsetLeft + offsetWidth >= 0;
      const isTop = clientY - offsetTop <= diff && clientY - offsetTop >= 0;
      const isBottom = -clientY + offsetTop + offsetHeight < diff && -clientY + offsetTop + offsetHeight >= 0;

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

<style>
.wechat {
  display: flex;
  width: 854px;
  height: 660px;
  box-shadow: 0 0 100px #333;
}
</style>