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
      <i class="wechatfont wechat-add no-drag" @click="handleInitGroup" v-if="useSystemStore.activeMenu === 'message'"></i>
      <i class="wechatfont wechat-adduser no-drag" @click="handleAddFriend" v-if="useSystemStore.activeMenu === 'users'"></i>
    </WeDragBox>
    <div class="list-box">
      <ListChat v-show="useSystemStore.activeMenu === 'message'" />
      <ListAddressBook v-show="useSystemStore.activeMenu === 'users'" />
      <ListCollect v-show="useSystemStore.activeMenu === 'collect'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import dayjs from "dayjs";
import Mock from "mockjs";
import _ from "lodash";
import { SearchOutlined, CloseCircleOutlined } from "@ant-design/icons-vue";
import ListChat from "./ListChat.vue";
import ListAddressBook from "./ListAddressBook.vue";
import ListCollect from "./ListCollect.vue";
import useStore from "@/store";
const { useAddressBookStore, useSystemStore, useChatStore, useUserInfoStore } = useStore();
import { getFriendList, getUserInfo } from "@/api/manage";
import { listSortByPinyin } from "@/utils/utils";
import { toast } from "@/utils/feedback"
import useDetectOutsideClick from "@/hooks/useDetectOutsideClick";

// 在这里初始化用户信息
if (_.isEmpty(useUserInfoStore.user)) {
  getUserInfo().then(res => {
    useUserInfoStore.user = res.data.data || {}
  })
}

// 在这里调取通讯录数据
if (useAddressBookStore.addressBookList.length === 0) {
  // 如果已经初始化过，就不重新渲染了
  getFriendList().then((res) => {
    const { data } = res.data;
    if (data.length == 0) return;

    // 初始化通讯录
    useAddressBookStore.flatAddressBookList = data; // 平铺数据
    useAddressBookStore.addressBookList = listSortByPinyin(data); // 通过拼音排序的二维数据

    // 初始聊天内容，截取平铺数据的前三条
    const addressBookInit = data.slice(0, 12);
    let initChatInfos = {};
    addressBookInit.forEach((item) => {
      initChatInfos[item.id] = Mock.mock({
        "data|4-10": [
          {
            id: Mock.mock("@guid"),
            "type|1": ["send", "receive"],
            content: "@cparagraph",
            name: item.name,
            avatar: item.avatar,
            createTime: "2023-08-10 12:12:12",
          },
        ],
      });
    });
    useChatStore.chatInfos = initChatInfos;

    // 初始聊天列表
    let initChatList = [];
    // 取聊天内容去渲染聊天列表
    for (const key in initChatInfos) {
      const chatData = initChatInfos[key]['data']
      // 拿到聊天内容的最后一条
      const item = chatData[chatData.length - 1]
      initChatList.push({
        id: Mock.mock("@guid"),
        friendId: key,
        name: item.name,
        type: "friend",
        lastChatTime: item.createTime,
        lastChatContent: item.content,
        lastChatContentType: "text",
        avatar: item.avatar,
      });
    }
    // 时间倒序
    initChatList = initChatList.sort((a, b) => {
      return (
        dayjs(b.lastChatTime).format("x") - dayjs(a.lastChatTime).format("x")
      );
    });
    useChatStore.chatList = initChatList;
  });
}

const isSearching = ref(false)
// 搜索框文本修改时
const handleSearchChange = (e) => {
  const { type } = e
  console.log('type: ', type);
  if (type === 'input') {
    // 立即检索
    isSearching.value = true;
  } else {
    // 点击了清空按钮
    isSearching.value = false;
  }
}

const users = ref();
useDetectOutsideClick(users, () => {
  isSearching.value = false;
  useSystemStore.listSearchText = "";
});

// 搜索框聚焦时
const handleSearchFocus = () => {
  isSearching.value = true;
}

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
