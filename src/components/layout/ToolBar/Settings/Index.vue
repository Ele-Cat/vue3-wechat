<template>
  <div class="settings" :class="{ fade: visible }">
    <div class="box" :class="{ fade: visible }" :style="style">
      <div class="header" ref="el">
        <div class="header-left">
          设置
        </div>
        <i
          class="wechatfont wechat-close"
          title="关闭"
          @click.stop="emit('close')"
        ></i>
      </div>
      <div class="setting-wrapper">
        <a-tabs v-model:activeKey="activeKey" tab-position="left" animated>
          <a-tab-pane key="1" tab="账号设置">账号设置</a-tab-pane>
          <a-tab-pane key="2" tab="消息通知">消息通知</a-tab-pane>
          <a-tab-pane key="3" tab="通用设置">通用设置</a-tab-pane>
          <a-tab-pane key="4" tab="文件设置">文件设置</a-tab-pane>
          <a-tab-pane key="5" tab="快捷键">快捷键</a-tab-pane>
          <a-tab-pane key="6" tab="关于">关于</a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useDraggable } from "@vueuse/core";

const emit = defineEmits();
const props = defineProps({
  visible: {
    // 标题
    type: Boolean,
    default: true,
  },
});

const el = ref();
const { x, y, style } = useDraggable(el, {
  initialValue: {
    x: window.innerWidth / 2 - 275,
    y: window.innerHeight / 2 - 235,
  },
});

const activeKey = ref('1');
</script>

<style lang="less" scoped>
.settings {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, 0);
  user-select: none;
  display: none;

  &.fade {
    display: block;
    transition: background 0.4s;
    background: rgba(0, 0, 0, 0.05);
  }

  .box {
    width: 550px;
    background: #F5F5F5;
    border-radius: 2px;
    position: fixed;
    opacity: 0;
    box-shadow: 0 0 4px #666;

    &.fade {
      transition: opacity 0.4s;
      // transform: translate(-50%, -50%);
      opacity: 1;
    }

    .header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 32px;
      line-height: 32px;
      cursor: move;
      z-index: 9999;
      color: #666;

      .header-left {
        padding-left: 12px;
        font-size: 14px;
      }

      i {
        font-size: 14px;
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        cursor: pointer;

        &:hover {
          color: #FFF;
          background-color: #fa5151;
        }
      }
    }
    .setting-wrapper {
      font-size: 14px;
      padding-top: 20px;
      height: 430px;

      :deep(.ant-tabs-tab) {
        justify-content: center;
      }
      :deep(.ant-tabs-tab+.ant-tabs-tab) {
        margin-top: 0;
      }
      :deep(.ant-tabs-ink-bar) {
        height: 12px !important;
        margin-top: 13px;
      }
    }
  }
}
</style>