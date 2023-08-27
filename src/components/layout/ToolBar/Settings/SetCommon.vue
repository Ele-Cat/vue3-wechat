<template>
  <div class="set-common">
    <div class="config">
      <WeLabel label="语言">
        <a-select
          v-model:value="formState.language"
          style="width: 130px"
          :options="languages"
          @change="handleLanguageChange"
        ></a-select>
      </WeLabel>
      <WeLabel label="通用" style="margin-top: 20px">
        <div class="common">
          <a-checkbox v-model:checked="formState.checked1"
            >有更新时自动升级微信</a-checkbox
          >
          <a-checkbox v-model:checked="formState.checked2">开机时自动打开微信</a-checkbox>
          <a-checkbox v-model:checked="formState.checked3">保留聊天记录</a-checkbox>
          <a-checkbox v-model:checked="formState.checked4">显示[最近在搜]</a-checkbox>
          <a-checkbox v-model:checked="formState.checked5">适配系统缩放比例</a-checkbox>
          <a-checkbox v-model:checked="formState.checked6">使用系统默认浏览器打开网页</a-checkbox>
          <a-checkbox v-model:checked="formState.checked7">聊天中的语音消息自动转成文字</a-checkbox>
        </div>
        <span class="button" @click="handleClear">清空聊天记录（4.0G）</span><br />
        <span class="button" @click="handleManage">储存空间管理</span>
      </WeLabel>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";
import Confirm from "@/components/libs/confirm";
import { toast } from "@/utils/feedback";

const languages = reactive([
  {
    value: "zh-cn",
    label: "简体中文",
  },
  {
    value: "en",
    label: "English",
  },
  {
    value: "zh-tw",
    label: "繁體中文",
  },
]);

const formState = reactive({
  language: "zh-cn",
  checked1: true,
  checked2: true,
  checked3: true,
  checked4: true,
  checked5: true,
  checked6: false,
  checked7: true,
});

let lastLaguage = ""
watch(() => formState.language, (newVal, oldVal) => {
  lastLaguage = oldVal
})

const handleLanguageChange = (e) => {
  Confirm({
    text: "更改语言需重新登录才能生效，是否确定更改？",
    closable: false,
    confirmText: "确定",
    confirmColor: "#FF3333",
  })
    .then(() => {
      toast({
        content: "执行切换语言",
      });
    })
    .catch(() => {
      formState.language = lastLaguage
      toast({
        content: "取消切换语言",
      });
    });
}

const handleClear = () => {
  Confirm({
    text: "将删除所有个人和群的聊天记录",
    closable: false,
    confirmText: "确定",
    confirmColor: "#FF3333",
  })
    .then(() => {
      toast({
        content: "执行清空聊天记录",
      });
    })
    .catch(() => {});
};

const handleManage = () => {
  toast({
    content: "打开储存空间",
  });
}
</script>

<style lang="less" scoped>
.set-common {
  .config {
    .common {
      display: flex;
      flex-direction: column;
      :deep(.ant-checkbox-wrapper) {
        margin-top: 4px;
      }
    }
    .button {
      display: inline-block;
      text-align: center;
      margin-top: 12px;
      height: 32px;
      line-height: 32px;
      padding: 0 12px;
      background-color: #e9e9e9;
      border-radius: 4px;
      cursor: pointer;
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
