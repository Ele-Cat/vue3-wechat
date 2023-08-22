<template>
  <div class="timeline" :class="{ fade: visible }">
    <div class="box" :class="{ fade: visible }" :style="style">
      <div class="header" ref="el" @click="emit('closeTimeline')">
        顶部
      </div>
      <div class="content">
        123456
      </div>
    </div>
  </div>
</template>
<script setup>
// 当前组件不是在APP下进行渲染，无法使用APP下的环境（全局组件，全局指令，原型属性函数）
import { ref } from "vue";
import { useDraggable } from "@vueuse/core";
const props = defineProps({
  visible: { // 标题
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits()

const el = ref();
const { x, y, style } = useDraggable(el, {
  initialValue: {
    x: window.innerWidth / 2 - 250,
    y: 50,
  },
});
</script>

<style lang="less" scoped>
.timeline {
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
    width: 500px;
    height: calc(100vh - 100px);
    background: #fff;
    border-radius: 4px;
    position: fixed;
    top: 50%;
    left: 50%;
    padding-bottom: 28px;
    // transform: translate(-50%, -60%);
    opacity: 0;
    &.fade {
      transition: opacity 0.4s;
      // transform: translate(-50%, -50%);
      opacity: 1;
    }
    .header,
    .footer {
      height: 32px;
      line-height: 32px;
      padding: 0 24px;
    }
    .body {
      padding: 0 24px 30px;
      font-size: 14px;
      text-align: justify;
      text-align-last: center;
      line-height: 1.4;
    }
    .footer {
      text-align: center;
      display: flex;
      justify-content: space-between;

      button {
        height: 32px;
        line-height: 30px;
        width: 46%;
        background-color: #F3F3F3;
        border: none;
        font-size: 14px;
        cursor: pointer;
        border-radius: 4px;

        &:nth-of-type(1) {
          color: #FF3333;
        }

        &:hover {
          background-color: #DBDBDB;
        }
      }
    }
    .header {
      position: relative;

      h3 {
        font-weight: normal;
        font-size: 18px;
      }

      i {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        cursor: pointer;

        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
