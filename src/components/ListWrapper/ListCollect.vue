<template>
  <div class="collect-list" ref="componentRef">
    <div>
      <div class="collect-manage">
        <p><i class="wechatfont wechat-add_o"></i>新建笔记</p>
      </div>
      <div class="collect-box">
        <div
          v-for="(menu, index) in menuList"
          :key="index"
          class="custom-item collect-item"
        >
          <i class="wechatfont" :class="'wechat-' + menu.type"></i>
          <p class="collect-name">{{ menu.title }}</p>
        </div>
        <div class="tag-title" @click="toggleTags">
          <p><i class="wechatfont wechat-tag"></i>标签</p>
          <up-outlined v-if="tagsVisivle" />
          <down-outlined v-else />
        </div>
      </div>
    </div>

    <div class="tag-box scroll-no-bar">
      <div
        v-for="(tag, index) in tags"
        :key="index"
        class="custom-item collect-item tag-item"
        @contextmenu="rightClicked($event)"
      >
        <p class="collect-name">{{ tag.title }}</p>
      </div>
    </div>
    <p class="collect-occupy">已使用10.9MB，剩余2.0GB</p>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import useStore from "@/store";
import { DownOutlined, UpOutlined } from "@ant-design/icons-vue";
import useDetectOutsideClick from "@/hooks/useDetectOutsideClick";
const { useCollectStore, useSystemStore, useContextMenuStore } = useStore();

const menuList = reactive([
  {
    title: "全部收藏",
    type: "all",
  },
  {
    title: "最近使用",
    type: "recent",
  },
  {
    title: "链接",
    type: "link",
  },
  {
    title: "笔记",
    type: "note",
  },
]);

const tagList = useCollectStore.tags;

const tagsVisivle = ref(false);
const tags = ref([]);

watch(
  () => tagsVisivle.value,
  (newVal) => {
    tags.value = newVal ? tagList : [];
  },
  {
    immediate: true,
  }
);

const toggleTags = () => {
  tagsVisivle.value = !tagsVisivle.value
}

const rightClicked = (e) => {
  e.preventDefault();
  useContextMenuStore.showContextMenu(e.clientY, e.clientX);
};

const componentRef = ref();
useDetectOutsideClick(componentRef, () => {
  useSystemStore.activeMenu === "collect" &&
    useContextMenuStore.hideContextMenu();
});
</script>

<style lang="less">
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
      height: 38px;
      line-height: 38px;
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

    .tag-title {
      padding: 14px;
      font-size: 14px;
      border-top: 1px solid #eaeaea;
      display: flex;
      align-items: center;
      justify-content: space-between;

      &:hover {
        background-color: #EAEAEA;
      }

      &:active {
        background-color: #DFDFDF;
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

      &.active, &:active {
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
