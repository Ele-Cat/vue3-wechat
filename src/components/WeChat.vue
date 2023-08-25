<template>
  <div class="wechat" :style="wechatStyle">
    <ToolBar v-if="!isLocked" />
    <ListWrapper v-if="!isLocked" />
    <BoxWrapper />
    <ContextMenu />
    <ResizeContainer />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { listenGlobalKeyDown } from "@/utils/shortcutKey";
import useStore from "@/store";
const { useSystemStore } = useStore();
import ToolBar from "./layout/ToolBar/Index.vue";
import ListWrapper from "./layout/ListWrapper/Index.vue";
import BoxWrapper from "./layout/BoxWrapper/Index.vue";
import ContextMenu from "./common/ContextMenu/Index.vue";
import ResizeContainer from "./common/ResizeContainer/Index.vue";

// 监听全局键盘事件
onMounted(() => {
  listenGlobalKeyDown();
})

const { innerWidth, innerHeight } = window;
useSystemStore.windows.left = useSystemStore.windows.left || (innerWidth - useSystemStore.windows.width) / 2
useSystemStore.windows.top = useSystemStore.windows.top || (innerHeight - useSystemStore.windows.height) / 2
// 初始化窗口样式
const wechatStyle = ref({});

// 监听窗口变化并赋值
watch(
  () => useSystemStore.windows,
  (newVal) => {
    const { width, height, left, top } = newVal
    wechatStyle.value = Object.assign(
      {},
      {
        width: `${width}px`,
        height: `${height}px`,
        left: `${left}px`,
        top: `${top}px`,
      }
    );
  },
  {
    immediate: true,
    deep: true,
  }
);

// 监听窗口最小化并赋值
watch(
  () => useSystemStore.windowState.status,
  (newVal, oldVal) => {
    if (newVal === "minimize") {
      wechatStyle.value = Object.assign(
        {},
        {
          overflow: "hidden",
          transition: "all .12s cubic-bezier(0.5, 0, 0.9, 1)",
          width: "0",
          height: "0",
          left: "54px",
          bottom: "15px",
        }
      );
    } else if (newVal === "maximize") {
      wechatStyle.value = Object.assign(
        {},
        {
          overflow: "hidden",
          transition: oldVal === "minimize" ? "all 0s" : "all .12s",
          width: "100vw",
          height: "calc(100vh - 30px)",
          left: "0px",
          top: "0px",
        }
      );
    } else if (newVal === "closed") {
      wechatStyle.value = Object.assign(
        {},
        {
          overflow: "hidden",
          transition: "all .12s cubic-bezier(0.5, 0, 0.9, 1)",
          width: "0",
          height: "0",
          right: "90px",
          bottom: "15px",
        }
      );
    } else {
      wechatStyle.value = Object.assign(
        {},
        {...wechatStyle.value},
        {...useSystemStore.windowState.prevWindows},
        {transition: "all 0s",}
      );
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

const isLocked = ref(false)
watch(() => useSystemStore.isLocked, (newVal) => {
  isLocked.value = newVal
}, {
  immediate: true,
  deep: true,
})
</script>

<style lang="less" scoped>
.wechat {
  position: fixed;
  display: flex;
  box-shadow: 0 0 4px #333;
}
</style>
