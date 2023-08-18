<template>
  <a-config-provider :theme="{
    token: {
      colorPrimary: '#07c160',
    },
  }">
    <div class="wrapper" @click="handleWechatClick" @contextmenu="handleWrapperContextMenu">
      <WeChat @click="handleWechatClick" @contextmenu="handleWechatContextMenu" :style="{zIndex: wechatIndex}" />
      <TaskBar />
    </div>
    <!-- 右上角的follow me图片 -->
    <a href='https://gitee.com/ele-cat/vue3-wechat' target="_blank" class="widget"><img src='https://gitee.com/ele-cat/vue3-wechat/widgets/widget_1.svg' alt='Fork me on Gitee' /></a>
  </a-config-provider>
</template>

<script setup>
import { ref, watch } from "vue";
import useStore from '@/store';
const { useContextMenuStore, useSystemStore } = useStore();
import WeChat from '@/components/WeChat.vue';
import TaskBar from '@/components/TaskBar.vue';

const handleWechatClick = () => {
  // 点击wechat任意位置移除系统默认右键菜单
  useContextMenuStore.hideContextMenu()
}

const handleWechatContextMenu = (e) => {
  // 点击wechat任意位置屏蔽系统默认右键菜单
  e.preventDefault()
  // 如果已展示自定义菜单，则隐藏
  useContextMenuStore.menuVisible && useContextMenuStore.hideContextMenu()
}

const handleWrapperContextMenu = (e) => {
  useContextMenuStore.menuVisible && useContextMenuStore.hideContextMenu()
}

const wechatIndex = ref('auto')
watch(() => useSystemStore.windowState.isTop, (newVal) => {
  wechatIndex.value = newVal ? 99 : 'auto'
}, {
  immediate: true,
  deep: true,
})
</script>

<style lang="less">
@import url(//at.alicdn.com/t/c/font_4200334_1i6qek9gw0p.css);

#app {
  height: 100vh;
  background: url(@/assets/bg.jpg) no-repeat center / cover;
  overflow: hidden;
  user-select: none;

  .wrapper {
    width: 100%;
    height: 100%;
  }
}

.widget {
  position: fixed;
  top: 0;
  right: 0;
}
</style>
