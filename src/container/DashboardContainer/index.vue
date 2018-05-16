<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <!-- Menu -->
        <template
          v-if="userRole === 'admin' || userRole === 'superadmin'"
        >
          <v-list-tile to="/manage-user">
            <v-list-tile-action class="pl-3">
              <v-icon>perm_identity</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Menu User</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>

          <v-list-tile to="/manage-advisor">
            <v-list-tile-action class="pl-3">
              <v-icon>supervisor_account</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Manage User Category</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>

        </template>

        <v-list-tile to="/manage-thread">
          <v-list-tile-action class="pl-3">
            <v-icon>library_books</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Manage Request
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>

        <v-list-tile to="/manage-categories">
          <v-list-tile-action class="pl-3">
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Manage Inventory
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>

        <v-list-tile to="/manage-onboarding">
          <v-list-tile-action class="pl-3">
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Manage Inventory Category
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>

        <v-list-tile to="/manage-report">
          <v-list-tile-action class="pl-3">
            <v-icon>error_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Reports</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
      class="px-3 toolbar"
    >
      <v-toolbar-side-icon
        @click.stop="drawer = !drawer"
      >
      </v-toolbar-side-icon>
        <v-spacer></v-spacer>
        <!-- right menu -->
        <v-menu offset-y>
          <v-badge
            left
            slot="activator"
            class="mr-2"
            overlap
          >
            <span slot="badge">10</span>
            <v-icon
              medium
              color="grey lighten-1"
              dark
            >
              notifications
            </v-icon>
          </v-badge>
          <v-list>
            <v-list-tile v-for="item in notificationItems" :key="item.title">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>

        <v-menu
          bottom
          left
          offset-y
          transition="slide-y-transition"
          class="mr-2"
          >
          <v-btn icon slot="activator">
            <v-avatar
              class="grey lighten-4"
            >
              <img :src="photoURL" alt="avatar" v-if="photoURL">
              <v-icon
                v-else
                large
                color="grey lighten-1"
                >
                account_circle
              </v-icon>
            </v-avatar>
          </v-btn>
          <v-list>
            <v-list-tile v-for="(menu, i) in menus" :key="i">
              <v-list-tile-action>
                <v-icon>{{ menu.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>
                {{ menu.title }}
              </v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="logOut">
              <v-list-tile-action>
                <v-icon>input</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>
                Log Out
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
    </v-toolbar>

    <!-- MAIN CONTENT GOES HERE -->
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { result } from 'lodash';

export default {
  data() {
    return {
      mainTitle: 'Teman Diabetes',
      clipped: true,
      drawer: true,
      fixed: false,
      menus: [
        {
          title: 'Profile',
          icon: 'home',
        },
        {
          title: 'Setting',
          icon: 'settings',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Teman Diabetes Dashboard',
      notificationItems: [],
    };
  },
  computed: {
    ...mapState({
      name: state => result(state.auth.currentUser, 'nama', ''),
      photoURL: state => result(state.auth.currentUser, 'foto_profile', ''),
      userRole: state => result(state.auth.currentUser, 'role', ''),
    }),
  },
  methods: mapActions([
    'logOut',
  ]),
  name: 'App',
};
</script>

<style lang="stylus" scoped>
  .toolbar
    z-index 9999999999
</style>


