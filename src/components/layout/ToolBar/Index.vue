<template>
  <WeDragBox class="tool-bar">
    <div class="tool-box tool-top">
      <img :src="useUserInfoStore?.user?.avatar" class="avatar no-drag" @click.stop="handleAvatarClick" />
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
      <div class="tool-bottom-item" :class="[`tool-${menu.icon}`]" v-for="menu in menuBottom" :key="menu.icon" @click="handleMenuClick(menu.icon)">
        <i 
        :class="[`no-drag wechatfont wechat-${menu.icon}`]" 
        :title="menu.title"></i>
        <div class="tool-item-box" ref="toolHandler" v-if="activeToolBox === menu.icon">
          <template v-if="activeToolBox === 'applet'">
            <img src="https://tucdn.wpon.cn/2023/08/25/c4a2e28062909.png" class="applet" alt="" srcset="">
            <!-- <img src="https://tucdn.wpon.cn/2023/08/25/dcc370d45d42f.png" class="applet" alt="" srcset=""> -->
            <p>使用微信 扫码体验</p>
          </template>
          <template v-else-if="activeToolBox === 'phone'">
            <p class="phone phone-text">手机正在浏览和浮窗的内容将会在这里展示</p>
            <p class="phone phone-button"><i class="wechatfont wechat-files"></i>文件传输助手</p>
          </template>
          <template v-else>
            <div v-for="menu in menus" class="menu-item" :key="menu.value" @click.stop="handleMenuClick(menu.value)">{{ menu.label }}</div>
          </template>
        </div>
      </div>
    </div>
  </WeDragBox>
  <RelativeBox :visible="infoVisible" @close="infoVisible = false">
    <UserInfo :user="useUserInfoStore?.user" type="own" @send="infoVisible = false" />
  </RelativeBox>
  <Timeline :visible="timelineVisible" @close="closeTimeline" />
  <Settings :visible="settingsVisible" @close="closeSettings" />
</template>

<script setup>
import { reactive, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import RelativeBox from "@/components/common/RelativeBox/Index.vue"
import UserInfo from "@/components/common/UserInfo/Index.vue"
import Timeline from "./Timeline.vue"
import Settings from "./Settings/Index.vue"
import { toast, notify } from "@/utils/feedback";
import useStore from "@/store";
const { useSystemStore, useRelativeBoxStore, useUserInfoStore } = useStore();

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

const activeToolBox = ref("")
const toolHandler = ref(null)
onClickOutside(toolHandler, (event) => {
  activeToolBox.value = ""
})

const menus = reactive([
  {
    label: '视频号直播工具',
    value: 'videoAccountLiveStreamingTool'
  },{
    label: '迁移与备份',
    value: 'migrationAndBackup'
  },{
    label: '锁定',
    value: 'lock'
  },{
    label: '意见反馈',
    value: 'feedback'
  },{
    label: '设置',
    value: 'setting'
  }
])

const timelineVisible = ref(false)
// 点击工具栏icon
const handleMenuClick = (type) => {
  if (["message", "users", "collect"].includes(type)) {
    // 打开对应面板
    useSystemStore.activeMenu = type;
  } else if (type === 'timeline') {
    // 打开朋友圈
    timelineVisible.value = true
  } else if (["applet", "phone", "menu"].includes(type)) {
    // 点击小程序面板、手机、设置及其他弹出小菜单
    activeToolBox.value = type
  } else if (["lock", "feedback", "setting"].includes(type)) {
    // 点击小菜单条目
    activeToolBox.value = ""
    if (type === 'lock') {
      toast({
        type: "info",
        content: "已锁定，请输入密码解锁",
      });
      useSystemStore.isLocked = true
    } else if (type === 'feedback') {
      window.open(useSystemStore.qqGroupLink, "_blank")
    } else {
      settingsVisible.value = true
      // notify({
      //   type: "info",
      //   content: "打开设置...",
      // });
    }
  } else {
    notify({
      type: "info",
      content: "相关功能开发中...",
    });
  }
};

const closeTimeline = () => {
  timelineVisible.value = false
}

const settingsVisible = ref(false)
const closeSettings = () => {
  settingsVisible.value = false
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
    .tool-bottom-item {
      position: relative;
      margin-bottom: 16px;
      z-index: 99;

      .tool-item-box {
        position: absolute;
        min-width: 136px;
        min-height: 100px;
        background-color: #2E2E2E;
        left: 36px;
        bottom: 0;
      }

      &:nth-of-type(1) {
        .tool-item-box {
          width: 360px;
          height: 500px;
          border-radius: 0 6px 6px 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          // color: #1FF3FD;
          color: #AB7548;

          .applet {
            max-width: 80%;
            margin-bottom: 20px;
          }
        }
      }

      &:nth-of-type(2) {
        .tool-item-box {
          width: 242px;
          border-radius: 0 6px 6px 0;
          color: #FFF;
          font-size: 13px;
          line-height: 1.4;
          overflow: hidden;
          bottom: -36px;
          .phone-text {
            margin: 0 24px;
            padding: 20px 0;
            border-bottom: 1px solid #393939;
            text-align: center;
          }
          .phone-button {
            display: flex;
            align-items: center;
            padding: 16px 12px 12px;
            cursor: pointer;
            &:hover {
              background-color: #272728;
            }
            i {
              display: block;
              width: 40px;
              height: 40px;
              line-height: 40px;
              border-radius: 40px;
              background-color: #07C160;
              font-size: 18px;
              margin-right: 12px;
            }
          }
        }
      }

      &:nth-of-type(3) {
        .tool-item-box {
          background-color: #282828;

          .menu-item {
            height: 46px;
            line-height: 46px;
            padding-left: 12px;
            font-size: 14px;
            cursor: pointer;
            &:hover {
              background-color: #2F3033;
            }
          }
        }
      }

      i {
        padding: 0;
        font-size: 18px;

        &:active {
          color: #d5d5d5;
        }
      }
      &.tool-phone {
        margin-bottom: 10px;
        i {
          font-size: 22px;
        }
      }

      &.tool-menu {
        i {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
