import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

import mutations from './mutations.js';
import actions from './actions.js';

import auth from './modules/auth.js';
import event from './modules/event.js';
import file from './modules/file.js';
import slide from './modules/slide.js';
import video from './modules/video.js';
import announcement from './modules/announcement.js';

import queryString from '../helpers/UrlHelper.js';

export default new Vuex.Store({
    state: {
        currentUser: null,
        flash: null,
        tokenChecked: false,
        redirectTo: {
            path: location.pathname,
            query: queryString
        }
    },
    getters: {
        currentUser(state) {
            return state.currentUser;
        },
        getFlash(state) {
            return state.flash;
        },
        isTokenChecked(state) {
            return state.tokenChecked;
        },
        redirectTo(state) {
            return state.redirectTo;
        }
    },
    mutations,
    actions,
    modules: {
        auth,
        event,
        file,
        slide,
        announcement,
        video
    }
});
