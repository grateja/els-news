const state = {

};

const mutations = {

};

const actions = {
    removeSlide(context, slideId) {
        return axios.post(`/api/slides/${slideId}/delete`).then((res, rej) => {
            return res;
        });
    }
};

const getters = {

};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
