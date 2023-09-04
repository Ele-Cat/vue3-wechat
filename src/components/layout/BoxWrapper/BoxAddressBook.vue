<template>
  <WeNoData v-if="noSelect" />
  <div class="box-address-book" v-else>
    <div class="address-info">
      <div class="border-bottom flex">
        <div class="flex-left">
          <img class="avatar" :src="addressBookInfo.avatar" alt="" />
        </div>
        <div class="flex-1 user-info">
          <p class="name">
            {{ addressBookInfo.name }} <i class="wechatfont" :class="['wechat-' + addressBookInfo.gender]"></i>
          </p>
          <p>微信号：{{ addressBookInfo.phone }}</p>
          <p>地区：{{ addressBookInfo.address }}</p>
        </div>
        <ellipsis-outlined class="user-more" />
      </div>
      <div class="border-bottom user-from">
        <div class="flex">
          <div class="flex-left">备注名</div>
          <p class="flex-1">点击添加备注</p>
        </div>
        <div class="flex">
          <div class="flex-left">标签</div>
          <p class="flex-1">开发</p>
        </div>
        <div class="flex">
          <div class="flex-left">朋友权限</div>
          <p class="flex-1">不看他（她）的朋友圈和状态</p>
        </div>
        <div class="flex">
          <div class="flex-left">来源</div>
          <div class="flex-1">通过名片分享添加</div>
        </div>
      </div>
      <div class="address-btm">
        <button @click="sendMessage">发消息</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Mock from "mockjs";
import { EllipsisOutlined } from "@ant-design/icons-vue";
import useStore from "@/store";
const { useAddressBookStore, useSystemStore, useChatStore } = useStore();

const noSelect = ref(!useAddressBookStore.activeAddressBook);
const addressBookInfo = ref({});

// 监听通讯录切换时，展现对应的通讯录
watch(
  () => useAddressBookStore.activeAddressBook,
  (newVal) => {
    noSelect.value = !newVal;
    if (newVal) {
      addressBookInfo.value = useAddressBookStore.flatAddressBookList.find(item => item.id === newVal);
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

// 点击“发信息”按钮
const sendMessage = () => {
  // 将tab切换至聊天
  useSystemStore.activeMenu = 'chat'
  // 提取对应的用户信息
  const userInfo = useAddressBookStore.flatAddressBookList.find(item => item.id === useAddressBookStore.activeAddressBook)
  if (!useChatStore.chatList.find(item => item.friendId === useAddressBookStore.activeAddressBook)) {
    // 如果聊天记录里没这个人，则打开新的聊天窗口【置顶插入】
    useChatStore.chatList.unshift({
      friendId: useAddressBookStore.activeAddressBook,
      name: userInfo.name,
      type: "friend",
      avatar: userInfo.avatar,
    })
    // 同时给这个聊天记录一个空的记录
    useChatStore.chatInfos[useAddressBookStore.activeAddressBook] = useChatStore.chatInfos[useAddressBookStore.activeAddressBook] || []
  }
  // 设定标题
  useSystemStore.boxTitleText = userInfo.name;
  // 设定聚焦于哪个聊天
  useChatStore.activeChat = useAddressBookStore.activeAddressBook
}
</script>

<style lang="less" scoped>
.box-address-book {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  .wechat-weixin {
    color: #ebebeb;
    font-size: 88px;
  }

  .flex {
    display: flex;

    .flex-1 {
      flex: 1;
    }

    .flex-left {
      width: 72px;
    }
  }

  .address-info {
    width: 360px;
    margin-top: -40%;

    .border-bottom {
      border-bottom: 1px solid #eaeaea;
      padding: 12px 0;
    }

    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 8px;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      p {
        color: #999;
        font-size: 12px;
        line-height: 1.2;

        &.name {
          display: flex;
          align-items: center;
          font-size: 16px;
          color: #000;

          i {
            font-size: 18px;
            margin-left: 6px;

            &.wechat-male {
              color: #10aeff;
            }

            &.wechat-famale {
              color: #f37e7d;
            }
          }
        }
      }
    }

    .user-more {
      font-size: 24px;
      cursor: pointer;
      width: 24px;
      height: 24px;
      border-radius: 4px;

      &:hover {
        background-color: #cccccc;
      }
    }

    .user-from {
      font-size: 14px;
      color: #999;

      .flex:not(:nth-of-type(1)) {
        margin-top: 12px;

        .flex-1 {
          color: #000;
        }
      }
    }

    .address-btm {
      display: flex;
      justify-content: center;
      padding-top: 24px;

      button {
        border: none;
        background-color: #07c160;
        color: #fff;
        width: 110px;
        height: 32px;
        border-radius: 4px;
        font-size: 14px;
        cursor: pointer;

        &:hover {
          background-color: #38cd7f;
        }
      }
    }
  }
}
</style>
