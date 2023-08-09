<template>
  <a-config-provider :theme="{
    token: {
      colorPrimary: '#07c160',
    },
  }">
    <WeChat @click="handleWechatClick" @contextmenu="handleWechatContextMenu" />
  </a-config-provider>
</template>

<script setup>
import useStore from '@/store'
const { useContextMenuStore } = useStore()
import WeChat from '@/components/WeChat.vue'

const handleWechatClick = () => {
  useContextMenuStore.hideContextMenu()
}

const handleWechatContextMenu = (e) => {
  e.preventDefault()
}
</script>

<style lang="less">
@import url(//at.alicdn.com/t/c/font_4200334_kw63egtmk2.css);

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(./assets/bg.jpg) no-repeat center / cover;
  overflow: hidden;
  user-select: none;
}
</style>
