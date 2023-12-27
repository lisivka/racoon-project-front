import {createRouter, createWebHistory} from 'vue-router';
import {ROUTER_DATA} from '@/constants';

const routes = [
  {
    path: '',
    component: () => import('@/components/header/header'),
    children: [
      ...ROUTER_DATA.map(({ path, pathToComponent }) => {
        return {
          path,
          component: () => import(`@/${pathToComponent}`),
        };
      })
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
