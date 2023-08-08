<template>
  <div class="chat">
    <div class="chat-title">
      <p>开黑小分队(5)</p>
    </div>
    <div class="chat-box">
      聊天内容
    </div>
    <div class="input-box">
      输入框
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="less">
.chat {
  background-color: #F5F5F5;
  width: 550px;
  display: flex;
  flex-direction: column;

  .chat-title {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #E7E7E7;
    padding: 0 24px;
  }

  .chat-box {
    flex: 1;
  }

  .input-box {
    height: 120px;
    border-top: 1px solid #ECECEC;
  }
}
</style>