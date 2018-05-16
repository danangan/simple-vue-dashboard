export const filter = {
  tipe_user: {
    admin: false,
    member: false,
  },
  is_active: {
    true: false,
    false: false,
  },
};

export const filterTranslation = {
  tipe_user: 'User Type',
  admin: 'Admin',
  member: 'Member',
  is_active: 'User Status',
  false: 'Inactive',
  true: 'Active',
};

export const headers = [
  {
    text: 'Name',
    align: 'left',
    value: 'nama',
  },
  { text: 'Email',
    value: 'email',
    align: 'left',
  },
  { text: 'User Type',
    align: 'left',
    sortable: false,
  },
  { text: 'Date Created',
    align: 'left',
    sortable: false,
  },
  { text: 'Status',
    align: 'left',
    sortable: false,
  },
  { text: 'Action',
    align: 'left',
    sortable: false,
  },
];
