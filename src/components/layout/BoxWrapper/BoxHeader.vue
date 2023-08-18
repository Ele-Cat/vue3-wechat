<template>
  <div>
    <WeDragBox class="chat-title-box" :style="{borderBottom: titleVisible ? '1px solid #e7e7e7' : 'none'}">
      <div class="chat-title" v-if="titleVisible">
        <p>{{ boxTitleText }}</p>
      </div>
      <div v-else></div>
      <div class="chat-ctrl">
        <div class="chat-ctrl-icon no-drag">
          <i class="wechatfont wechat-regular" :class="{active: useSystemStore.windowState.isTop}" title="置顶" @click.stop="handleToggleTop"></i>
          <!-- 取消置顶 -->
          <i class="wechatfont wechat-minimize" title="最小化" @click.stop="handleMinimize"></i>
          <i class="wechatfont" :class="[useSystemStore.windowState.status === 'normal' ? 'wechat-maximize' : 'wechat-restore_down']" :title="useSystemStore.windowState.status === 'normal' ? '最大化' : '向下还原'" @click.stop="handleToggleMaximize"></i>
          <!-- wechat-restore_down 向下还原 -->
          <i class="wechatfont wechat-close" title="关闭" @click.stop="handleClose"></i>
        </div>
        <ellipsis-outlined class="chat-more no-drag" title="聊天信息" v-if="titleVisible && useSystemStore.activeMenu === 'message'" />
      </div>
    </WeDragBox>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { EllipsisOutlined } from "@ant-design/icons-vue";
import useStore from "@/store";
const { useSystemStore, useChatStore, useCollectStore } = useStore();

// 判断是否显示窗体标题
const titleVisible = ref(false)
const boxTitleText = ref('')
watch(() => [useSystemStore.activeMenu, useChatStore.activeChat, useCollectStore.activeCollectType], () => {
  if ((useSystemStore.activeMenu === 'message' && useChatStore.activeChat) || (useSystemStore.activeMenu === 'collect' && useCollectStore.activeCollectType)) {
    titleVisible.value = true
    if (useSystemStore.activeMenu === 'message' && useChatStore.activeChat) {
      boxTitleText.value = useChatStore.chatList.find(item => item.friendId === useChatStore.activeChat)?.name
    } else if (useSystemStore.activeMenu === 'collect' && useCollectStore.activeCollectType) {
      boxTitleText.value = useCollectStore.collectTypeList.find(item => item.type === useCollectStore.activeCollectType)['title']
    }
  } else {
    titleVisible.value = false
  }
}, {
  immediate: true,
  deep: true,
})

// 切换置顶
const handleToggleTop = () => {
  useSystemStore.windowState.isTop = !useSystemStore.windowState.isTop
}
// 最小化
const handleMinimize = () => {
  // 最小化时，记录窗口位置大小
  const { width, height, left, top } = useSystemStore.windows
  useSystemStore.windowState.prevWindows = {
    width: `${width}px`,
    height: `${height}px`,
    left: `${left}px`,
    top: `${top}px`,
  }
  useSystemStore.windowState.prevStatus = useSystemStore.windowState.status
  useSystemStore.windowState.status = "minimize"
}
// 切换是否最大化
const handleToggleMaximize = () => {
  const { width, height, left, top } = useSystemStore.windows
  useSystemStore.windowState.prevWindows = {
    width: `${width}px`,
    height: `${height}px`,
    left: `${left}px`,
    top: `${top}px`,
  }
  useSystemStore.windowState.prevStatus = useSystemStore.windowState.status
  useSystemStore.windowState.status = useSystemStore.windowState.status === "maximize" ? "normal" : "maximize"
}
</script>

<style lang="less" scoped>
.chat-title-box {
  height: 60px !important;
  border-bottom: 1px solid #e7e7e7;
  padding: 0 0 0 24px;
  display: flex;
  justify-content: space-between;

  .chat-title {
    line-height: 60px;
    flex: 1;
    overflow: hidden;

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .chat-ctrl {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    position: relative;
    z-index: 99;

    .chat-ctrl-icon {
      i {
        display: inline-block;
        width: 32px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        cursor: pointer;
        color: #000;

        &.wechat-regular.active {
          color: #07c160;
          background-color: #E2E2E2;

          &:active {
            background-color: #D1D1D1;
          }
        }

        &:hover {
          background-color: #E2E2E2;

          &:nth-last-of-type(1) {
            background-color: #FB7373;
            color: #FFFFFF;
          }
        }

        &:active {
          background-color: #D1D1D1;

          &:nth-last-of-type(1) {
            background-color: #E14848;
          }
        }
      }
    }

    .chat-more {
      flex: 1;
      display: inline-block;
      width: 32px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      color: #444;
      font-size: 18px;
      font-weight: bold;

      &:hover {
        color: #000;
      }
    }
  }
}
</style>
