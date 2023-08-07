<template>
  <div class="tool-bar">
    <div class="tool-box tool-top">
      <img src="@/assets/vite.svg" class="avatar" alt="" srcset="">
      <i class="wechatfont wechat-message" title="聊天"></i>
      <i class="wechatfont wechat-users" title="通讯录"></i>
      <i class="wechatfont wechat-collect" title="收藏"></i>
      <i class="wechatfont wechat-files" title="聊天文件"></i>
      <i class="wechatfont wechat-timeline" title="朋友圈"></i>
    </div>
    <div class="tool-box tool-bottom">
      <i class="wechatfont wechat-applet" title="小程序面板"></i>
      <i class="wechatfont wechat-phone" title="手机"></i>
      <i class="wechatfont wechat-menu" title="设置及其他"></i>
    </div>
  </div>
</template>

<script setup>

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