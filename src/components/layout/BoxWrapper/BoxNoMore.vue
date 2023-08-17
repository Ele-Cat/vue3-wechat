<template>
  <div class="box-no-more"></div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.box-no-more {
  position: relative;
  width: 70px;
  padding: 0.5px 0;
  margin: 30px auto;
  background-color: #E4E4E4;

  &::before {
    content: "";
    position: absolute;
    top: -11px;
    left: 24px;
    width: 22px;
    height: 22px;
    border-radius: 22px;
    background-color: #F5F5F5;
  }

  &::after {
    content: "";
    position: absolute;
    top: -3px;
    left: 32px;
    width: 6px;
    height: 6px;
    border-radius: 6px;
    background-color: #E4E4E4;
  }
}
</style>