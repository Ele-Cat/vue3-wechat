import { defineStore } from "pinia";

export const useAddressBookStore = defineStore("addressBook", {
  state: () => {
    return {
      addressBookList: [], // 通讯录列表（通过拼音排序）
      flatAddressBookList: [], // 平铺的通讯录列表（未排序），用来方便做交互
      activeAddressBook: "", // 当前聚焦的通讯录对象id
    };
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
      },
    ],
  },
});
