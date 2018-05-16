<template>
  <!-- manage users table -->
  <v-container px-5 py-3>
    <v-layout mb-3>
      <v-flex xs8 pt-2>
        <!-- FILTER -->
        <v-btn
          dark
          class="ml-0"
          color="light-green"
        >
          <v-icon>add</v-icon>&nbsp;Add User
        </v-btn>
        <!-- FILTER -->
        <FilterDropdown
          :filter="filter"
          :showFilter="showFilter"
          :filterTranslation="filterTranslation"
          @applyFilter="applyFilter"
          @resetFilter="resetFilter"
          @updateFilterShow="updateFilterShow"
          @updateFilter="updateFilter"
        />
        <v-btn
          class="white "
        >
          <v-icon>mdi-sort</v-icon>&nbsp;Sort
        </v-btn>
      </v-flex>
      <v-flex xs4>
        <v-text-field
          clearable
          hide-details
          single-line
          label="Search by name"
          prepend-icon="search"
          v-model="search"
          @keyup="searchUser"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <!-- :total-items="0" -->
    <v-data-table
      :headers="headers"
      :items="users"
      :loading="tableLoading"
      item-key="name"
      class="elevation-1"
      hide-actions
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.nama }}</td>
        <td>{{ props.item.email }}</td>
        <td>
          <v-chip
            :color="props.item.tipe_user == 'admin' ? 'light-blue' : 'indigo'"
            text-color="white"
            small
            disabled
          >
            {{ props.item.tipe_user }}
          </v-chip>
        </td>
        <td>{{ formatDate(props.item.createdAt) }}</td>
        <td>
          <v-chip
            :color="props.item.is_active ? 'light-green' : 'error'"
            text-color="white"
            small
            disabled
          >
              {{ props.item.is_active ? 'Active' : 'Inactive' }}
          </v-chip>
        </td>
        <td>
          <v-tooltip bottom>
            <v-btn
              icon
              class="mr-2 my-2 elevation-2"
              slot="activator"
              :to="`user/${props.item._id}`"
              >
              <v-icon small>open_in_new</v-icon>
            </v-btn>
            <span>Open detail</span>
          </v-tooltip>
          <v-tooltip bottom>
            <v-btn
              icon
              slot="activator"
              class="mx-0 my-2 elevation-2"
              :color="props.item.is_active ? 'error' : 'primary'"
              @click="updateUser(props.item._id, { is_active: !props.item.is_active })"
              >
              <v-icon small>{{ props.item.is_active ? 'thumb_down' : 'thumb_up' }}</v-icon>
            </v-btn>
            <span>{{ `${props.item.is_active ? 'Deactivate' : 'Activate' } user` }}</span>
          </v-tooltip>
        </td>
      </template>
      <template slot="no-data">
        <span class="subheading grey--text">
          There is no data to be displayed.
        </span>
      </template>
      <template slot="footer">
        <td colspan="100%">
          <span class="grey--text caption py-2 d-block float-left">
            Show {{pagination.limit > pagination.total ? pagination.total : pagination.limit}} item from {{pagination.total}} total items
          </span>
          <v-layout class="float-right rows-select" v-if="pagination.total > pagination.limit">
            <v-flex xs8 class="pt-1">
              <span class="grey--text text--darken-1">Rows per page :&nbsp;</span>
            </v-flex>
            <v-flex xs4>
              <v-select
                class="pt-0"
                v-model="pagination.limit"
                :items="rows"
                v-if="pagination.total > 10"
                hide-details
              ></v-select>
            </v-flex>
          </v-layout>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center my-3" v-if="pagination.pages > 1">
      <v-pagination
        v-model="pagination.page"
        :length="pagination.pages"
        total-visible="10"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import { debounce, forEach, map, keys } from 'lodash';
  import FilterDropdown from '@/components/FilterDropdown';
  import filterMixin from '@/components/FilterDropdown/mixin';
  import formatter from '@/mixins/formatter';
  import { filterTranslation, filter, headers } from './data';

  export default {
    mixins: [formatter, filterMixin],
    components: {
      FilterDropdown,
    },
    data() {
      return {
        headers,
        filter,
        filterTranslation,
        tableLoading: false,
        search: '',
        rows: [10, 25, 50, 100],
        users: [
          {
            nama: 'Danang Arbansa',
            email: 'danang.arbansa@gmail.com',
            tipe_user: 'Administrator',
            createdAt: new Date(),
            is_active: true,
          },
          {
            nama: 'Danang Arbansa',
            email: 'danang.arbansa@gmail.com',
            tipe_user: 'Account Manager',
            createdAt: new Date(),
            is_active: true,
          },
          {
            nama: 'Danang Arbansa',
            email: 'danang.arbansa@gmail.com',
            tipe_user: 'Administrator',
            createdAt: new Date(),
            is_active: false,
          },
          {
            nama: 'Danang Arbansa',
            email: 'danang.arbansa@gmail.com',
            tipe_user: 'Administrator',
            createdAt: new Date(),
            is_active: false,
          },
          {
            nama: 'Danang Arbansa',
            email: 'danang.arbansa@gmail.com',
            tipe_user: 'Account Manager',
            createdAt: new Date(),
            is_active: false,
          },
        ],
      };
    },
    computed: {
      ...mapState({
        // users: state => state.users.users,
        pagination: state => state.users.pagination,
        activeDetailUser: state => state.users.activeDetailUser,
        query: state => state.users.query,
      }),
      pages() {
        return 10;
      },
    },
    watch: {
      'pagination.page': function (newValue) {
        const query = {
          page: newValue,
        };
        // fetch user
        this.$store.commit('users/updatePagination', query);
        this.$store.commit('users/updateQuery', query);
        this.fetchUsers();
      },
      'pagination.limit': function (newLimit) {
        const query = {
          limit: newLimit,
        };
        // fetch user
        this.$store.commit('users/updatePagination', query);
        this.$store.commit('users/updateQuery', query);
        this.fetchUsers();
      },
    },
    methods: {
      searchUser: debounce(function () {
        // do the search fetch api
        const query = {
          search: this.search,
          page: 1,
        };
        // fetch user
        this.$store.commit('users/updateQuery', query);
        this.fetchUsers();
      }, 300),
      fetchUsers(option = {}) {
        this.tableLoading = true;
        const cb = () => {
          this.tableLoading = false;
          if (option.optcb) option.optcb();
        };
        this.$store.dispatch('users/fetchUsers', { cb });
      },
      updateUser(userId, option) {
        this.tableLoading = true;
        const cb = () => {
          this.tableLoading = false;
        };
        this.$store.dispatch('users/updateUser', { userId, option, cb });
      },
      applyFilter() {
        let query = this.mapFilterToQuery();
        // add page to 1 query
        query = { ...query, page: 1 };
        const optcb = () => {
          this.showFilter = false;
        };
        this.$store.commit('users/updateQuery', query);
        this.fetchUsers({ optcb });
      },
    },
    // component life cycle goes here
    mounted() {
      // this.$store.dispatch('users/fetchUsers');
    },
  };
</script>

<style lang="stylus" scoped>
  .filter-title
    font-weight 500
  .rows-select
    width 200px
</style>
