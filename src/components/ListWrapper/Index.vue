<template>
  <div class="users">
    <div class="search-box">
      <a-input size="small" v-model:value="searchText" placeholder="搜索">
        <template #prefix>
          <search-outlined style="color:#ccc" />
        </template>
      </a-input>
      <i class="wechatfont wechat-add" v-if="systemStore.activeMenu === 'message'"></i>
      <i class="wechatfont wechat-adduser" v-if="systemStore.activeMenu === 'users'"></i>
    </div>
    <div class="list-box">
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
  // background-color: #F7F7F7;
  background-color: #E6E5E4;
  width: 250px;
  border-right: 1px solid #EBEBEB;
  display: flex;
  flex-direction: column;

  .search-box {
    height: 60px;
    border-bottom: 1px solid #E7E7E7;
    background-color: #F7F7F7;
    display: flex;
    align-items: center;
    padding: 24px 10px 10px 10px;

    i {
      display: inline-block;
      width: 28px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      font-size: 16px;
      margin-left: 10px;
      background-color: #EBEBEB;
      border-radius: 4px;

      &:hover {
        background-color: #E0E0E0;
      }
    }
  }

  .list-box {
    flex: 1;
    overflow: hidden;
  }
}
</style>