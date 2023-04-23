import { createApp } from 'vue'
import App from "./App.vue"
import store from "@/store/index.js";
import VueI18n from '/src/locales/index.js'
import 'modern-normalize'
if(location.hostname==='www.artx.land' || location.hostname==='artx.land'){
    location.href='https://www.heartx.art/'+location.search+location.hash;
}
if (typeof window.global === "undefined") {
  window.global = window;
}
createApp(App).use(store).use(VueI18n).mount('#app');
