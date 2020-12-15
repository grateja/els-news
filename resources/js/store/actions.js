export default {
    checkAll(context) {
        return axios.get('/api/check-all').then((res, rej) => {
            console.log('changed', res.data);
            setTimeout(function() {
                context.dispatch('checkAll');
            }, 5000);
        });
    }
}
