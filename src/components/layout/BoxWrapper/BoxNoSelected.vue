<template>
  <WeDragBox v-if="!isLocked">
    <div class="box-no-selected">
      <i class="wechatfont wechat-weixin"></i>
    </div>
  </WeDragBox>
  <BoxLocked v-else />
</template>

<script setup>
import { ref, watch } from "vue";
import BoxLocked from "./BoxLocked.vue";
import useStore from "@/store";
const { useSystemStore } = useStore();

const isLocked = ref(false)
watch(() => useSystemStore.isLocked, (newVal) => {
  isLocked.value = newVal
}, {
  immediate: true,
  deep: true,
})
</script>

<style lang="less" scoped>
.box-no-selected {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: -30px;

  .wechat-weixin {
    color: #ebebeb;
    font-size: 88px;
  }
}
</style>
