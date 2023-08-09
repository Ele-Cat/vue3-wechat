import { defineStore } from "pinia";

export const useAddressBookStore = defineStore("addressBook", {
  state: () => {
    return {
      addressBookList: [
        {
          id: "1",
          name: "测试群组1测试群组1测试群组1测试群组1测试群组1测试群组1",
          type: "group",
          avatar: "http://img.adoutu.com/article/1606320535770.gif",
        },
        {
          id: "2",
          name: "阿姨阿姨阿姨阿姨阿姨阿姨阿姨阿姨阿姨阿姨",
          type: "friend",
          avatar: "http://img.adoutu.com/article/1606320535770.gif",
        },
        {
          id: "3",
          name: "小美",
          type: "friend",
          avatar: "http://img.adoutu.com/article/1606320535770.gif",
        },
      ],
      activeAddressBook: "",
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
