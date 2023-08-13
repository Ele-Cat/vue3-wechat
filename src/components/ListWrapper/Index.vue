<template>
  <div class="users">
    <div class="search-box">
      <a-input size="small" v-model:value="searchText" placeholder="搜索">
        <template #prefix>
          <search-outlined style="color: #ccc" />
        </template>
      </a-input>
      <i
        class="wechatfont wechat-add"
        v-if="useSystemStore.activeMenu === 'message'"
      ></i>
      <i
        class="wechatfont wechat-adduser"
        v-if="useSystemStore.activeMenu === 'users'"
      ></i>
    </div>
    <div class="list-box">
      <ListChat v-show="useSystemStore.activeMenu === 'message'" />
      <ListAddressBook v-show="useSystemStore.activeMenu === 'users'" />
      <ListCollect v-show="useSystemStore.activeMenu === 'collect'" />
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import Mock from "mockjs";
import { SearchOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import ListChat from "./ListChat.vue";
import ListAddressBook from "./ListAddressBook.vue";
import ListCollect from "./ListCollect.vue";
import useStore from "@/store";
import { getFriendList } from "@/api/manage";
import { listSortByPinyin } from "@/utils/utils";
const { useAddressBookStore, useSystemStore, useChatStore } = useStore();

const searchText = ref("");

// 在这里调取通讯录数据
if (useAddressBookStore.addressBookList.length === 0) {
  getFriendList().then((res) => {
    const { data } = res.data;
    if (data.length == 0) return;

    // 初始化通讯录
    useAddressBookStore.flatAddressBookList = data;
    useAddressBookStore.addressBookList = listSortByPinyin(data);

    // 初始聊天内容
    const addressBookInit = data.slice(0, 3);
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
    console.log('%c [ initChatInfos ]-73', 'font-size:13px; background:pink; color:#bf2c9f;', initChatInfos)
    for (const key in initChatInfos) {
      const chatData = initChatInfos[key]['data']
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
    // addressBookInit.forEach((item) => {
    //   initChatList.push({
    //     id: Mock.mock("@guid"),
    //     friendId: item.id,
    //     name: item.name,
    //     type: "friend",
    //     lastChatTime: Mock.mock("@datetime"),
    //     lastChatContent: Mock.mock("@cparagraph"),
    //     lastChatContentType: "text",
    //     avatar: item.avatar,
    //   });
    // });

    // 时间倒序
    console.log('%c [ initChatList ]-100', 'font-size:13px; background:pink; color:#bf2c9f;', initChatList)
    initChatList = initChatList.sort((a, b) => {
      return (
        dayjs(b.lastChatTime).format("x") - dayjs(a.lastChatTime).format("x")
      );
    });

    useChatStore.chatList = initChatList;
  });
}
</script>

<style lang="less">
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
