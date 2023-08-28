<template>
  <BoxNoSelected v-if="noSelect" />
  <template v-else>
    <perfect-scrollbar ref="perfectScrollbarRef">
      <div class="chat-box">
        <div
          class="chat-item"
          :class="[chat.type === 'send' ? 'chat-send' : 'chat-receive']"
          v-for="(chat, index) in chatContent"
          :key="index"
        >
          <div class="chat-time"><span>{{friendTime(chat.createTime)}}</span></div>
          <div class="chat-info">
            <img
              v-if="chat.type !== 'send'"
              v-lazyload="chat.avatar"
            />
            <img v-else :src="useUserInfoStore.user.avatar || '@/assets/vite.svg'" />
            <p class="chat-content" @contextmenu.stop="handleContentContextmenu">{{ chat.content }}</p>
          </div>
        </div>
      </div>
    </perfect-scrollbar>
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
        <a-textarea class="scroll-no-bar" v-model:value="inputText" placeholder="请输入" @focus="handletextareaFocus" @blur="handletextareaBlur" />
      </div>
      <div class="input-btn">
        <button @click="sendMsg">发送(S)</button>
      </div>
    </div>
  </template>
</template>

<script setup>
import { onMounted, ref, watch, getCurrentInstance, onUpdated, nextTick } from "vue";
import dayjs from "dayjs";
import useStore from "@/store";
const { useChatStore, useContextMenuStore, useUserInfoStore } = useStore();
import { friendTime } from "@/utils/utils";
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
//     content: "我是Vite",
//     createTime: "2023-08-10 12:15:12",
//   },
// ]);

// 右键聊天文本
const handleContentContextmenu = (e) => {
  e.preventDefault();
  const selection = window.getSelection().toString();
  if (selection) {
    // 如果已选择文本的情况下右键
    // 展示小菜单：复制、多选、搜一搜
    useContextMenuStore.showInModule = "chatSelectSome";
    useContextMenuStore.showContextMenu(e.clientY, e.clientX);
  } else {
    // 直接右键聊天文本
    // 全选文本并展示大菜单：复制、翻译、转发、收藏、多选、引用、搜一搜、删除
    const node = e.target.childNodes[0]
    selectText(node, 0, node.length); // 选择文本
    useContextMenuStore.showInModule = "chatSelectAll";
    useContextMenuStore.showContextMenu(e.clientY, e.clientX);
  }
  // 选择指定范围的文本
  function selectText(element, start, end) {
    var range = document.createRange(); // 创建一个 Range 对象
    range.setStart(element, start); // 设置起始位置
    range.setEnd(element, end); // 设置结束位置

    let selection = window.getSelection(); // 获取当前选择对象
    selection.removeAllRanges(); // 清空已有的选择范围
    selection.addRange(range); // 添加新的选择范围
  }
}

const perfectScrollbarRef = ref(null)
onMounted(() => {
  autoScrollBottom();
  // setInterval(() => {
  //   chatContent.value.push({
  //     id: 4,
  //     type: Math.random() > 0.5 ? "receive" : "send",
  //     content: "132456",
  //     createTime: "2023-08-10 12:17:12",
  //   })
  //   autoScrollBottom();
  // }, 1000)
});

const autoScrollBottom = () => {
  if (perfectScrollbarRef && perfectScrollbarRef.value) {
    nextTick(() => {
      perfectScrollbarRef.value.$el.scrollTop = perfectScrollbarRef.value.$el.scrollHeight
    })
  }
}

// 监听当聊天对象切换时，展示对应的聊天内容
const noSelect = ref(true);
const chatContent = ref([])
watch(
  () => useChatStore.activeChat,
  (newVal) => {
    noSelect.value = !newVal;
    if (newVal) {
      chatContent.value = useChatStore.chatInfos[newVal]?.data
    }
    autoScrollBottom();
  },
  {
    immediate: true,
    deep: true,
  }
);

// 监听输入框聚焦失焦，方便ctrl+enter快捷发送信息
const handletextareaFocus = () => {
  useChatStore.isFocusSendArea = true;
}
const handletextareaBlur = () => {
  useChatStore.isFocusSendArea = false;
}

// 发送聊天信息
const inputText = ref("");
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
  autoScrollBottom();
  inputText.value = "";
};
</script>

<style lang="less" scoped>
.chat-box {
  flex: 1;
  padding: 20px 30px;
  display: flex;
  flex-direction: column;
  // overflow-y: scroll;

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
        cursor: pointer;
      }

      .chat-content {
        position: relative;
        max-width: 76%;
        padding: 12px;
        border-radius: 6px;
        margin: 0 16px;
        line-height: 1.4;
        word-break: break-all;
        user-select: text;

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
      color: #666;
      cursor: pointer;

      &:hover {
        color: #000;
      }
    }
  }

  .input-area {
    flex: 1;
    padding: 0 18px;

    :deep(.ant-input) {
      height: 100%;
      background-color: transparent;
      border: none;
      box-shadow: none;
      line-height: 1.4;
      resize: none;
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
