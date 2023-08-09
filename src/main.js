import { createApp } from "vue";
import pinia from "@/store/pinia";
import App from "./App.vue";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import "./global.less";
console.log(import.meta.env)
const app = createApp(App);

app.use(pinia);
app.use(Antd);
app.mount("#app");
