import { useChatStore } from "./modules/chat";
import { useContextMenuStore } from "./modules/contextMenu";
import { useSystemStore } from "./modules/system";

const useStore = () => ({
  useChatStore: useChatStore(),
  useContextMenuStore: useContextMenuStore(),
  useSystemStore: useSystemStore(),
});

export default useStore