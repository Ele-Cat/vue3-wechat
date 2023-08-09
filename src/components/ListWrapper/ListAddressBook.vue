<template>
  <div class="user-list">
    <div class="user-manage">通讯录管理</div>
    <div class="user-box">
      <div class="user-title">群聊</div>
      <div v-for="group in groupList" :key="group.id" class="user-item">
        <img :src="group.avatar" alt="" class="user-avatar">
        <p class="user-name">{{ group.name }}</p>
      </div>
    </div>
    <div class="user-box">
      <div class="user-title">A</div>
      <div v-for="friend in friendList" :key="friend.id" class="user-item">
        <img :src="friend.avatar" alt="" class="user-avatar">
        <p class="user-name">{{ friend.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import useStore from '@/store'
const { useAddressBookStore } = useStore()

const groupList = useAddressBookStore.addressBookList.filter(addressBook => addressBook.type === 'group')
const friendList = useAddressBookStore.addressBookList.filter(addressBook => addressBook.type === 'friend')
</script>

<style lang="less">
.user-list {
  .user-manage {
    margin: 14px;
    background-color: #FFFFFF;
    height: 38px;
    line-height: 38px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
  }

  .user-box {
    border-bottom: 1px solid #ECECEC;

    .user-title {
      font-size: 12px;
      color: #999;
      padding: 14px 14px 0 14px;
    }

    .user-item {
      display: flex;
      align-items: center;
      padding: 14px;

      &:hover {
        background-color: #DEDCDA;
      }

      &.active {
        background-color: #C7C6C5;
      }

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