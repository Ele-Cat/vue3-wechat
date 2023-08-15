import { createApp } from "vue";
import pinia from "@/store/pinia";
import App from "./App.vue";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import "./global.less";

import ui from "@/components/Common";
import "@/utils/mock.js";

const app = createApp(App);

app.use(pinia);
app.use(Antd);
app.use(ui);
app.mount("#app");
