import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { gsap } from "gsap";

createApp(App).use(router).use(store).use(gsap).mount("#app");
