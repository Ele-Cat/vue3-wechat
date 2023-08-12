import { useSystemStore } from "./modules/system";
import { useChatStore } from "./modules/chat";
import { useAddressBookStore } from "./modules/addressBook";
import { useCollectStore } from "./modules/collect";
import { useContextMenuStore } from "./modules/contextMenu";

const useStore = () => ({
  useSystemStore: useSystemStore(),
  useChatStore: useChatStore(),
  useAddressBookStore: useAddressBookStore(),
  useCollectStore: useCollectStore(),
  useContextMenuStore: useContextMenuStore(),
});

export default useStore