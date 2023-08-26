<template>
  <div class="we-label-box">
    <p
      class="we-label"
      :style="{ width: labelWidth + 'px', textAlign: labelAlign }"
    >
      {{ label }}
    </p>
    <div class="slot">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  labelWidth: {
    type: Number,
    default: 108,
  },
  labelAlign: {
    type: String,
    default: "center",
  },
});
</script>

<style lang="less" scoped>
.we-label-box {
  display: flex;
  .we-label {
    line-height: 32px;
  }
  .slot {
    flex: 1;
  }
}
</style>
