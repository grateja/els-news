import FormHelper from '../../helpers/FormHelper.js';
const state = {
    currentAnnouncement: null,
    errors: FormHelper,
    isSaving: false,
    isDeleting: false
};

const mutations = {
    setAnnouncement(state, announcement) {
        state.currentAnnouncement = announcement;
        console.log('announcement', announcement);
    },
    setErrors(state, errors) {
        state.errors.errors = errors;
    },
    clearErrors(state, key) {
        state.errors.clear(key);
    },
    setSavingStatus(state, status) {
        state.isSaving = status;
    },
    setDeletingStatus(state, status) {
        state.isDeleting = status;
    }
};

const actions = {
    loadAnnouncement(context) {
        return axios.get('/api/announcements/get-announcement').then((res, rej) => {
            console.log(res.data)
            context.commit('setAnnouncement', res.data.announcement);
            return res;
        });
    },
    createAnnouncement(context, request) {
        context.commit('setSavingStatus', true);
        context.commit('clearErrors');
        return axios.post('/api/announcements/create', request.announcement).then((res, rej) => {
            context.commit('setSavingStatus', false);
            return res;
        }).catch(err => {
            console.log(err.response.data.errors)
            context.commit('setErrors', err.response.data.errors);
            context.commit('setSavingStatus', false);
            return Promise.reject(err);
        });
    },
    updateAnnouncement(context, request) {
        context.commit('setSavingStatus', true);
        context.commit('clearErrors');
        return axios.post(`/api/announcements/${request.id}/update`, request.announcement).then((res, rej) => {
            context.commit('setSavingStatus', false);
            return res;
        }).catch(err => {
            context.commit('setErrors', err.response.data.errors);
            context.commit('setSavingStatus', false);
            return Promise.reject(err);
        });
    },
    deleteAnnouncement(context, id) {
        context.commit('setDeletingStatus', true);
        context.commit('clearErrors');
        return axios.post(`/api/announcements/${id}/delete`).then((res, rej) => {
            return res;
        });
    }
};

const getters = {
    getAnnouncement(state) {
        return state.currentAnnouncement;
    },
    getErrors(state) {
        return state.errors;
    },
    getIsSaving(state) {
        return state.isSaving;
    },
    getIsDeleting(state) {
        return state.isDeleting;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
