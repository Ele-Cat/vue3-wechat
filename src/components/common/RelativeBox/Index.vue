<template>
  <div class="we-relative-box">
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.we-relative-box {
  position: fixed;
  top: 0;
  left: 0;
}
</style>