<template>
  <a-config-provider :theme="{
    token: {
      colorPrimary: '#07c160',
    },
  }">
    <WeChat />
  </a-config-provider>
</template>

<script setup>
import WeChat from '@/components/WeChat.vue'
</script>

<style lang="less">
@import url(//at.alicdn.com/t/c/font_4200334_49mqe3whpqj.css);

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url(./assets/bg.jpg) no-repeat center / cover;
  overflow: hidden;
}

// 设定滚轮
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  box-shadow: inset 0 0 5px #D2D2D2;
  background: #D2D2D2;
}

::-webkit-scrollbar-track {
  background: 0 0;
  border-radius: 1px;
}</style>
