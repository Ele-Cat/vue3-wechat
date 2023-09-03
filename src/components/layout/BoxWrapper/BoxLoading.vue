<template>
  <div class="box-locked">
    <LoadingOutlined class="lock-icon" />
    <p class="title">加载中</p>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { LoadingOutlined } from '@ant-design/icons-vue';
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
.box-locked {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 16px;
  color: #999;

  .lock-icon {
    position: relative;
    top: -40px;
    font-size: 48px;
    color: #666;
  }

  .title {
    font-size: 24px;
    color: #333;
    margin-bottom: 22px;
  }

  span {
    color: #07C160;
  }

  .ant-input-password {
    width: 200px;
    margin: 20px 0 12px;
  }
}
</style>
