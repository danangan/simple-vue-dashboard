<template>
  <v-app>
    <router-view/>
    <v-footer :fixed="fixed" app class="pa-3">
      <span class="grey--text text-darken-2 ml-3 subheading">&copy; 2018</span>
    </v-footer>
    <!-- Global Notification -->
    <v-snackbar
      :bottom="true"
      :color="globalNotificationType"
      v-model="globalNotificationStatus"
    >
      <span class="text-xs-center">{{ globalNotificationMessage }}</span>
    </v-snackbar>

    <!-- Global Loader -->
    <v-dialog v-model="globalLoaderStatus" max-width="300" persistent>
      <v-card>
        <v-card-text class="text-xs-center">
          <v-progress-circular indeterminate :size="50" color="blue"></v-progress-circular>
        </v-card-text>
        <v-card-text class="text-xs-center">{{globalLoaderMessage}}</v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire',
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    };
  },
  computed: mapState({
    // global notification
    globalNotificationStatus: state => state.app.globalNotificationStatus,
    globalNotificationType: state => state.app.globalNotificationType,
    globalNotificationMessage: state => state.app.globalNotificationMessage,

    // global loader
    globalLoaderStatus: state => state.app.globalLoaderStatus,
    globalLoaderMessage: state => state.app.globalLoaderMessage,
  }),
  name: 'App',
};
</script>

<style lang="stylus">
  // GLOBAL STYLING GOES HERE
  @import './stylus/helper.styl'

  .title-input input
    margin-bottom 2px

  .modal-content
    max-height 60vh
    overflow-y scroll
    overflow-x hidden

  .link
    text-decoration none

  p
    margin-bottom 0px
    font-size 17px
    font-weight 300
</style>

