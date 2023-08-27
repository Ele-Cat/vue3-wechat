<template>
  <div class="set-shortcut-key">
    <div class="config">
      <WeLabel label="发送信息" label-width="114" label-align="left">
        <a-select
          v-model:value="formState.sendMethod"
          style="width: 130px"
          :options="sendMethods"
          @change="handleLanguageChange"
        ></a-select>
      </WeLabel>
      <WeLabel label="截取屏幕" label-width="114" label-align="left" style="margin-top: 28px">
        <div class="shortcut-key">Alt + A</div>
      </WeLabel>
      <WeLabel label="打开微信" label-width="114" label-align="left" style="margin-top: 28px">
        <div class="shortcut-key">Ctrl + Alt + W</div>
      </WeLabel>
      <WeLabel label="锁定微信" label-width="114" label-align="left" style="margin-top: 28px">
        <div class="shortcut-key">Ctrl + L</div>
      </WeLabel>
      <WeLabel label="检测快捷键" label-width="114" label-align="left" style="margin-top: 28px">
        <a-checkbox v-model:checked="formState.checked">快捷键与其他软件冲突时提醒</a-checkbox>
        <span class="button" @click="handleReset">恢复默认设置</span>
      </WeLabel>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { toast } from "@/utils/feedback";

const sendMethods = reactive([
  {
    value: "enter",
    label: "Enter",
  },
  {
    value: "ctrl+enter",
    label: "Ctrl + Enter",
  },
]);

const formState = reactive({
  sendMethod: "enter",
  checked: true,
});

const handleReset = () => {
  toast({
    content: "恢复默认设置",
  });
};
</script>

<style lang="less" scoped>
.set-shortcut-key {
  .config {
    :deep(.ant-checkbox-wrapper) {
      margin-top: 5px;
    }
    p {
      font-size: 12px;
      color: #aaa;
      margin-top: 4px;
    }
    .shortcut-key {
      width: 130px;
      text-align: center;
      font-size: 14px;
      background-color: #fff;
      border: 1px solid #DBDBDB;
      padding: 6px;
      line-height: 1.2;
      border-radius: 6px;
      cursor: pointer;
      &:hover {
        border: 1px solid #A7A7A7;
      }
    }
    .button {
      display: inline-block;
      text-align: center;
      width: 132px;
      height: 32px;
      line-height: 32px;
      background-color: #e9e9e9;
      border-radius: 4px;
      margin-top: 36px;
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
