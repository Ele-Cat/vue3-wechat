<template>
  <WeDragBox>
    <div class="box-no-selected">
      <i class="wechatfont wechat-weixin" :style="{...defaultImageStyle, ...imageStyle}"></i>
      <p :style="textStyle">{{ text }}</p>
    </div>
  </WeDragBox>
</template>

<script setup>
const props = defineProps({
  imageStyle: {
    type: Object,
    default: () => {
      return {
        color: "#ebebeb",
        fontSize: "88px",
      }
    }
  },
  textStyle: {
    type: Object,
    default: () => {
      return {
        color: "#999",
        fontSize: "16px",
      }
    }
  },
  text: {
    type: String,
    default: "",
  }
})
const defaultImageStyle = {
  color: "#ebebeb",
  fontSize: "88px",
}
</script>

<style lang="less" scoped>
.box-no-selected {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: -30px;

  // .wechat-weixin {
  //   color: #ebebeb;
  //   font-size: 88px;
  // }
}
</style>
