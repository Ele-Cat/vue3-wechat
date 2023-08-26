<template>
  <div class="set-account">
    <div class="user">
      <img :src="useUserInfoStore.user.avatar" alt="" />
      <div class="user-info">
        <p :title="useUserInfoStore.user.name">
          {{ useUserInfoStore.user.name }}
        </p>
        <p>微信号：{{ useUserInfoStore.user.phone }}</p>
      </div>
    </div>
    <div class="config">
      <WeLabel label="自动登录">
        <span v-if="formState.autoLogin">{{
          formState.autoLogin ? "已开启" : "开启"
        }}</span>
        <span class="switch" @click="handleClose">{{ formState.autoLogin ? "关闭" : "开启" }}</span>
        <p>开启后，在本机登录微信将无需手机确认。</p>
        <p>可在手机和电脑上关闭</p>
      </WeLabel>
    </div>
    <span class="logout" @click="handleLogout">退出登录</span>
  </div>
</template>

<script setup>
import useStore from "@/store";
const { useUserInfoStore } = useStore();
import Confirm from '@/components/libs/confirm';
import { toast } from "@/utils/feedback";

import { reactive } from "vue";
const formState = reactive({
  autoLogin: true,
});

const handleClose = () => {
  Confirm({
    text: '关闭后，下次登录需要手机确认',
    closable: false,
    confirmText: '确定',
    confirmColor: '#FF3333'
  }).then(() => {
    toast({
      content: "执行关闭"
    })
  }).catch(() => {})
}

const handleLogout = () => {
  Confirm({
    text: '退出登录后将无法接收到新消息，确定退出登录？',
    closable: false,
    confirmText: '确定',
    confirmColor: '#FF3333'
  }).then(() => {
    toast({
      content: "执行退出登录"
    })
  }).catch(() => {})
}
</script>

<style lang="less" scoped>
.set-account {
  .user {
    padding: 36px 24px;
    background-color: #fff;
    display: flex;
    align-items: center;
    color: #999;
    font-size: 12px;
    user-select: text;
    border-radius: 6px;
    border: 1px solid #fafafa;
    img {
      width: 50px;
      height: 50px;
      border-radius: 4px;
      margin-right: 18px;
    }
    .user-info {
      width: 240px;
      flex: 1;
    }
    p:nth-of-type(1) {
      width: 100%;
      font-size: 20px;
      color: #000;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .config {
    margin-top: 34px;
    .switch {
      margin-left: 10px;
      color: #697ba0;
      cursor: pointer;
      &:hover {
        color: #8493b1;
      }
    }
    p {
      font-size: 12px;
      color: #aaa;
      &:nth-of-type(1) {
        margin-top: 10px;
      }
    }
  }
  .logout {
    display: block;
    text-align: center;
    margin: 58px auto 0;
    width: 110px;
    height: 32px;
    line-height: 32px;
    background-color: #E9E9E9;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #D2D2D2;
    }
    &:active {
      background-color: #C6C6C6;
    }
  }
}
</style>
