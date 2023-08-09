<template>
  <div class="chat">
    <div class="chat-title">
      <p>测试群组(6)</p>
    </div>
    <div class="chat-box">
      <div
        class="chat-item"
        :class="[chat.type === 'send' ? 'chat-send' : 'chat-receive']"
        v-for="(chat, index) in chatContent"
        :key="index"
      >
        <div class="chat-time"><span>22:03</span></div>
        <div class="chat-info">
          <img src="../../assets/vite.svg" alt="" srcset="" />
          <p class="chat-content">{{ chat.content }}</p>
        </div>
      </div>
    </div>
    <div class="input-box">
      <div class="input-control">控件列表</div>
      <div class="input-area">
        <a-textarea v-model:value="inputText" placeholder="请输入" />
      </div>
      <div class="input-btn">
        <button>发送(S)</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const chatContent = [
  {
    id: 1,
    type: "send",
    content: "132456",
    createTime: "2023-08-10 12:12:12",
  },
  {
    id: 2,
    type: "receive",
    content: "654321",
    createTime: "2023-08-10 12:15:12",
  },
  {
    id: 3,
    type: "send",
    content:
      "ds大神大神多大神打碎的爱上ds大神大神多大\n神打碎的爱上ds大神大神多大神打碎的爱上ds大神大神多大神打碎的爱上ds大神大神多大神打碎的爱上",
    createTime: "2023-08-10 12:16:12",
  },
  {
    id: 4,
    type: "receive",
    content: "132456",
    createTime: "2023-08-10 12:17:12",
  },
  {
    id: 2,
    type: "receive",
    content: "654321",
    createTime: "2023-08-10 12:15:12",
  },
  {
    id: 3,
    type: "send",
    content:
      "ds大神大神多大神打碎的爱上ds大神大神多大神打碎的爱上ds大神大神多大神打碎的爱上ds大神大神多大神打碎的爱上ds大神大神多大神打碎的爱上",
    createTime: "2023-08-10 12:16:12",
  },
  {
    id: 4,
    type: "receive",
    content: "132456",
    createTime: "2023-08-10 12:17:12",
  },
  {
    id: 2,
    type: "receive",
    content: "654321",
    createTime: "2023-08-10 12:15:12",
  },
  {
    id: 3,
    type: "send",
    content:
      "ds大神大神多大神打碎的爱上ds大神大神多大神打碎的爱上ds大神大神多大神打碎的爱上ds大神大神多大神打碎的爱上ds大神大神多大神打碎的爱上",
    createTime: "2023-08-10 12:16:12",
  },
  {
    id: 4,
    type: "receive",
    content: "132456",
    createTime: "2023-08-10 12:17:12",
  },
];

const inputText = ref("");
</script>

<style lang="less">
.chat {
  background-color: #f5f5f5;
  width: 550px;
  display: flex;
  flex-direction: column;

  .chat-title {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #e7e7e7;
    padding: 0 24px;
  }

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
      height: 36px;
      line-height: 36px;
      padding: 0 28px;
      font-size: 14px;
      background-color: #ff0;
    }

    .input-area {
      flex: 1;
      padding: 0 18px;

      .ant-input {
        height: 100%;
        border: none;
        background-color: transparent;
        box-shadow: none;
      }
    }

    .input-btn {
      height: 60px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 20px;

      button {
        width: 102px;
        height: 32px;
        background-color: #E9E9E9;
        border: none;
        font-size: 14px;
        color: #07C160;
        cursor: pointer;
        border-radius: 4px;

        &:hover {
          background-color: #D2D2D2;
        }
      }
    }
  }
}
</style>
