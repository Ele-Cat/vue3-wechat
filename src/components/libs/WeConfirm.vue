<template>
  <div class="we-confirm" :class="{ fade: visible }" @contextmenu="e => e.preventDefault()">
    <div class="wrapper" :class="{ fade: visible }" :style="style">
      <div class="header" ref="el">
        <h3 v-if="title">{{ title }}</h3>
        <i
          @click="cancelCallback()"
          v-if="closable"
          href="JavaScript:;"
          class="wechatfont wechat-close"
        ></i>
      </div>
      <div class="body">
        <p>{{ text }}</p>
      </div>
      <div class="footer">
        <button @click="submitCallback()" :style="{color:confirmColor}">{{ confirmText }}</button>
        <button @click="cancelCallback()">取消</button>
      </div>
    </div>
  </div>
</template>
<script setup>
// 当前组件不是在APP下进行渲染，无法使用APP下的环境（全局组件，全局指令，原型属性函数）
import { onMounted, ref } from "vue";
import { useDraggable } from "@vueuse/core";
const props = defineProps({
  title: { // 标题
    type: String,
    default: "",
  },
  text: { // 内容
    type: String,
    default: "",
  },
  closable: { // 是否显示右上角关闭按钮
    type: Boolean,
    default: true,
  },
  confirmText: { // 左侧按钮文字
    type: String,
    default: "确定",
  },
  confirmColor: { // 左侧按钮文字颜色
    type: String,
    default: "#000000",
  },
  submitCallback: { // 点击左侧按钮触发事件
    type: Function,
  },
  cancelCallback: { // 点击右侧按钮触发事件
    type: Function,
  },
});

const el = ref();
const { x, y, style } = useDraggable(el, {
  initialValue: {
    x: window.innerWidth / 2 - 130,
    y: window.innerHeight / 2 - 100,
  },
});

const visible = ref(false);
onMounted(() => {
  // 当元素渲染完毕立即过渡的动画不会触发
  setTimeout(() => {
    visible.value = true;
  }, 0);
});
</script>

<style lang="less" scoped>
.we-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, 0);
  user-select: none;
  &.fade {
    transition: background 0.4s;
    background: rgba(0, 0, 0, 0.05);
  }
  .wrapper {
    width: 260px;
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
