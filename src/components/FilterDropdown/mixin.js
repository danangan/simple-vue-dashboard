import { forEach, map, keys } from 'lodash';

export default {
  data() {
    return {
      showFilter: false,
      filter: {},
      filterTranslation: {},
    };
  },
  methods: {
    updateFilter(filterKey, itemKey, value) {
      this.filter[filterKey][itemKey] = value;
    },
    updateFilterShow(status) {
      this.showFilter = status;
    },
    resetFilter() {
      keys(this.filter).forEach((filterKey) => {
        keys(this.filter[filterKey]).forEach((key) => {
          this.filter[filterKey][key] = false;
        });
      });
    },
    mapFilterToQuery() {
      const result = {};
      keys(this.filter).forEach((filterKey) => {
        result[filterKey] = [];
        keys(this.filter[filterKey]).forEach((key) => {
          if (this.filter[filterKey][key]) result[filterKey].push(key);
        });
      });
      return result;
    },
  },
};
