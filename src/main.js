import Vue from 'vue';
import {
  Vuetify,
  VApp,
  VAvatar,
  VAlert,
  VBadge,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VDialog,
  VIcon,
  VGrid,
  VToolbar,
  VForm,
  VChip,
  VMenu,
  VTextField,
  VCard,
  VCheckbox,
  VProgressCircular,
  VSnackBar,
  VDivider,
  VDataTable,
  VPagination,
  VTooltip,
  VSelect,
  VProgressLinear,
  transitions,
} from 'vuetify';
import vSelect from 'vue-select';
import App from './App';
import router from './router';
import store from './store';
import '../node_modules/vuetify/src/stylus/app.styl';
import '../node_modules/mdi/scss/materialdesignicons.scss';

/* eslint-disable no-unused-vars */

// Init Vuetify
Vue.use(Vuetify, {
  components: {
    VApp,
    VBadge,
    VAvatar,
    VAlert,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VChip,
    VToolbar,
    VDialog,
    transitions,
    VForm,
    VMenu,
    VTextField,
    VCard,
    VCheckbox,
    VProgressCircular,
    VSnackBar,
    VDivider,
    VDataTable,
    VPagination,
    VTooltip,
    VSelect,
    VProgressLinear,
  },
});

// registering vue-select
Vue.component('vs-select', vSelect);

Vue.config.productionTip = false;

/* eslint-disable no-new */

// creating the new Vue instance
const $app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});

window.$app = $app;
