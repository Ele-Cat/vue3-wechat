<template>
  <div class="task-bar">
    <div class="task-list">
      <i class="wechatfont wechat-windows icon" title="开始"></i>
      <div class="icon wechat" v-if="useSystemStore.windowState.status !== 'closed'">
        <img src="@/assets/wechat.svg" title="微信" @click="handleToggleMinimize" alt="">
      </div>
      <!-- <i class="wechatfont wechat-task-wechat"></i> -->
    </div>
    <div class="task-system">
      <div class="task-icon bilibili" title="关注B站">
        <img src="@/assets/bilibili.png" alt="" @click="addBilibili">
      </div>
      <div class="task-icon qq" title="点击加群">
        <img src="@/assets/qq.svg" alt="" @click="addGroup">
      </div>
      <div class="task-icon wechat" title="微信" @click="handleClickWechat">
        <img src="@/assets/wechat.svg" alt="">
        <!-- <img src="@/assets/wechat.svg" class="blink" alt=""> -->
      </div>
      <div class="time" :title="nowDate">{{ nowTime }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn'
import useStore from "@/store";
const { useSystemStore } = useStore();

const nowTime = ref(dayjs().format("HH:mm:ss"))
const nowDate = ref(dayjs().locale('zh-cn').format("YYYY年M月D日\ndddd"))

setInterval(() => {
  nowTime.value = dayjs().format("HH:mm:ss")
  nowDate.value = dayjs().locale('zh-cn').format("YYYY年M月D日\ndddd")
}, 1000)

const handleToggleMinimize = () => {
  if (useSystemStore.windowState.status !== "minimize") {
    useSystemStore.windowState.prevStatus = useSystemStore.windowState.status
  }
  useSystemStore.windowState.status = useSystemStore.windowState.status === "minimize" ? useSystemStore.windowState.prevStatus : "minimize"
}
const handleClickWechat = () => {
  useSystemStore.windowState.status = useSystemStore.windowState.prevStatus
}
const addGroup = () => {
  window.open(useSystemStore.qqGroupLink, "_blank")
}
const addBilibili = () => {
  window.open("https://space.bilibili.com/376288070", "_blank")
}
</script>

<style lang="less" scoped>
.task-bar {
  position: fixed;
  height: 30px;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(9, 31, 47, 0.98);
  backdrop-filter: blur(1px);

  .task-list {
    display: flex;
    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 22px;
      margin-right: 4px;
      color: #FFFFFF;

      &:hover, &:active, &.active {
        background-color: #223644;
      }
      
      img {
        width: 24px;
        object-fit: contain;
      }
    }
    .wechat {
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: 4px;
        right: 4px;
        bottom: 0;
        height: 2px;
        background-color: #07c160;
        transition: all .2s;
      }

      &:hover {
        &::before {
          left: 0;
          right: 0;
        }
      }
    }
  }

  .task-system {
    display: flex;
    height: 30px;
    line-height: 30px;
    padding-right: 6px;
    font-size: 12px;

    .task-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 100%;

      img {
        height: 22px;
        object-fit: contain;
      }

      &:hover, &:active, &.active {
        background-color: #223644;
      }

      .blink {
        animation: blink 1s infinite;
      }

      &.qq {
        img {
          height: 18px;
        }
      }
    }

    .time {
      color: #FFFFFF;
      padding: 0 10px;
      border-right: 1px solid #AEAEAE;

      &:hover {
        background-color: #223644;
      }
    }
  }
}

@keyframes blink {
  0% { opacity: 1; }
  30% { opacity: 0; }
  100% { opacity: 1; }
}
</style>