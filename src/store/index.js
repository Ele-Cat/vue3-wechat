import { useChatStore } from "./modules/chat";
import { useContextMenuStore } from "./modules/contextMenu";
import { useAddressBookStore } from "./modules/addressBook";
import { useSystemStore } from "./modules/system";

const useStore = () => ({
  useChatStore: useChatStore(),
  useContextMenuStore: useContextMenuStore(),
  useAddressBookStore: useAddressBookStore(),
  useSystemStore: useSystemStore(),
});

export default useStore