/*
 * @Author: aFei
 * @Date: 2023-09-20 13:38:58
*/
/*
 * @LastEditors: aFei
 * @LastEditTime: 2023-10-09 14:32:12
*/
const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('view/index.vue'),
      children: [
        {
          path: 'a',
          name: 'a',
          component: () => import('view/a.vue')
        },
        {
          path: 'b',
          name: 'b',
          redirect: { name: 'ba' },
          children: [
            {
              path: 'ba',
              name: 'ba',
              component: () => import('view/ba.vue')
            },
            {
              path: 'bb',
              name: 'bb',
              component: () => import('view/bb.vue')
            },
            {
              path: 'bc',
              name: 'bc',
              component: () => import('view/bc.vue')
            }
          ]
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        top: 0,
        behavior: 'smooth'
      }
    }
  }
});
export default router;