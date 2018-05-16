const actions = {
  setGlobalNotification({ commit }, payload) {
    commit('setGlobalNotification', payload);
    setTimeout(() => {
      commit('resetGlobalNotification');
    }, 2000);
  },
};

export default actions;
