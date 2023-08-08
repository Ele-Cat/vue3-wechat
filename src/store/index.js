import { useSystemStore } from "./modules/system";
import { useChatStore } from "./modules/chat";

const useStore = () => ({
  useSystemStore: useSystemStore(),
  useChatStore: useChatStore(),
});

export default useStore