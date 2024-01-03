import { createApp } from "vue";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import store from "./store";
import router from "./router/index";
import { loadFonts } from "./plugins/webfontloader";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faStar,
  faEdit,
  faTrash,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

library.add(faStarRegular, faStar, faEdit, faTrash, faCamera);
loadFonts();

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(vuetify)
  .use(router)
  .use(store)
  .mount("#app");
