import { createApp } from 'vue'
import App from "/src/App.vue"
// import App from "/src/AppBak.vue"
import router from "/src/router/index.js";
import store from "@/store/index.js";
import VueI18n from '/src/locales/index.js'
import 'modern-normalize'
if(location.hostname==='www.artx.land' || location.hostname==='artx.land'){
    location.href='https://www.heartx.art/'+location.search+location.hash;
}
if (typeof window.global === "undefined") {
  window.global = window;
}
createApp(App).use(store).use(VueI18n).use(router).mount('#app');
