import router from './router.js';
import store from './store/index.js';

router.push(location.pathname);
store.dispatch('auth/check').then((res) => {
    console.log('token checked', res);
    if(!res.data) {
        if(router.currentRoute.matched.some(route => route.meta.requiresAuth)) {
            console.log('anauthorized! redirecting to login page');
            router.push('/login');
        }
    } else if(router.currentRoute.path == '/login') {
        location = '/manage';
    }

    let redirectTo = store.getters['redirectTo'];
    if(redirectTo) {
        console.log('redirecting to ', redirectTo);
        router.push(redirectTo);
    }
}).catch(err => {
    console.log('something happende', this);
});

axios.interceptors.response.use(null, err => {
    if(err && err.response && err.response.status == 401) {
        store.commit('setFlash', {message: 'Unauthorized', color: 'error'});
    }
    return Promise.reject(err);
});

router.beforeEach((to, from, next) => {
    let tokenChecked = store.getters.isTokenChecked;
    if(!tokenChecked) {
        console.log('Routing is disabled. token is currently checking...')
        return;
    }

    let user = store.getters.currentUser;

    if(to.matched.some(route => route.meta.requiresAuth) && !user) {
        router.push({path: '/login'});
        return;
    }
    if(to.matched.some(route => route.meta.facilitators) && user.is_facilitator) {
        // check if facilitator has role
        if(!to.matched.some(route => {
            if(!route.meta.facilitators) return false;
            return route.meta.facilitators.some(role => role == user.account_type)
        })) {
            alert('You do not have permision to access this page');
            return;
        }
    }

    if(to.matched.some(route => route.meta.facilitators) && !user.is_facilitator) {

        console.log('requires facilitator`s authorization authentication');
        store.commit('setFlash', {message: 'The page you are trying to access needs facilitator`s authorization', color: 'warning'});
        return;
    }

    if((to.path == '/login' || to.path == '/signup') && user) {
        router.push('/');
    }

    next();
});
