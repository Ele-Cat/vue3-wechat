<template>
  <div class="user-list scroll-no-bar">
    <div class="user-manage">
      <p><i class="wechatfont wechat-usermanage"></i>通讯录管理</p>
    </div>
    <div class="user-box">
      <div class="user-title">群聊</div>
      <div v-for="group in groupList" :key="group.id" class="custom-item user-item" @contextmenu.stop="rightClicked($event)">
        <img :src="group.avatar" alt="" class="user-avatar">
        <p class="user-name">{{ group.name }}</p>
      </div>
    </div>
    <div class="user-box" v-for="friends in useAddressBookStore.addressBookList" :key="friends.letter">
      <div class="user-title">{{friends.letter}}</div>
      <div v-for="friend in friends.list" :key="friend.id" class="custom-item user-item"
        :class="[useAddressBookStore.activeAddressBook === friend.id ? 'active' : '']"
        @contextmenu.stop="rightClicked($event)" @click="friendClick(friend)">
        <img :src="friend.avatar" alt="" class="user-avatar">
        <p class="user-name">{{ friend.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import useStore from '@/store'
const { useAddressBookStore, useContextMenuStore } = useStore()

const groupList = reactive([
  {
    id: "1",
    name: "测试群组1测试群组1测试群组1测试群组1测试群组1测试群组1",
    type: "group",
    avatar: "http://img.adoutu.com/article/1606320535770.gif",
  }
])

// 点击好友，展示好友信息
const friendClick = (info) => {
  useAddressBookStore.activeAddressBook = info.id
}

// 点击右键，展示自定义菜单
const rightClicked = (e) => {
  e.preventDefault();
  useContextMenuStore.showContextMenu(e.clientY, e.clientX);
}
</script>

<style lang="less">
.user-list {
  background-color: #E7E6E5;
  height: 100%;
  overflow-y: scroll;

  .user-manage {
    padding: 14px;

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #FFFFFF;
      height: 38px;
      line-height: 38px;
      text-align: center;
      cursor: pointer;
      font-size: 14px;

      i {
        font-size: 18px;
        margin-right: 6px;
      }
    }
  }

  .user-box {
    border-bottom: 1px solid #E0DDDB;

    .user-title {
      font-size: 12px;
      color: #999;
      padding: 14px 14px 0 14px;
    }

    .user-item {
      display: flex;
      align-items: center;
      padding: 14px;

      .user-avatar {
        width: 34px;
        height: 34px;
        border-radius: 2px;
      }

      .user-name {
        font-size: 14px;
        margin-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
      }
    }
  }
}
</style>