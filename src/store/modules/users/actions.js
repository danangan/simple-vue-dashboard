import API_REQUEST from '@/utils/ajaxRequestHelper';
import queryString from 'query-string';

const actions = {
  async fetchUsers({ commit, state }, option = {}) {
    const optQuery = option.query ? option.query : {};
    const API_URL = `api/users?${queryString.stringify({ ...state.query, ...optQuery })}`;
    try {
      const idToken = await window.firebaseApp.auth().currentUser.getIdToken();
      const { data: { data: { users: { docs, ...pagination } } } } = await API_REQUEST(idToken).get(API_URL);
      commit('updateUsers', docs);
      commit('updatePagination', pagination);
    } catch (error) {
      console.log(error);
    }
    if (option.cb) {
      option.cb();
    }
  },

  async updateUser({ commit, dispatch }, { userId, option, cb }) {
    const API_URL = `api/users/${userId}`;
    try {
      const idToken = await window.firebaseApp.auth().currentUser.getIdToken();
      await API_REQUEST(idToken).put(API_URL, option);
      dispatch('setGlobalNotification', { status: true, type: 'success', message: 'User status updated' }, { root: true });
      dispatch('fetchUsers');
    } catch (error) {
      console.log(error);
    }
    cb();
  },
};

export default actions;
