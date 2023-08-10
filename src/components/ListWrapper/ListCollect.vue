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
        <p class="tag-title"><i class="wechatfont wechat-tag"></i>标签</p>
      </div>
    </div>

    <div class="tag-box scroll-no-bar">
      <div
        v-for="(tag, index) in tagList"
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
import { reactive, ref } from "vue";
import useStore from "@/store";
import useDetectOutsideClick from "@/hooks/useDetectOutsideClick";
const { useAddressBookStore, useSystemStore, useContextMenuStore } = useStore();

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

const tagList = reactive([
  {
    id: "1",
    title: "标签A",
  },
  {
    id: "2",
    title: "标签B",
  },
  {
    id: "3",
    title: "标签C",
  },
  {
    id: "4",
    title: "标签D",
  },
  {
    id: "5",
    title: "标签E",
  },
  {
    id: "6",
    title: "标签F",
  },
  {
    id: "7",
    title: "标签G",
  },
  {
    id: "8",
    title: "标签H",
  },
]);

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
        background-color: #F0F0F0;
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
      padding: 14px 14px 0 14px;
      margin-bottom: 10px;
      font-size: 14px;
      border-top: 1px solid #eaeaea;
      display: flex;
      align-items: center;

      .wechatfont {
        font-size: 18px;
        margin-right: 10px;
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

      &.active {
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
