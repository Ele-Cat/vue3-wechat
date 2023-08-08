<template>
  <div class="chat-list">
    <div v-for="chat in useChatStore.chatList" :key="chat.id" class="chat-item"
      :class="{ active: useChatStore.activeChat === chat.id }" @click="handleChatClick(chat.id)"
      @contextmenu="rightClicked($event)">
      <img :src="chat.avatar" alt="" class="chat-avatar">
      <div class="chat-info">
        <div class="chat-info-top">
          <p class="chat-name">{{ chat.name }}</p>
          <span class="chat-time">{{ friendTime(chat.lastChatTime) }}</span>
        </div>
        <p class="chat-content">{{ chat.lastChatContent }}</p>
      </div>
    </div>
    <div class="custom-menu" :class="{ show: customMenuVisible }">
      <ul>
        <li @click.stop="close('all')">置顶</li>
        <li @click.stop="close('others')">标为未读</li>
        <li @click.stop="close('others')">消息免打扰</li>
        <li @click.stop="close('others')">在独立窗口中打开</li>
        <li @click.stop="close('others')" class="border-top">不显示聊天</li>
        <li @click.stop="close('others')">删除聊天</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import useStore from '@/store'
import { friendTime } from '@/utils/utils'
import { onMounted, ref } from 'vue'

const { useChatStore } = useStore()

const customMenuVisible = ref(false)

onMounted(() => {
  useChatStore.activeChat = useChatStore.activeChat || useChatStore.chatList[0]['id']
})

const handleChatClick = (id) => {
  useChatStore.activeChat = id
}

const rightClicked = (e) => {
  e.preventDefault()
  customMenuVisible.value = true

  let myMenu = document.querySelector(".custom-menu"); //再获取菜单标签
  myMenu.style.top = `${e.clientY}px`; //赋值菜单的x和y值
  myMenu.style.left = `${e.clientX}px`;
}
</script>

<style lang="less">
.chat-list {
  user-select: none;

  .chat-item {
    display: flex;
    padding: 12px;
    background-color: #E6E5E4;
    max-width: 100%;

    &:hover {
      background-color: #D8D7D7;
    }

    &.active {
      background-color: #C5C4C4;
    }

    .chat-avatar {
      width: 40px;
      height: 40px;
      border-radius: 4px;
    }

    .chat-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 12px;
      width: 170px;

      .chat-info-top {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #000;

        .chat-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        span {
          font-size: 12px;
          color: #999;
        }
      }

      .chat-content {
        font-size: 12px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}

.custom-menu {
  position: absolute;
  top: 0;
  left: 0;
  // width: 144px;
  background-color: #fff;
  box-sizing: border-box;
  box-shadow: 0 0 8px 0px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  display: none;

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