<template>
  <div class="chat-list">
    <div v-for="chat in useChatStore.chatList" :key="chat.id" class="chat-item"
      :class="{ active: useChatStore.activeChat === chat.id }" @click="handleChatClick(chat.id)">
      <img :src="chat.avatar" alt="" class="chat-avatar">
      <div class="chat-info">
        <div class="chat-info-top">
          <p class="chat-name">{{ chat.name }}</p>
          <span class="chat-time">{{ friendTime(chat.lastChatTime) }}</span>
        </div>
        <p class="chat-content">{{ chat.lastChatContent }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import useStore from '@/store'
import { friendTime } from '@/utils/utils'
import { onMounted } from 'vue'

const { useChatStore } = useStore()

onMounted(() => {
  useChatStore.activeChat = useChatStore.activeChat || useChatStore.chatList[0]['id']
})

const handleChatClick = (id) => {
  useChatStore.activeChat = id
}
</script>

<style lang="less">
.chat-list {
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
</style>