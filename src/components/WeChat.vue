<template>
  <div class="whchat">
    <ToolBar />
    <ListWrapper />
    <ChatBox />
  </div>
</template>

<script setup>
import ToolBar from './ToolBar/Index.vue'
import ListWrapper from './ListWrapper/Index.vue'
import ChatBox from './ChatBox/Index.vue'

</script>

<style>
.whchat {
  display: flex;
  height: 660px;
  box-shadow: 0 0 100px #333;
}
</style>