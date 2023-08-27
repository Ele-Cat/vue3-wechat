<template>
  <div class="set-about">
    <div class="config">
      <WeLabel label="发送信息" label-width="100" label-align="left">
        <p>微信 3.9.6.33</p>
        <span class="button" @click="handleCheckVersion">检查更新</span>
      </WeLabel>
      <WeLabel label="微信帮助" label-width="100" label-align="left" style="margin-top: 28px">
        <span class="button" @click="handleViewHelp">查看帮助</span>
      </WeLabel>
    </div>
  </div>
</template>

<script setup>
import useStore from "@/store";
const { useSystemStore } = useStore();

const handleCheckVersion = () => {
  window.open(useSystemStore.qqGroupLink, "_blank")
};
const handleViewHelp = () => {
  window.open(useSystemStore.qqGroupLink, "_blank")
};
</script>

<style lang="less" scoped>
.set-about {
  .config {
    :deep(.ant-checkbox-wrapper) {
      margin-top: 5px;
    }
    p {
      margin-top: 5px;
    }
    .button {
      display: inline-block;
      text-align: center;
      width: 100px;
      height: 32px;
      line-height: 32px;
      background-color: #e9e9e9;
      border-radius: 4px;
      margin-top: 2px;
      cursor: pointer;
      &:nth-of-type(2) {
        margin-left: 10px;
      }
      &:hover {
        background-color: #d2d2d2;
      }
      &:active {
        background-color: #c6c6c6;
      }
    }
  }
}
</style>
