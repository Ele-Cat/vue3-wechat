import { useSystemStore } from "./modules/system";
import { useChatStore } from "./modules/chat";
import { useAddressBookStore } from "./modules/addressBook";
import { useCollectStore } from "./modules/collect";
import { useContextMenuStore } from "./modules/contextMenu";
import { useRelativeBoxStore } from "./modules/relativeBox";
import { useUserInfoStore } from "./modules/userInfo";

// 将store统一到一起再分发
const useStore = () => ({
  useSystemStore: useSystemStore(),
  useChatStore: useChatStore(),
  useAddressBookStore: useAddressBookStore(),
  useCollectStore: useCollectStore(),
  useContextMenuStore: useContextMenuStore(),
  useRelativeBoxStore: useRelativeBoxStore(),
  useUserInfoStore: useUserInfoStore(),
});

export default useStore