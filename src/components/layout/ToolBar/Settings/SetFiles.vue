<template>
  <div class="set-files">
    <div class="config">
      <WeLabel label="文件设置" label-width="80">
        <a-checkbox v-model:checked="formState.checked1"
          >开启文件自动下载（200MB以内）</a-checkbox
        >
        <a-checkbox v-model:checked="formState.checked2"
          >以只读的方式打开聊天中的文件</a-checkbox
        >
        <p>开启后，可保护聊天中的文件不被修改。</p>
      </WeLabel>
      <WeLabel label="文件管理" label-width="80" style="margin-top: 12px">
        <div class="position">D:\Program Files\WeChat Files\</div>
        <p>微信文件的默认保存位置</p>
        <span class="button" @click="handleChangeSavePosition">更改</span>
        <span class="button" @click="handleOpenFolder">打开文件夹</span>
      </WeLabel>
    </div>
  </div>
</template>

<script setup>
import { toast } from "@/utils/feedback";

import { reactive } from "vue";
const formState = reactive({
  checked1: true,
  checked2: false,
});

const handleChangeSavePosition = () => {
  toast({
    content: "更改",
  });
};

const handleOpenFolder = () => {
  toast({
    content: "打开文件夹",
  });
};
</script>

<style lang="less" scoped>
.set-files {
  .config {
    :deep(.ant-checkbox-wrapper) {
      margin-top: 5px;
    }
    p {
      font-size: 12px;
      color: #aaa;
      margin-top: 4px;
    }
    .position {
      margin-top: 4px;
      width: 210px;
      font-size: 16px;
      background-color: #fff;
      border: 1px solid #e7e7e7;
      padding: 4px 6px;
      line-height: 1.2;
    }
    .button {
      display: inline-block;
      text-align: center;
      width: 100px;
      height: 32px;
      line-height: 32px;
      background-color: #e9e9e9;
      border-radius: 4px;
      margin-top: 20px;
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
