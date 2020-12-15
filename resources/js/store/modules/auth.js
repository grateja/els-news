const state = {
    loading: false
};

const getters = {
    // getCurrentUser(state) {
    //     return state.currentUser;
    // },
    // isTokenChecked(state) {
    //     return state.isTokenChecked;
    // },
    isLoading(state) {
        return state.loading;
    }
};

const actions = {
    login(context, request) {
        context.commit('setLoadingState', true);
        return axios.post('/api/auth/login', request.user).then((res, rej) => {
            context.commit('setUser', res.data.user, {root: true});
            context.commit('setToken', res.data.token.accessToken);
            context.commit('setLoadingState', false);
            return res;
        }).catch(err => {
            context.commit('setLoadingState', false);
            return Promise.reject(err);
        });
    },
    check(context, request) {
        return axios.post('/api/auth/check').then((res, rej) => {
            context.commit('setUser', res.data.user, {root: true});
            context.commit('tokenChecked', true, {root: true});
            return res;
        }).catch(err => {
            context.commit('tokenChecked', true, {root: true});
            return Promise.reject(err);
        });
    },
    logout(context) {
        return axios.post('/api/auth/logout').then((res, rej) => {
            context.commit('setUser', null, {root: true});
            context.commit('clearToken');
        })
    }
};

const mutations = {
    // setUser(state, user) {
    //     state.currentUser = user;
    // },
    // setIsTokenChecked(state, status) {
    //     state.isTokenChecked = status;
    // },
    setToken(state, token) {
        console.log('token set', token);
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
    clearToken(state) {
        localStorage.removeItem('token');
        axios.defaults.headers.common['Authorization'] = null;
    },
    setLoadingState(state, status) {
        state.loading = status;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
