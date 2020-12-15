export default {
    setUser(state, user) {
        state.currentUser = user;
    },
    setFlash(state, flash) {
        state.flash = flash;
    },
    clearFlash(state) {
        state.flash = null;
    },
    tokenChecked(state) {
        state.tokenChecked = true;
    },
    setRedirectTo(state, path) {
        state.redirectTo = path;
    },
    updateName(state, name) {
        state.currentUser.name = name;
    }
}
