import { defineStore } from "pinia";

export const useAddressBookStore = defineStore("addressBook", {
  state: () => {
    return {
      addressBookList: [],
      flatAddressBookList: [],
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
