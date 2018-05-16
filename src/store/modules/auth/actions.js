/* eslint-disable no-unused-vars */
import router from '@/router';
import API_REQUEST from '@/utils/ajaxRequestHelper';

const actions = {
  async login({ commit, dispatch }, [{ email, password, keepMeSignedIn }, cb]) {
    const API_URL = 'api/users/getcurrentuser';
    const requestOption = {
      customHeader: false,
    };
    const dataToPost = {
      email,
      password,
    };
    try {
      // sign in to api to get idToken
      const signedInUser = await window.firebaseApp.auth().signInWithEmailAndPassword(email, password);
      if (signedInUser) {
        const idToken = await window.firebaseApp.auth().currentUser.getIdToken();
        const { data: { data: { currentUser } } } = await API_REQUEST(idToken).get(API_URL);

        // check the user role
        if (currentUser.role !== 'superadmin' && currentUser.role !== 'admin' && currentUser.role !== 'advisor') {
          throw new Error('You are not allowed to log in');
        }

        // set persistence
        await window.firebaseApp.auth().setPersistence(keepMeSignedIn ? 'local' : 'session');

        // set user
        commit('setUserData', { currentUser, isAuthenticated: true });

        // store currentUserID in localStorage
        localStorage.setItem('userId', currentUser._id);

        // dispatch global notification
        dispatch('setGlobalNotification', { status: true, type: 'success', message: 'You are logged in' });

        // redirect
        switch (currentUser.role) {
          case 'admin':
          case 'superadmin':
            router.push('/manage-user');
            break;
          case 'advisor':
            router.push('/manage-thread');
            break;
          default:
            break;
        }
      }
    } catch (err) {
      dispatch('setGlobalNotification', { status: true, type: 'error', message: err.message });
    }
    cb();
  },
  // auto login
  async autoLogin({ commit, dispatch, state }, idToken) {
    // update idToken
    commit('updateToken', idToken);
    // get idToken from localstorage
    const userId = localStorage.getItem('userId');

    // only do this if user is authenticated and userId is exist
    if (!state.isAuthenticated && userId) {
      // create url
      const API_URL = `api/users/${userId}`;
      try {
        const { data: { data: { currentUser } } } = await API_REQUEST().get(API_URL);
        // set user data
        commit('setUserData', { currentUser, isAuthenticated: true });
        // set user
        dispatch('setGlobalNotification', { status: true, type: 'success', message: 'You are logged in' });
        // redirect
        switch (currentUser.role) {
          case 'admin':
          case 'superadmin':
            router.push('/manage-user');
            break;
          case 'advisor':
            router.push('/manage-thread');
            break;
          default:
            break;
        }
      } catch (err) {
        console.log(err);
      }
    }
  },
  // log out
  async logOut({ commit, dispatch }) {
    commit('setGlobalLoader', { status: true, message: 'Logging out...' });

    try {
      // sign out in firebase
      await window.firebaseApp.auth().signOut();
      commit('setUserData', { userData: {}, isAuthenticated: false });
      // redirect to login page
      router.push('/login');
      dispatch('setGlobalNotification', { status: true, type: 'success', message: 'You are logged out' });
      // removing userid from localstorage
      localStorage.removeItem('userId');
    } catch (err) {
      console.log(err);
    }
    commit('resetGlobalLoader');
  },
  register() {

  },
};

export default actions;
