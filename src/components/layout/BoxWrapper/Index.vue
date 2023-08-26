<template>
  <div class="chat">
    <BoxHeader />

    <BoxLocked v-if="useSystemStore.isLocked" />
    <BoxChat v-else-if="useSystemStore.activeMenu === 'message'" />
    <BoxAddressBook v-else-if="useSystemStore.activeMenu === 'users'" />
    <BoxCollect v-else-if="useSystemStore.activeMenu === 'collect'" />
  </div>
</template>

<script setup>
import BoxHeader from './BoxHeader.vue';
import BoxChat from './BoxChat.vue';
import BoxAddressBook from './BoxAddressBook.vue';
import BoxCollect from './BoxCollect.vue';
import BoxLocked from "./BoxLocked.vue";

import useStore from "@/store";
const { useSystemStore } = useStore();
</script>

<style lang="less" scoped>
.chat {
  background-color: #f5f5f5;
  // width: 550px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>