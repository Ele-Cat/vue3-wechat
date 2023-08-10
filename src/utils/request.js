//导入axios
import axios from "axios";

//使用axios下面的create([config])方法创建axios实例，其中config参数为axios最基本的配置信息。
const service = axios.create({
  timeout: 9000, //请求超时设置，单位ms
});

//导出我们建立的axios实例模块，ES6 export用法
export {
  service as axios
};
