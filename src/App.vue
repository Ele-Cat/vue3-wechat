<template>
  <a-config-provider :theme="{
    token: {
      colorPrimary: '#07c160',
    },
  }">
    <WeChat @click="handleWechatClick" @contextmenu="handleWechatContextMenu" />
    <a href='https://gitee.com/ele-cat/vue3-wechat' target="_blank" class="widget"><img src='https://gitee.com/ele-cat/vue3-wechat/widgets/widget_1.svg' alt='Fork me on Gitee' /></a>
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
@import url(//at.alicdn.com/t/c/font_4200334_wv5x2080e2.css);

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(./assets/bg.jpg) no-repeat center / cover;
  overflow: hidden;
  user-select: none;
}

.widget {
  position: fixed;
  top: 0;
  right: 0;
}
</style>
