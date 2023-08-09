<template>
  <div class="custom-menu" v-show="contextMenu.menuVisible" :style="{ top: contextMenu.menuTop + 'px', left: contextMenu.menuLeft + 'px' }">
    <ul>
      <li @click.stop="close('all')">置顶</li>
      <li @click.stop="close('others')">标为未读</li>
      <li @click.stop="close('others')">消息免打扰</li>
      <li @click.stop="close('others')">在独立窗口中打开</li>
      <li @click.stop="close('others')" class="border-top">不显示聊天</li>
      <li @click.stop="close('others')">删除聊天</li>
    </ul>
  </div>
</template>

<script setup>
import useStore from '@/store'
import { reactive, watch } from 'vue';
const { useContextMenuStore } = useStore()

let contextMenu = reactive({
  menuVisible: false,
  menuTop: 0,
  menuLeft: 0,
})

watch(() => useContextMenuStore, (newVal) => {
  contextMenu.menuVisible = newVal.menuVisible
  contextMenu.menuTop = newVal.menuTop
  contextMenu.menuLeft = newVal.menuLeft
}, {
  deep: true,
  immediate: true,
})
</script>

<style lang="less" scoped>
.custom-menu {
  position: absolute;
  top: 0;
  left: 0;
  // width: 144px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 8px 0px rgba(0, 0, 0, 0.2);
  border-radius: 5px;

  >ul {
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: 14px;
    color: #000000;
    border: 1px solid #C4C4C4;

    li {
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      padding: 0 20px;

      &:hover {
        background-color: #E2E2E2;
      }
    }

    .border-top {
      border-top: 1px solid #EDEDED;
    }
  }

  &.show {
    display: block;
  }
}
</style>