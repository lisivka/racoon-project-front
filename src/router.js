
import { createRouter, createWebHistory } from "vue-router";
import HomePage from './pages/HomePage.vue'
import AllLotsPage from "./pages/AllLotsPage.vue";
import AuctionPage from "./pages/AuctionPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue"


const routes = [
  {
    path: "/",
    component: HomePage,
    name: "homepage",
  },
  {
    path: "/allLots",
    component: AllLotsPage,
    name: "all-lots",
  },
  {
    path: "/auctions",
    component: AuctionPage,
    name: "auctions",
  },
  {
    path:  "/:catchAll(.*)",
    component: NotFoundPage,
    name: "not-found-page",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
 
});

export default router;
