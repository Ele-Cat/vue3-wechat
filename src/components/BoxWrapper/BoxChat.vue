<template>
  <BoxNoSelected v-if="noSelect" />
  <template v-else>
    <div class="chat-box scroll-no-bar" ref="componentRef">
      <div
        class="chat-item"
        :class="[chat.type === 'send' ? 'chat-send' : 'chat-receive']"
        v-for="(chat, index) in chatContent"
        :key="index"
      >
        <div class="chat-time"><span>22:03</span></div>
        <div class="chat-info">
          <img
            v-if="chat.type !== 'send'"
            :src="chat.avatar"
            alt=""
            srcset=""
          />
          <img v-else src="../../assets/vite.svg" alt="" srcset="" />
          <p class="chat-content">{{ chat.content }}</p>
        </div>
      </div>
    </div>
    <div class="input-box">
      <div class="input-control">
        <div>
          <i class="wechatfont wechat-emoji" title="表情"></i>
          <i class="wechatfont wechat-folder" title="发送文件"></i>
          <i class="wechatfont wechat-cropping" title="截图(Alt+A)"></i>
          <i class="wechatfont wechat-history_message" title="聊天记录"></i>
        </div>
        <div>
          <i class="wechatfont wechat-audio_chat" title="语音聊天"></i>
          <i class="wechatfont wechat-video_chat" title="视频聊天"></i>
        </div>
      </div>
      <div class="input-area">
        <a-textarea v-model:value="inputText" placeholder="请输入" />
      </div>
      <div class="input-btn">
        <button @click="sendMsg">发送(S)</button>
      </div>
    </div>
  </template>
</template>

<script setup>
import useAutoScrollBottom from "@/hooks/useAutoScrollBottom";
import { onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import dayjs from "dayjs";
import useStore from "@/store";
const { useChatStore } = useStore();
import BoxNoSelected from "./BoxNoSelected.vue";

// const chatContent = reactive([
//   {
//     id: 1,
//     type: "send",
//     content: "你是谁",
//     createTime: "2023-08-10 12:12:12",
//   },
//   {
//     id: 2,
//     type: "receive",
//     content: "我是Vite？",
//     createTime: "2023-08-10 12:15:12",
//   },
//   {
//     id: 3,
//     type: "send",
//     content: "跟我长得有点像",
//     createTime: "2023-08-10 12:16:12",
//   },
//   {
//     id: 4,
//     type: "receive",
//     content:
//       "Vite 是一种具有明确建议的工具，具备合理的默认设置。您可以在 功能指南 中了解 Vite 的各种可能性。通过 插件，Vite 支持与其他框架或工具的集成。如有需要，您可以通过 配置部分 自定义适应你的项目。",
//     createTime: "2023-08-10 12:17:12",
//   },
//   {
//     id: 2,
//     type: "send",
//     content: "说人话",
//     createTime: "2023-08-10 12:15:12",
//   },
//   {
//     id: 3,
//     type: "receive",
//     content: "来我官网看https://cn.vitejs.dev/",
//     createTime: "2023-08-10 12:16:12",
//   },
// ]);
const chatContent = ref([])

onMounted(() => {
  // setInterval(() => {
  //   chatContent.push({
  //     id: 4,
  //     type: "receive",
  //     content: "132456",
  //     createTime: "2023-08-10 12:17:12",
  //   })
  // }, 1000)
});
const noSelect = ref(true);
watch(
  () => useChatStore.activeChat,
  (newVal) => {
    noSelect.value = !newVal;
    if (newVal) {
      chatContent.value = useChatStore.chatInfos[newVal]?.data
    }
  },
  {
    immediate: true,
    deep: true,
  }
);
const inputText = ref("");

const componentRef = ref();
useAutoScrollBottom(componentRef);

const sendMsg = () => {
  if (!inputText.value) {
    return;
  }

  useChatStore.chatInfos[useChatStore.activeChat]?.data.push({
    id: 4,
    type: "send",
    content: inputText.value,
    createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  });

  inputText.value = "";
};
</script>

<style lang="less" scoped>
.chat-box {
  flex: 1;
  overflow: auto;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;

  .chat-item {
    font-size: 14px;
    width: 100%;

    .chat-time {
      margin: 10px auto;
      text-align: center;

      span {
        display: inline-block;
        background-color: #eaeaea;
        font-size: 12px;
        color: #ffffff;
        padding: 4px 6px;
        border-radius: 2px;
      }
    }

    .chat-info {
      display: flex;

      img {
        width: 42px;
        height: 42px;
        overflow: hidden;
      }

      .chat-content {
        position: relative;
        max-width: 76%;
        padding: 12px;
        border-radius: 6px;
        margin: 0 16px;
        line-height: 1.4;
        word-break: break-all;

        &::before {
          content: "";
          position: absolute;
          width: 0;
          height: 0;
          border: 8px solid transparent;
          border-right: 8px solid #fff;
          left: -16px;
          top: 12px;
        }
      }
    }

    &.chat-send {
      .chat-info {
        flex-direction: row-reverse;
      }

      .chat-content {
        background-color: #95ec69;

        &::before {
          border-right: 0;
          border-left: 8px solid #95ec69;
          left: auto;
          right: -8px;
          top: 12px;
        }

        &:hover {
          background-color: #89d961;

          &::before {
            border-left: 8px solid #89d961;
          }
        }
      }
    }

    &.chat-receive {
      align-self: flex-start;

      .chat-content {
        background-color: #ffffff;

        &:hover {
          background-color: #ebebeb;

          &::before {
            border-right: 8px solid #ebebeb;
          }
        }
      }
    }
  }
}

.input-box {
  display: flex;
  flex-direction: column;
  height: 160px;
  border-top: 1px solid #ececec;

  .input-control {
    display: flex;
    justify-content: space-between;
    height: 36px;
    line-height: 36px;
    padding: 0 18px;

    i {
      font-size: 22px;
      margin: 0 6px;
      color: #333;
      cursor: pointer;

      &:hover {
        color: #000;
      }
    }
  }

  .input-area {
    flex: 1;
    padding: 0 18px;

    .ant-input {
      height: 100%;
      border: none;
      background-color: transparent;
      box-shadow: none;
      line-height: 1.4;
    }
  }

  .input-btn {
    height: 58px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;

    button {
      width: 102px;
      height: 32px;
      background-color: #e9e9e9;
      border: none;
      font-size: 14px;
      color: #07c160;
      cursor: pointer;
      border-radius: 4px;

      &:hover {
        background-color: #d2d2d2;
      }
    }
  }
}
</style>
