<template>
  <div class="users" @contextmenu="$event.preventDefault()">
    <div class="search-box">
      <a-input v-model:value="searchText" placeholder="搜索">
        <template #prefix>
          <search-outlined style="color:#ccc" />
        </template>
      </a-input>
      <i class="wechatfont wechat-adduser"></i>
    </div>
    <div class="user-list">
      <ListChat v-show="systemStore.activeMenu === 'message'" />
      <ListAddressBook v-show="systemStore.activeMenu === 'users'" />
      <ListCollect v-show="systemStore.activeMenu === 'collect'" />
    </div>
  </div>
</template>

<script setup>
import { SearchOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import ListChat from './ListChat.vue';
import ListAddressBook from './ListAddressBook.vue';
import ListCollect from './ListCollect.vue';

import { useSystemStore } from '@/store/modules/system'
const systemStore = useSystemStore()

const searchText = ref('')
</script>

<style lang="less">
.users {
  background-color: #F7F7F7;
  width: 250px;
  border-right: 1px solid #EBEBEB;

  .search-box {
    height: 60px;
    border-bottom: 1px solid #E7E7E7;
    display: flex;
    align-items: center;
    padding: 22px 10px 10px 10px;

    i {
      display: inline-block;
      width: 38px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      font-size: 18px;
      margin-left: 6px;
      background-color: #EBEBEB;
      border-radius: 4px;

      &:hover {
        background-color: #E0E0E0;
      }
    }
  }
}
</style>