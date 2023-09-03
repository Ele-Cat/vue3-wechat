<template>
  <div class="wechat" :style="wechatStyle">
    <ToolBar v-if="toolbarVisible" />
    <ListWrapper v-if="listWrapperVisible" />
    <BoxWrapper />
    <ContextMenu />
    <ResizeContainer />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import _ from "lodash";
import dayjs from "dayjs";
import Mock from "mockjs";
import { listenGlobalKeyDown } from "@/utils/shortcutKey";
import { getFriendList, getUserInfo } from "@/api/manage";
import useStore from "@/store";
const { useSystemStore, useChatStore, useAddressBookStore, useUserInfoStore } = useStore();
import { listSortByPinyin } from "@/utils/utils";
import ToolBar from "./layout/ToolBar/Index.vue";
import ListWrapper from "./layout/ListWrapper/Index.vue";
import BoxWrapper from "./layout/BoxWrapper/Index.vue";
import ContextMenu from "./common/ContextMenu/Index.vue";
import ResizeContainer from "./common/ResizeContainer/Index.vue";

// 监听全局键盘事件
onMounted(() => {
  listenGlobalKeyDown();
})

const { innerWidth, innerHeight } = window;
useSystemStore.windows.left = useSystemStore.windows.left || (innerWidth - useSystemStore.windows.width) / 2
useSystemStore.windows.top = useSystemStore.windows.top || (innerHeight - useSystemStore.windows.height) / 2
// 初始化窗口样式
const wechatStyle = ref({});

// 监听窗口变化并赋值
watch(
  () => useSystemStore.windows,
  (newVal) => {
    const { width, height, left, top } = newVal
    wechatStyle.value = Object.assign(
      {},
      {
        width: `${width}px`,
        height: `${height}px`,
        left: `${left}px`,
        top: `${top}px`,
      }
    );
  },
  {
    immediate: true,
    deep: true,
  }
);

// 监听窗口最小化并赋值
watch(
  () => useSystemStore.windowState.status,
  (newVal, oldVal) => {
    if (newVal === "minimize") {
      wechatStyle.value = Object.assign(
        {},
        {
          overflow: "hidden",
          transition: "all .12s cubic-bezier(0.5, 0, 0.9, 1)",
          width: "0",
          height: "0",
          left: "54px",
          bottom: "15px",
        }
      );
    } else if (newVal === "maximize") {
      wechatStyle.value = Object.assign(
        {},
        {
          overflow: "hidden",
          transition: oldVal === "minimize" ? "all 0s" : "all .12s",
          width: "100vw",
          height: "calc(100vh - 30px)",
          left: "0px",
          top: "0px",
        }
      );
    } else if (newVal === "closed") {
      wechatStyle.value = Object.assign(
        {},
        {
          overflow: "hidden",
          transition: "all .12s cubic-bezier(0.5, 0, 0.9, 1)",
          width: "0",
          height: "0",
          right: "90px",
          bottom: "15px",
        }
      );
    } else {
      wechatStyle.value = Object.assign(
        {},
        {...wechatStyle.value},
        {...useSystemStore.windowState.prevWindows},
        {transition: "all 0s",}
      );
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

// 监听界面锁定
const toolbarVisible = ref(true)
const listWrapperVisible = ref(true)
watch(() => [useSystemStore.isLocked, useSystemStore.isLoading], (newVal) => {
  const [isLocked, isLoading] = newVal
  toolbarVisible.value = listWrapperVisible.value = !isLocked && !isLoading
}, {
  immediate: true,
  deep: true,
})

// 初始化系统数据

// 初始化个人信息
if (_.isEmpty(useUserInfoStore.user)) {
  getUserInfo().then(res => {
    useUserInfoStore.user = res.data.data || {}
  })
}

// 在这里调取通讯录数据
if (useAddressBookStore.addressBookList.length === 0) {
  useSystemStore.isLoading = true;
  // 如果已经初始化过，就不重新渲染了
  getFriendList().then((res) => {
    const { data } = res.data;
    if (data.length == 0) return;
    data[0]['isStar'] = data[1]['isStar'] = data[2]['isStar'] = true

    // 初始化通讯录
    useAddressBookStore.flatAddressBookList = data; // 平铺数据
    useAddressBookStore.addressBookList = listSortByPinyin(data); // 通过拼音排序的二维数据

    // 初始聊天内容，截取平铺数据的前几条
    const addressBookInit = data.slice(0, 12);
    let initChatInfos = {};
    addressBookInit.forEach((item) => {
      let chatInfoLists = Mock.mock({
        "data|2-10": [
          {
            id: Mock.mock("@guid"),
            "type|1": ["send", "receive"],
            content: "@cparagraph",
            name: item.name,
            avatar: item.avatar,
            // createTime: "2023-08-10 12:12:12",
            createTime: "@date('2022-MM-dd HH:mm:ss')",
          },
        ],
      });
      chatInfoLists = chatInfoLists.data.sort((a, b) => {
        return (
          dayjs(a.createTime).format("x") - dayjs(b.createTime).format("x")
        );
      });
      initChatInfos[item.id] = chatInfoLists
    });
    useChatStore.chatInfos = initChatInfos;

    // 初始聊天列表
    let initChatList = [];
    // 取聊天内容去渲染聊天列表
    for (const key in initChatInfos) {
      const chatData = initChatInfos[key]
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
    initChatList[0]['isTop'] = initChatList[1]['isTop'] = initChatList[2]['isTop'] = true
    // 时间倒序
    initChatList = initChatList.sort((a, b) => {
      return (
        dayjs(b.lastChatTime).format("x") - dayjs(a.lastChatTime).format("x")
      );
    });
    useChatStore.chatList = initChatList;
    useSystemStore.isLoading = false;
  });
}
</script>

<style lang="less" scoped>
.wechat {
  position: fixed;
  display: flex;
  box-shadow: 0 0 4px #333;
}
</style>
