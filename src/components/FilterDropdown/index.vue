<template>
  <v-menu
    lazy
    :close-on-content-click="false"
    :nudge-width="200"
    :value="showFilter"
  >
    <v-btn
      color="white"
      slot="activator"
      class="grey--text text--darken-1 ma-0"
      @click="$emit('updateFilterShow', !showFilter)"
    >
      <v-icon small>mdi-filter</v-icon>&nbsp;filter
    </v-btn>
    <v-card>
      <v-list>
        <v-list-tile>
          <v-list-tile-title><v-icon>mdi-filter-outline</v-icon>&nbsp;Filter</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <div v-for="(filterValue, filterKey) in filter" :key="filterKey">
          <!-- title -->
          <v-list-tile >
            <v-list-tile-content>
              <v-list-tile-title class="filter-title grey--text text--darken-2">{{ useTranslation(filterKey) }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="(value, itemKey) in filterValue" :key="itemKey">
            <v-list-tile-action>
              <v-list-tile-title>
                <v-checkbox :input-value="value" @click="$emit('updateFilter', filterKey, itemKey, !value)"></v-checkbox>
              </v-list-tile-title>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="pt-1 grey--text text--darken-1">{{ useTranslation(itemKey) }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="$emit('updateFilterShow', false)">Close</v-btn>
        <v-btn flat @click="$emit('resetFilter')">Reset</v-btn>
        <v-btn color="primary" flat @click="$emit('applyFilter')">Apply</v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
  export default {
    props: ['showFilter', 'filter', 'filterTranslation'],
    methods: {
      useTranslation(key) {
        return this.filterTranslation[key] || key;
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .filter-title
    font-weight 500
</style>
