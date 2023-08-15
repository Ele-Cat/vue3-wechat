<template>
  <div class="custom-menu" v-show="useContextMenuStore.menuVisible"
    :style="{ top: useContextMenuStore.menuTop + 'px', left: useContextMenuStore.menuLeft + 'px' }">
    <ul>
      <li v-for="contextMenu in contextMenuList" :key="contextMenu.value" :class="{ 'border-top': contextMenu.borderTop }"
        @click.stop="handleMenuClick(contextMenu.value)">{{ contextMenu.label }}</li>
    </ul>
  </div>
</template>

<script setup>
import useStore from '@/store'
const { useContextMenuStore } = useStore()
import { toast } from "@/utils/feedback";
import contextMenus from '@/utils/contextMenu';
import { ref, watch } from 'vue';

const handleMenuClick = (type) => {
  toast({
    type: "info",
    content: "相关功能开发中...",
  });
  useContextMenuStore.menuVisible = false;
}

const contextMenuList = ref([])
watch(() => useContextMenuStore.showInModule, (newVal) => {
  contextMenuList.value = contextMenus[newVal] || []
}, {
  immediate: true,
  deep: true,
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
  z-index: 99;

  >ul {
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: 12px;
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