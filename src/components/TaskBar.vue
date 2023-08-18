<template>
  <div class="task-bar">
    <div class="task-list">
      <i class="wechatfont wechat-windows" title="开始"></i>
      <i class="wechatfont wechat-task-wechat" title="微信"></i>
    </div>
    <div class="task-system">
      <div class="time" :title="nowDate">{{ nowTime }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import dayjs from "dayjs";
import 'dayjs/locale/zh-cn'

const nowTime = ref(dayjs().format("hh:mm:ss"))
const nowDate = ref(dayjs().locale('zh-cn').format("YYYY年M月D日\ndddd"))

setInterval(() => {
  nowTime.value = dayjs().format("hh:mm:ss")
  nowDate.value = dayjs().locale('zh-cn').format("YYYY年M月D日\ndddd")
}, 1000)
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
  background-color: rgba(231, 231, 231, 0.98);
  backdrop-filter: blur(1px);

  .task-list {
    i {
      display: inline-block;
      width: 36px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-size: 22px;

      &:hover {
        background-color: #F1F1F1;
      }
    }
  }

  .task-system {
    display: flex;
    height: 30px;
    line-height: 30px;
    padding-right: 6px;
    font-size: 12px;

    .time {
      color: #333;
      padding: 0 10px;

      &:hover {
        background-color: #F1F1F1;
      }
    }
  }
}
</style>