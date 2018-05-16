const mutations = {
  setGlobalNotification(state, { status, type, message }) {
    state.globalNotificationStatus = status;
    state.globalNotificationType = type;
    state.globalNotificationMessage = message;
  },
  resetGlobalNotification(state) {
    state.globalNotificationStatus = false;
    state.globalNotificationType = '';
    state.globalNotificationMessage = '';
  },
  setGlobalLoader(state, { status, message }) {
    state.globalLoaderStatus = status;
    state.globalLoaderMessag = message;
  },
  resetGlobalLoader(state) {
    state.globalLoaderStatus = false;
    state.globalLoaderMessag = '';
  },
};

export default mutations;
