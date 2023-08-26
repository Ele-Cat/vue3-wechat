<template>
  <div class="set-message">
    <p class="title">通知声音</p>
    <div class="form">
      <p>新消息通知声音</p>
      <a-switch v-model:checked="form.messageNotice" />
    </div>
    <div class="form">
      <p>语音和视频通话通知声音</p>
      <a-switch v-model:checked="form.voiceNotice" />
    </div>
    <p class="title">通知标记</p>
    <div class="form">
      <p>朋友圈</p>
      <a-switch v-model:checked="form.timelineMark" />
    </div>
    <div class="form">
      <p>看一看</p>
      <a-switch v-model:checked="form.lookMark" />
    </div>
    <p class="title">有内容更新时，侧边栏中改功能图标将出现标记提示。</p>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const form = reactive({
  messageNotice: true,
  voiceNotice: true,
  timelineMark: true,
  lookMark: false,
})
</script>

<style lang="less" scoped>
.set-message {
  width: 300px;
  .title {
    font-size: 12px;
    color: #999;
    &:nth-of-type(2) {
      margin-top: 24px;
    }
    &:nth-of-type(3) {
      margin-top: 12px;
    }
  }
  .form {
    display: flex;
    margin-top: 12px;
    p {
      flex: 1;
    }
    :deep(.ant-switch) {
      background: #E5E5E5;
      min-width: 40px;
    }
    :deep(.ant-switch-checked) {
      background: #07c160;
    }
  }
}
</style>
