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
</style>
