export default {
    routes: [
        {
          path: '/',
          component: () => import('./pages/index/index.vue')
        },
        {
          path: '/message',
          component: () => import('./components/message.vue')
        }
    ]
};