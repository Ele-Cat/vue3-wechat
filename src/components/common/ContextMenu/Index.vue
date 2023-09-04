<template>
  <div class="custom-menu" v-show="useContextMenuStore.menuVisible"
    :style="{ top: useContextMenuStore.menuTop + 'px', left: useContextMenuStore.menuLeft + 'px' }">
    <ul>
      <li v-for="contextMenu in contextMenuList" :key="contextMenu.type" :class="{ 'border-top': contextMenu.borderTop }"
        @click.stop="handleMenuClick(contextMenu.type)">{{ contextEnums[contextMenu.type] }}</li>
    </ul>
  </div>
  <!-- <DragModal /> -->
</template>

<script setup>
import { ref, watch } from 'vue';
import useStore from '@/store';
const { useContextMenuStore, useChatStore } = useStore();
import { toast } from "@/utils/feedback";
import { contextEnums, contextMenus } from '@/utils/contextMenu';
import Confirm from '@/components/libs/confirm';

// 点击菜单条目
const handleMenuClick = (type) => {
  const carryEntryInfo = useContextMenuStore.carryEntryInfo;
  if (type === "deleteChat") {
    // 删除聊天
    Confirm({
      text: '删除聊天后，将同时删除聊天记录，包括聊天中的文件、图片、视频等内容。',
      closable: false,
      confirmText: '删除',
      confirmColor: '#FF3333'
    }).then(() => {
      // 执行删除
      if (useChatStore.activeChat === carryEntryInfo.friendId) {
        // 如果当前删除的聊天是打开的聊天，关闭高亮
        useChatStore.activeChat = "";
      }
      delete useChatStore.chatInfos[carryEntryInfo.friendId]
      useChatStore.chatList.splice(useChatStore.chatList.findIndex(item => item.friendId === carryEntryInfo.friendId), 1)
    }).catch(() => {})
  } else if (type === "hideChat") {
    // 不显示聊天
    Confirm({
      text: '不显示该聊天',
      closable: false,
      confirmText: '不显示',
      confirmColor: '#FF3333'
    }).then(() => {
      // 执行不显示
      if (useChatStore.activeChat === carryEntryInfo.friendId) {
        // 如果当前删除的聊天是打开的聊天，关闭高亮
        useChatStore.activeChat = "";
      }
      useChatStore.chatList.splice(useChatStore.chatList.findIndex(item => item.friendId === carryEntryInfo.friendId), 1)
    }).catch(() => {})
  } else {
    toast({
      type: "info",
      content: "相关功能开发中...",
    });
  }
  useContextMenuStore.menuVisible = false;
}

// 根据点击的对象展示对应的菜单列表
const contextMenuList = ref([])
watch(() => useContextMenuStore, () => {
  const showInModule = useContextMenuStore.showInModule
  const carryEntryInfo = useContextMenuStore.carryEntryInfo
  if (showInModule === 'chat') {
    if (carryEntryInfo.isTop) {
      contextMenus[showInModule][0]['type'] = "unTop"
    } else {
      contextMenus[showInModule][0]['type'] = "toTop"
    }
  }
  contextMenuList.value = contextMenus[showInModule] || []
}, {
  deep: true,
})
</script>

<style lang="less" scoped>
.custom-menu {
  position: fixed;
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