<template>
  <div class="wechat" :style="wechatStyle" ref="wechatRef" :handle="handle">
    <ToolBar ref="handle" />
    <ListWrapper />
    <BoxWrapper />
    <ContextMenu />
    <ResizeContainer />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { listenGlobalKeyDown } from "@/utils/shortcutKey";
import useStore from "@/store";
const { useSystemStore } = useStore();
import ToolBar from "./layout/ToolBar/Index.vue";
import ListWrapper from "./layout/ListWrapper/Index.vue";
import BoxWrapper from "./layout/BoxWrapper/Index.vue";
import ContextMenu from "./layout/ContextMenu/Index.vue";
import ResizeContainer from "./layout/ResizeContainer/Index.vue";

const handle = ref();
let wechatRef = ref();

listenGlobalKeyDown();

const { innerWidth, innerHeight } = window;
useSystemStore.windows.left = useSystemStore.windows.left || (innerWidth - useSystemStore.windows.width) / 2
useSystemStore.windows.top = useSystemStore.windows.top || (innerHeight - useSystemStore.windows.height) / 2
const wechatStyle = ref({
  width: `${useSystemStore.windows.width}px`,
  height: `${useSystemStore.windows.height}px`,
  left: `${useSystemStore.windows.left}px`,
  top: `${useSystemStore.windows.top}px`,
});

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
</script>

<style lang="less" scoped>
.wechat {
  position: fixed;
  display: flex;
  /* width: 850px;
  height: 660px; */
  box-shadow: 0 0 6px #999;
}
</style>
