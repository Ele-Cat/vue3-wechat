<template>
  <div class="collect-list" ref="componentRef">
    <div>
      <div class="collect-manage">
        <p><i class="wechatfont wechat-add_o"></i>新建笔记</p>
      </div>
      <div class="collect-box">
        <div
          v-for="(menu, index) in collectTypeList"
          :key="index"
          class="custom-item collect-item"
          :class="{active: useCollectStore.activeCollectType === menu.searchType}"
          @click="handleCollectTypeClick(menu)"
        >
          <i class="wechatfont" :class="'wechat-' + menu.searchType"></i>
          <p class="collect-name">{{ menu.title }}</p>
        </div>
        <div class="collect-divide"></div>
        <div class="tag-title" @click="toggleTags">
          <p><i class="wechatfont wechat-tag"></i>标签</p>
          <up-outlined v-if="tagsVisivle" />
          <down-outlined v-else />
        </div>
      </div>
    </div>

    <perfect-scrollbar>
      <div class="tag-box" v-show="tagsVisivle">
        <div
          v-for="(tag, index) in collectTagList"
          :key="index"
          class="custom-item collect-item tag-item"
          :class="{active: useCollectStore.activeCollectType === tag.searchType}"
          @click="handleCollectTypeClick(tag)"
        >
          <p class="collect-name">{{ tag.title }}</p>
        </div>
      </div>
    </perfect-scrollbar>
    <p class="collect-occupy">已使用 {{ totalSize }} MB，剩余 2.0 GB</p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import _ from "lodash";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import useStore from "@/store";
const { useCollectStore, useSystemStore } = useStore();
import { getUsedLocalStorageSize } from "@/utils/utils";

// todo 完善收藏模块
onMounted(() => {
  useCollectStore.activeCollectType = useCollectStore.activeCollectType || "all";
  useSystemStore.boxTitleText = useCollectStore.typeList.find(menu => menu.searchType === useCollectStore.activeCollectType)['title']
});

const tagsVisivle = ref(false);
const toggleTags = () => {
  tagsVisivle.value = !tagsVisivle.value;
};


const collectTypeList = computed(() => {
  return useCollectStore.typeList.filter(item => item.collectType === "type");
})

const collectTagList = computed(() => {
  return useCollectStore.typeList.filter(item => item.collectType === "tag");
})

const handleCollectTypeClick = (menu) => {
  useCollectStore.activeCollectType = menu.searchType || menu.title;
  useSystemStore.boxTitleText = menu.title;
}

const totalSize = getUsedLocalStorageSize();
</script>

<style lang="less" scoped>
.collect-list {
  background-color: #f7f7f7;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .collect-manage {
    padding: 14px;

    p {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      height: 34px;
      line-height: 34px;
      text-align: center;
      cursor: pointer;
      font-size: 14px;

      i {
        font-size: 18px;
        margin-right: 6px;
      }

      &:hover {
        background-color: #f0f0f0;
      }
    }
  }

  .collect-box,
  .tag-box {
    .collect-title {
      font-size: 12px;
      color: #999;
      padding: 14px 14px 0 14px;
    }

    .collect-divide {
      height: 1px;
      background-color: #eaeaea;
      margin: 8px 0;
    }

    .tag-title {
      padding: 14px;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:hover {
        background-color: #eaeaea;
      }

      &:active {
        background-color: #dfdfdf;
      }

      p {
        display: flex;
        align-items: center;

        .wechatfont {
          font-size: 18px;
          margin-right: 10px;
        }
      }

      .anticon {
        color: #999;
        font-size: 12px;
      }
    }

    .collect-item {
      display: flex;
      align-items: center;
      padding: 12px 14px;
      background-color: #f7f7f7;

      &:hover {
        background-color: #eaeaea;
      }

      &.active,
      &:active {
        background-color: #dfdfdf;
      }

      .wechatfont {
        font-size: 18px;
      }

      .collect-name {
        font-size: 14px;
        margin-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
      }
    }

    .tag-item {
      padding-left: 32px;
      &.active,
      &:active {
        background-color: #dfdfdf;
      }
    }
  }

  .tag-box {
    flex: 1;
    overflow-y: auto;
  }

  .collect-occupy {
    font-size: 12px;
    text-align: center;
    color: #999;
    line-height: 42px;
  }
}
</style>
