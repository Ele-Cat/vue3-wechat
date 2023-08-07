<template>
  <div class="whchat">
    <ToolBar />
    <Users />
    <Chat />
  </div>
</template>

<script setup>
import ToolBar from './ToolBar.vue'
import Users from './Users.vue'
import Chat from './Chat.vue'

</script>

<style>
.whchat {
  display: flex;
  height: 660px;
  box-shadow: 0 0 100px #333;
}
</style>