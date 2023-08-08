<template>
  <div class="tool-bar" @contextmenu="$event.preventDefault()">
    <div class="tool-box tool-top">
      <img src="@/assets/vite.svg" class="avatar" alt="" srcset="">
      <i class="wechatfont" v-for="menu in menuTop" :key="menu.icon" :title="menu.title"
        :class="[useSystemStore.activeMenu === menu.icon ? `active wechat-${menu.icon}` : `wechat-${menu.icon}`]"
        @click="handleMenuClick(menu.icon)"></i>
    </div>
    <div class="tool-box tool-bottom">
      <i class="wechatfont wechat-applet" title="小程序面板"></i>
      <i class="wechatfont wechat-phone" title="手机"></i>
      <i class="wechatfont wechat-menu" title="设置及其他"></i>
    </div>
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue';
import useStore from '@/store'
import { reactive } from 'vue';

const {useSystemStore} = useStore()

const menuTop = reactive([
  {
    icon: 'message',
    title: '聊天'
  }, {
    icon: 'users',
    title: '通讯录'
  }, {
    icon: 'collect',
    title: '收藏'
  }, {
    icon: 'files',
    title: '聊天文件'
  }, {
    icon: 'timeline',
    title: '朋友圈'
  }
])

const handleMenuClick = (type) => {
  if (['files', 'timeline'].includes(type)) {
    message.info('相关功能开发中...')
    return
  }
  useSystemStore.activeMenu = type
}
</script>

<style lang="less">
.tool-bar {
  background-color: #2E2E2E;
  width: 54px;
  color: #979797;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 35px 0 5px;
  user-select: none;

  .tool-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 26px;
    }

    i {
      font-size: 22px;
      margin-bottom: 16px;
      width: 100%;
      text-align: center;
      cursor: pointer;

      &:hover {
        color: #ABABAB;
      }

      &:active,
      &.active {
        color: #07c160;
      }
    }

    .wechat-files {
      font-size: 20px;
    }

    .wechat-files,
    .wechat-timeline {
      &:active {
        color: #D5D5D5;
      }
    }
  }

  .tool-bottom {
    i {
      font-size: 18px;
      margin-bottom: 14px;
    }

    .wechat-phone {
      font-size: 24px;
    }

    .wechat-menu {
      font-size: 20px;
    }
  }
}
</style>