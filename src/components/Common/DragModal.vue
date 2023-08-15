<template>
  <div>
    <a-button type="primary" @click="showModal">Open Modal</a-button>
    <a-modal ref="modalRef" v-model:open="open" centered :closable="false" :wrap-style="modelStyle" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <template #title>
        <div ref="modalTitleRef" style="width: 100%; cursor: move">Draggable Modal</div>
      </template>
      <template #modalRender="{ originVNode }">
        <div :style="transformStyle">
          <component :is="originVNode" />
        </div>
      </template>
    </a-modal>
  </div>
</template>
<script setup>
  import { ref, computed, watch, watchEffect, defineProps } from 'vue';
  import { useDraggable } from '@vueuse/core';

  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    }
  })
  const emit = defineEmits()
  const open = ref(false);
  const modalTitleRef = ref(null);
  const modelStyle = {
    borderRadius: 0,
  }
  const showModal = () => {
    open.value = true;
  };
  const {
    x,
    y,
    isDragging,
  } = useDraggable(modalTitleRef);
  const handleOk = e => {
    open.value = false;
    emit('handleOk')
  };
  const startX = ref(0);
  const startY = ref(0);
  const startedDrag = ref(false);
  const transformX = ref(0);
  const transformY = ref(0);
  const preTransformX = ref(0);
  const preTransformY = ref(0);
  const dragRect = ref({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });
  watch([x, y], () => {
    if (!startedDrag.value) {
      startX.value = x.value;
      startY.value = y.value;
      const bodyRect = document.body.getBoundingClientRect();
      const titleRect = modalTitleRef.value.getBoundingClientRect();
      dragRect.value.right = bodyRect.width - titleRect.width;
      dragRect.value.bottom = bodyRect.height - titleRect.height;
      preTransformX.value = transformX.value;
      preTransformY.value = transformY.value;
    }
    startedDrag.value = true;
  });
  watch(isDragging, () => {
    if (!isDragging) {
      startedDrag.value = false;
    }
  });
  watchEffect(() => {
    if (startedDrag.value) {
      transformX.value = preTransformX.value + Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) - startX.value;
      transformY.value = preTransformY.value + Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) - startY.value;
    }
  });
  const transformStyle = computed(() => {
    return {
      transform: `translate(${transformX.value}px, ${transformY.value}px)`,
    };
  });
</script>

<style lang="less" scoped>
:deep(.ant-modal) {
  :deep(.ant-modal-content) {
    border-radius: 0;
  }
}
</style>