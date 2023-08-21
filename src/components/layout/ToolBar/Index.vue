<template>
  <WeDragBox class="tool-bar">
    <div class="tool-box tool-top">
      <img src="@/assets/vite.svg" class="avatar no-drag" @click.stop="handleAvatarClick" />
      <i
        class="wechatfont no-drag"
        v-for="menu in menuTop"
        :key="menu.icon"
        :title="menu.title"
        :class="[
          useSystemStore.activeMenu === menu.icon
            ? `active wechat-${menu.icon}`
            : `wechat-${menu.icon}`,
        ]"
        @click="handleMenuClick(menu.icon)"
      ></i>
    </div>
    <div class="tool-box tool-bottom">
      <i 
        :class="[`no-drag wechatfont wechat-${menu.icon}`]" 
        v-for="menu in menuBottom"
        :key="menu.icon"
        :title="menu.title"
        @click="handleMenuClick(menu.icon)"></i>
    </div>
  </WeDragBox>
  <RelativeBox>
    这里放用户信息
  </RelativeBox>
</template>

<script setup>
import { reactive } from "vue";
import RelativeBox from "@/components/common/RelativeBox/Index.vue"
import { toast, notify } from "@/utils/feedback";
import useStore from "@/store";
const { useSystemStore, useRelativeBoxStore } = useStore();

// 点击头像，展示信息
const handleAvatarClick = (e) => {
  useRelativeBoxStore.showBox(e.clientY, e.clientX);
}

// 工具栏顶部菜单
const menuTop = reactive([
  {
    icon: "message",
    title: "聊天",
  },
  {
    icon: "users",
    title: "通讯录",
  },
  {
    icon: "collect",
    title: "收藏",
  },
  {
    icon: "files",
    title: "聊天文件",
  },
  {
    icon: "timeline",
    title: "朋友圈",
  },
]);

// 工具栏底部菜单
const menuBottom = reactive([
  {
    icon: "applet",
    title: "小程序面板",
  },
  {
    icon: "phone",
    title: "手机",
  },
  {
    icon: "menu",
    title: "设置及其他",
  },
]);

// 点击工具栏icon
const handleMenuClick = (type) => {
  if (["files", "timeline"].includes(type)) {
    // 点击聊天文件、朋友圈弹框
    toast({
      type: "info",
      content: "相关功能开发中...",
    });
    return;
  } else if (["applet", "phone", "menu"].includes(type)) {
    // 点击小程序面板、手机、设置及其他弹出小菜单
    notify({
      type: "info",
      content: "相关功能开发中...",
    });
    return;
  }
  // 其他情况，打开对应面板
  useSystemStore.activeMenu = type;
};
</script>

<style lang="less" scoped>
.tool-bar {
  background-color: #2e2e2e;
  width: 54px;
  height: 100%;
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
      margin-bottom: 18px;
      cursor: pointer;
    }

    i {
      font-size: 22px;
      padding: 8px 0;
      width: 100%;
      text-align: center;
      cursor: pointer;

      &:hover {
        color: #ababab;
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
        color: #d5d5d5;
      }
    }
  }

  .tool-bottom {
    i {
      padding: 0;
      font-size: 18px;
      margin-bottom: 14px;

      &:active {
        color: #d5d5d5;
      }
    }

    .wechat-phone {
      font-size: 24px;
      margin-bottom: 10px;
    }

    .wechat-menu {
      font-size: 20px;
    }
  }
}
</style>
