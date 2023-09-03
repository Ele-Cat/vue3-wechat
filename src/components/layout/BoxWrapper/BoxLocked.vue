<template>
  <div class="box-locked">
    <LockOutlined class="lock-icon" />
    <p class="title">Windows 微信已被锁定</p>
    <p>你可以在下方输入框里输入 <span>123456</span> 解锁</p>
    <a-input-password autocomplete="new-password" v-model:value="password" placeholder="请输入解锁密码" />
    <a-button type="primary" @click.prevent="handleUnlock">立即解锁</a-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { LockOutlined } from '@ant-design/icons-vue';
import useStore from "@/store";
const { useSystemStore } = useStore();
import { toast } from "@/utils/feedback";

const password = ref("")

const handleUnlock = () => {
  if (!password.value) {
    toast({
      type: "warning",
      content: "请输入解锁密码"
    })
    return
  }
  if (password.value !== "123456") {
    toast({
      type: "warning",
      content: "解锁密码错误"
    })
    return
  }
  toast({
    content: "解锁成功"
  })
  useSystemStore.isLocked = false
}
</script>

<style lang="less" scoped>
.box-locked {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
  color: #999;

  .lock-icon {
    position: relative;
    top: -40px;
    font-size: 48px;
    color: #666;
  }

  .title {
    font-size: 24px;
    color: #333;
    margin-bottom: 22px;
  }

  span {
    color: #07C160;
  }

  .ant-input-password {
    width: 200px;
    margin: 20px 0 12px;
  }
}
</style>
