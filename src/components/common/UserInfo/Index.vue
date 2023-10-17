<template>
  <div class="user-info">
    <div class="info-top">
      <a-image-preview-group>
        <a-image :src="userInfo.avatar" alt="" :previewMask="false" />
      </a-image-preview-group>
      <div class="info-detail">
        <p class="name">{{ userInfo.name }}<i class="wechatfont" :class="['wechat-' + userInfo.gender]"></i></p>
        <p>微信号：{{ userInfo.phone }}</p>
        <p>地区：{{ userInfo.address }}</p>
      </div>
    </div>
    <div class="info-bottom">
      <button @click="sendMessage">发消息</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import useStore from '@/store';
const { useRelativeBoxStore } = useStore();
const emit = defineEmits()
const props = defineProps({
  user: {
    type: Object,
    default: () => { },
  },
  type: {
    type: String,
    default: "own",
  }
})

const userInfo = ref({})
watch(() => props.user, (newVal) => {
  userInfo.value = newVal;
}, {
  immediate: true,
  deep: true,
})

const sendMessage = () => {
  emit('send')
}
</script>

<style lang="less" scoped>
.user-info {
  .info-top {
    display: flex;
    padding-bottom: 18px;
    border-bottom: 1px solid #eaeaea;

    :deep(.ant-image-img) {
      width: 60px;
      height: 60px;
      border-radius: 6px;
    }

    .info-detail {
      flex: 1;
      margin-left: 12px;
      font-size: 12px;
      color: #999;

      p {
        margin-bottom: 4px;
      }

      .name {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #000;
        margin-top: 2px;
      }

      i {
        font-size: 18px;
        margin-left: 6px;

        &.wechat-male {
          color: #10aeff;
        }

        &.wechat-famale {
          color: #f37e7d;
        }
      }
    }
  }

  .info-bottom {
    display: flex;
    justify-content: center;
    padding-top: 24px;

    button {
      border: none;
      background-color: #07c160;
      color: #fff;
      width: 110px;
      height: 32px;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background-color: #38cd7f;
      }
    }
  }
}
</style>