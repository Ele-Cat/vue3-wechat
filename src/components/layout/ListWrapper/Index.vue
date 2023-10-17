<template>
  <div class="users" ref="users">
    <WeDragBox class="search-box">
      <a-input size="small" v-model:value="useSystemStore.listSearchText" placeholder="搜索" class="no-drag" @focus="handleSearchFocus" @blur="handleSearchBlur" @change="handleSearchChange">
        <template #prefix>
          <SearchOutlined style="color: #ccc" />
        </template>
        <template #suffix>
          <CloseCircleOutlined v-if="isSearching" style="color: #ccc" @click="handleSearchClear" />
        </template>
      </a-input>
      <i class="wechatfont wechat-add no-drag" @click="handleInitGroup" v-if="useSystemStore.activeMenu === 'chat'"></i>
      <i class="wechatfont wechat-adduser no-drag" @click="handleAddFriend" v-if="useSystemStore.activeMenu === 'users'"></i>
    </WeDragBox>
    <div class="list-box">
      <ListChat v-show="useSystemStore.activeMenu === 'chat'" />
      <ListAddressBook v-show="useSystemStore.activeMenu === 'users'" />
      <ListCollect v-show="useSystemStore.activeMenu === 'collect'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SearchOutlined, CloseCircleOutlined } from "@ant-design/icons-vue";
import ListChat from "./ListChat.vue";
import ListAddressBook from "./ListAddressBook.vue";
import ListCollect from "./ListCollect.vue";
import useStore from "@/store";
const { useSystemStore } = useStore();
import { toast } from "@/utils/feedback"
import useDetectOutsideClick from "@/hooks/useDetectOutsideClick";

const isSearching = ref(false)
// 搜索框文本修改时
const handleSearchChange = (e) => {
  const { type } = e
  if (type === 'input') {
    // 立即检索
    isSearching.value = true;
  } else {
    // 点击了清空按钮
    isSearching.value = false;
  }
}

// 当点击非用户列表时
const users = ref();
useDetectOutsideClick(users, () => {
  isSearching.value = false;
  useSystemStore.listSearchText = "";
});

// 搜索框聚焦时
const handleSearchFocus = () => {
  isSearching.value = true;
}

// 清空搜索列表时
const handleSearchClear = () => {
  isSearching.value = false;
  useSystemStore.listSearchText = "";
}

// 发起群聊
const handleInitGroup = () => {
  toast({
    content: "发起群聊"
  })
}

// 添加好友
const handleAddFriend = () => {
  toast({
    content: "添加好友"
  })
}
</script>

<style lang="less" scoped>
.users {
  // background-color: #F7F7F7;
  background-color: #e6e5e4;
  width: 250px;
  border-right: 1px solid #ebebeb;
  display: flex;
  flex-direction: column;

  .search-box {
    height: 60px;
    border-bottom: 1px solid #e7e7e7;
    background-color: #f7f7f7;
    display: flex;
    align-items: center;
    padding: 24px 10px 10px 10px;

    :deep(.ant-input-affix-wrapper) {
      background-color: #E2E2E2;
      border: none;
      box-shadow: none;

      &.ant-input-affix-wrapper-focused {
        background-color: #FFFFFF;
      }

      .ant-input {
        background-color: transparent;
        height: 24px;
      }
    }

    i {
      display: inline-block;
      width: 28px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      font-size: 16px;
      margin-left: 10px;
      background-color: #ebebeb;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #e0e0e0;
      }
    }
  }

  .list-box {
    flex: 1;
    overflow: hidden;
  }
}
</style>
