<template>
  <div class="chat-title" v-if="systemStore.activeMenu !== 'users'">
    <p v-if="systemStore.activeMenu === 'message'">测试群组(6)</p>
    <p v-else>全部收藏</p>
  </div>
</template>

<script setup>
import { useSystemStore } from "@/store/modules/system";
const systemStore = useSystemStore();
</script>

<style lang="less">
.chat-title {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #e7e7e7;
  padding: 0 24px;
}
</style>
