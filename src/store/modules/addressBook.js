import { defineStore } from "pinia";

export const useAddressBookStore = defineStore("addressBook", {
  state: () => {
    return {
      addressBookList: [],
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
