<template>
  <div class="user-list scroll-no-bar" ref="componentRef">
    <div class="user-manage">
      <p><i class="wechatfont wechat-usermanage"></i>通讯录管理</p>
    </div>
    <div class="user-box">
      <div class="user-title">群聊</div>
      <div v-for="group in groupList" :key="group.id" class="custom-item user-item" @contextmenu="rightClicked($event)">
        <img :src="group.avatar" alt="" class="user-avatar">
        <p class="user-name">{{ group.name }}</p>
      </div>
    </div>
    <div class="user-box" v-for="friends in friendList" :key="friends.letter">
      <div class="user-title">{{friends.letter}}</div>
      <div v-for="friend in friends.list" :key="friend.id" class="custom-item user-item"
        :class="[useAddressBookStore.activeAddressBook === friend.id ? 'active' : '']"
        @contextmenu="rightClicked($event)" @click="friendClick(friend)">
        <img :src="friend.avatar" alt="" class="user-avatar">
        <p class="user-name">{{ friend.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { getFriendList } from "@/api/manage"
import useStore from '@/store'
import { listSortByPinyin } from '@/utils/utils'
import useDetectOutsideClick from '@/hooks/useDetectOutsideClick'
const { useAddressBookStore, useSystemStore, useContextMenuStore } = useStore()

const groupList = reactive([
  {
    id: "1",
    name: "测试群组1测试群组1测试群组1测试群组1测试群组1测试群组1",
    type: "group",
    avatar: "http://img.adoutu.com/article/1606320535770.gif",
  }
])
const friendList = ref([])

const rightClicked = (e) => {
  e.preventDefault();
  useContextMenuStore.showContextMenu(e.clientY, e.clientX);
}

const componentRef = ref()
useDetectOutsideClick(componentRef, () => {
  useSystemStore.activeMenu === 'users' && useContextMenuStore.hideContextMenu()
})

if (useAddressBookStore.addressBookList.length === 0) {
  getFriendList().then(res => {
    const { data } = res.data
    if (data.length == 0) return;
    
    useAddressBookStore.flatAddressBookList = data
    useAddressBookStore.addressBookList = friendList.value = listSortByPinyin(data)
  })
} else {
  friendList.value = useAddressBookStore.addressBookList
}

const friendClick = (info) => {
  useAddressBookStore.activeAddressBook = info.id
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