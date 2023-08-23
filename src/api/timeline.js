import { getAction } from "./manage";

// 获取好友列表
export function getVideoApi(parameter) {
  return getAction("https://v.api.aa1.cn/api/api-girl-11-02/index.php", {
    type: "json"
  });
}
