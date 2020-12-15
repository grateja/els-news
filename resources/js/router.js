import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

let routes = [
    {
        path: '/login',
        component: require('./views/auth/Login.vue').default
    },
    {
        path: '/manage',
        component: require('./views/manage/Index.vue').default,
        children: [
        ],
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/events',
        component: require('./views/events/Index.vue').default,
        children: [
            {
                path: ':id',
                component: require('./views/events/Event.vue').default
            },
            {
                path: '/',
                component: require('./views/events/EventsList.vue').default
            }
        ],
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/announcements',
        component: require('./views/announcements/Index.vue').default,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/news',
        component: require('./views/news/Index.vue').default,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '*',
        component: require('./views/defaults/_404.vue').default
    }
];

export default new VueRouter({
    mode: 'history',
    routes
});
