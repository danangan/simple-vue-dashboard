const state = {
  users: [
    {
      nama: 'Danang',
      email: 'danang.arbansa@gmail.com',
      createdAt: new Date(),
      is_active: true,
      tipe_user: 'admin',
    },
  ],
  // initial value for pagination
  pagination: {
    page: 1,
    pages: 1,
    limit: 10,
    total: 1,
  },
  showDetailUser: false,
  activeDetailUser: {},
  // query for filter etc
  // this one is the default query
  query: {
    tipe_user: ['diabetesi', 'non-diabetesi'],
    is_active: [true, false],
    page: 1,
    limit: 10,
    search: '',
  },
};

export default state;
