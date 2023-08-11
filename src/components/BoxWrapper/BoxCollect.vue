<template>
  <div class="collect-box scroll-no-bar">
    <div class="collect-item" v-for="collect in collectList" :key="collect.id">
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
import { reactive } from "vue";
import Mock from "mockjs";


const mockData = Mock.mock({
  "data|2-10": [
    {
      "id|+1": 1024,
      title: "@ctitle(8,14)",
      content: "@cparagraph",
      author: "@cname",
      "tags|2-5": ["@integer(1, 100)"],
      time: "@date('yyyy-MM-dd')",
      cover: "@dataImage('44x44', '最近')",
    },
  ],
});

const collectList = reactive(mockData.data);
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
