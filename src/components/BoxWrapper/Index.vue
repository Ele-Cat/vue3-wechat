<template>
  <div class="chat">
    <BoxHeader />
    
    <BoxChat v-if="systemStore.activeMenu === 'message'" />
    <BoxAddressBook v-if="systemStore.activeMenu === 'users'" />
    <BoxCollect v-if="systemStore.activeMenu === 'collect'" />
  </div>
</template>

<script setup>
import BoxHeader from './BoxHeader.vue';
import BoxChat from './BoxChat.vue';
import BoxAddressBook from './BoxAddressBook.vue';
import BoxCollect from './BoxCollect.vue';

import { useSystemStore } from '@/store/modules/system'
const systemStore = useSystemStore()

</script>

<style lang="less">
.chat {
  background-color: #f5f5f5;
  width: 550px;
  display: flex;
  flex-direction: column;
}
</style>