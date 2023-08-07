<template>
  <div class="whchat">
    <ToolBar />
    <ListWrapper />
    <ChatBox />
  </div>
</template>

<script setup>
import ToolBar from './layout/ToolBar.vue'
import ListWrapper from './layout/ListWrapper/Index.vue'
import ChatBox from './layout/ChatBox.vue'

</script>

<style>
.whchat {
  display: flex;
  height: 660px;
  box-shadow: 0 0 100px #333;
}
</style>