import { axios } from "@/utils/request";

const api = {
  friend: "/mock/api/friend",
  group: "/mock/api/group",
};

export default api;

//post
export function postAction(url, parameter) {
  return axios({
    url: url,
    method: "post",
    data: parameter,
  });
}

//post method= {post | put}
export function httpAction(url, parameter, method) {
  return axios({
    url: url,
    method: method,
    data: parameter,
  });
}

//get
export function getAction(url, parameter) {
  return axios({
    url: url,
    method: "get",
    params: parameter,
  });
}

//deleteAction
export function deleteAction(url, parameter) {
  return axios({
    url: url,
    method: "delete",
    params: parameter,
  });
}

export function getFriendList(parameter) {
  return axios({
    url: api.friend,
    method: "get",
    params: parameter,
  });
}

export function getGroupList(parameter) {
  return axios({
    url: api.group,
    method: "get",
    params: parameter,
  });
}
