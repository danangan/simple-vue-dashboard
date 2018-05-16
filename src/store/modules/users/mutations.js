const mutations = {
  updateUsers(state, newUsers) {
    state.users = newUsers;
  },
  updateSelected(state, newSelected) {
    state.selected = newSelected;
  },
  updatePagination(state, pagination) {
    state.pagination = { ...state.pagination, ...pagination };
  },
  updateQuery(state, query) {
    state.query = { ...state.query, ...query };
  },
  toggleUserDetail(state) {
    state.showDetailUser = !state.showDetailUser;
  },
};

export default mutations;
