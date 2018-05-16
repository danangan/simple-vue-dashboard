import Moment from 'moment';

export default {
  methods: {
    formatDate(date) {
      return new Moment(date).format('DD MMM YYYY hh:mm A');
    },
    isStringEmpty(string) {
      if (string) return string.trim() === '';
      return true;
    },
    getFileExtension(filename) {
      const ext = /^.+\.([^.]+)$/.exec(filename);
      return ext == null ? '' : ext[1];
    },
  },
};
