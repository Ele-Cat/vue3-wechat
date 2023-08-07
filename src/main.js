import { createApp } from "vue";
import { setupStore } from "@/store";
import App from "./App.vue";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";

const app = createApp(App);

setupStore(app);
app.use(Antd);
app.mount("#app");
