<template>
  <div class="user-list scroll-no-bar" ref="componentRef">
    <div class="user-manage">
      <p><i class="wechatfont wechat-usermanage"></i>通讯录管理</p>
    </div>
    <div class="user-box">
      <div class="user-title">群聊</div>
      <div v-for="group in groupList" :key="group.id" class="custom-item user-item" @contextmenu="rightClicked($event)">
        <img :src="group.avatar" alt="" class="user-avatar">
        <p class="user-name">{{ group.name }}</p>
      </div>
    </div>
    <div class="user-box">
      <div class="user-title">A</div>
      <div v-for="friend in friendList" :key="friend.id" class="custom-item user-item" @contextmenu="rightClicked($event)">
        <img :src="friend.avatar" alt="" class="user-avatar">
        <p class="user-name">{{ friend.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {getFriendList} from "@/api/manage"
import useStore from '@/store'
import useDetectOutsideClick from '@/hooks/useDetectOutsideClick'
const { useAddressBookStore, useSystemStore, useContextMenuStore } = useStore()

const groupList = useAddressBookStore.addressBookList.filter(addressBook => addressBook.type === 'group')
// const friendList = useAddressBookStore.addressBookList.filter(addressBook => addressBook.type === 'friend')
const friendList = ref([])

const rightClicked = (e) => {
  e.preventDefault();
  useContextMenuStore.showContextMenu(e.clientY, e.clientX);
}

const componentRef = ref()
useDetectOutsideClick(componentRef, () => {
  useSystemStore.activeMenu === 'users' && useContextMenuStore.hideContextMenu()
})

getFriendList().then(res => {
  renderFriends(res.data.data)
})

function renderFriends(data) {
  if (data.length == 0) return;
  if (!String.prototype.localeCompare) return null;
  const friendFlatLists = data.sort((a, b) => a['name'].localeCompare(b['name']))
  const letterArr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  let segs = []; // 存放数据
  let res = {};
  let curr = null;
  const zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split("");
  const re = /[^\u4e00-\u9fa5]/;//中文正则
  const pattern = new RegExp("[`\\-~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？12345678990]"); //特殊符号
  letterArr.forEach((letter, i) => {
    curr = {
      initial: '', //字母
      data: [] ,  //数据
    };
    friendFlatLists.map(friend => {
      // 特殊字符
      if (pattern.test(friend.name[0])) {
        if ((!zh[i - 1] || zh[i - 1].localeCompare(friend.name) <= 0) && friend.name.localeCompare(zh[i]) == -1) {
          curr.data.push(friend);
        }
      }

      // 判断首个字是否是中文 
      if (re.test(friend.name[0])) {
        // 英文 
        if (friend.name[0].toUpperCase() == letter) {
          curr.data.push(friend);
        }
      } else {
        // 中文
        if ((!zh[i - 1] || zh[i - 1].localeCompare(friend.name) <= 0) && friend.name.localeCompare(zh[i]) == -1) {
          curr.data.push(friend);
        }
      }
    })

    if ( curr.data.length) {
      curr.initial = letterArr[i]
      segs.push(curr);
      curr.data.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });             
    }
  })
  res.segs = Array.from(new Set(segs)) //去重
  console.log(res);
  friendList.value = data
}
</script>

<style lang="less">
.user-list {
  background-color: #E7E6E5;
  height: 100%;
  overflow-y: scroll;

  .user-manage {
    padding: 14px;
    
    p {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #FFFFFF;
      height: 38px;
      line-height: 38px;
      text-align: center;
      cursor: pointer;
      font-size: 14px;

      i {
        font-size: 18px;
        margin-right: 6px;
      }
    }
  }

  .user-box {
    border-bottom: 1px solid #E0DDDB;

    .user-title {
      font-size: 12px;
      color: #999;
      padding: 14px 14px 0 14px;
    }

    .user-item {
      display: flex;
      align-items: center;
      padding: 14px;

      .user-avatar {
        width: 34px;
        height: 34px;
        border-radius: 2px;
      }

      .user-name {
        font-size: 14px;
        margin-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: 1;
      }
    }
  }
}
</style>