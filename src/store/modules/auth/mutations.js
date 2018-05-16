const mutations = {
  setUserData(state, { currentUser, isAuthenticated }) {
    state.currentUser = currentUser;
    state.isAuthenticated = isAuthenticated;
  },
  setUserAuthStatus(state, data) {
    state.isAuthenticated = data;
  },
  updateToken(state, idToken) {
    state.idToken = idToken;
  },
};

export default mutations;
