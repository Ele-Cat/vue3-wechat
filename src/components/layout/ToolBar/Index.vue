<template>
  <WeDragBox class="tool-bar">
    <div class="tool-box tool-top">
      <img :src="user.avatar || '@/assets/vite.svg'" class="avatar no-drag" @click.stop="handleAvatarClick" />
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
  <RelativeBox :visible="infoVisible" @close="infoVisible = false">
    <UserInfo :user="user" type="own" />
  </RelativeBox>
  <Timeline :visible="timelineVisible" @closeTimeline="closeTimelineF" />
</template>

<script setup>
import { reactive, watch, ref } from "vue";
import RelativeBox from "@/components/common/RelativeBox/Index.vue"
import UserInfo from "@/components/common/UserInfo/Index.vue"
import Timeline from "./Timeline.vue"
import { toast, notify } from "@/utils/feedback";
import useStore from "@/store";
const { useSystemStore, useRelativeBoxStore, useUserInfoStore } = useStore();

const user = ref({})
watch(() => useUserInfoStore.user, (newVal) => {
  user.value = newVal
}, {
  immediate: true,
  deep: true,
})

const infoVisible = ref(false);
// 点击头像，展示信息
const handleAvatarClick = (e) => {
  infoVisible.value = true;
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

const timelineVisible = ref(false)

// 点击工具栏icon
const handleMenuClick = (type) => {
  if (type === 'timeline') {
    timelineVisible.value = true
    return
  } else if (["applet", "menu", "phone", "files"].includes(type)) {
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

const closeTimelineF = () => {
  timelineVisible.value = false
}
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
