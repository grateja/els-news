const state = {

};

const mutations = {

};

const actions = {
    uploadSlides(context, request) {
        return axios.post('/api/files/upload-slides/' + request.eventId,
            request.formData,
            {
                headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res, rej) => {
            return res;
            // console.log(res.data);
        });
    },
    uploadVideo(context, request) {
        return axios.post('/api/files/upload-video/' + request.eventId,
            request.formData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: e => {
                    console.log(e.loaded);
                }
        }).then((res, rej) => {
            return res;
            // console.log(res.data);
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
