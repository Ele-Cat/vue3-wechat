<template>
  <div class="collect-box scroll-no-bar">
    <div class="collect-item" v-for="collect in useCollectStore.collectList" :key="collect.id">
      <div class="collect-info">
        <div>
          <p class="title">{{ collect.title }}</p>
          <p class="content">{{ collect.content }}</p>
        </div>
        <img v-if="collect.cover" :src="collect.cover" alt="" />
      </div>
      <div class="collect-extra">
        <div class="extra-info">
          <p class="author">{{ collect.author }}</p>
          <p class="tag">{{ collect.tags }}</p>
        </div>
        <p>{{ collect.time }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCollectList } from "@/api/manage";

import useStore from "@/store";
const { useCollectStore } = useStore();
if (useCollectStore.collectList.length === 0) {
  // 如果已经初始化过，就不重新渲染了
  getCollectList().then((res) => {
    const { data } = res.data;
    if (data.length == 0) return;

    // 初始化通讯录
    useCollectStore.collectList = data; // 平铺数据
  })
}
</script>

<style lang="less" scoped>
.collect-box {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 18px 56px 60px;
  display: flex;
  flex-direction: column;

  .collect-item {
    background-color: #ffffff;
    margin-bottom: 8px;
    border-radius: 8px;
    padding: 16px 18px;

    &:active {
      background-color: #E6E6E6;
    }

    .collect-info {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .content {
        font-size: 14px;
        color: #999;
        line-height: 1.4;
        margin-top: 8px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }

      img {
        width: 44px;
        height: 44px;
        margin-left: 10px;
      }
    }

    .collect-extra {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 12px;
      font-size: 14px;
      color: #999;

      .extra-info {
        display: flex;
      }
    }
  }
}
</style>
