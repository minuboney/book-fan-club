const defaultUsers = [
  {
    id: 1,
    name: 'Bob',
    role: 'Admin',
    dateJoined: '2000-10-04',
  },
  {
    id: 2,
    name: 'John',
    role: 'Member',
    dateJoined: '2001-10-06',
  },
];

const initCurrentUser = {
  id: null,
  name: '',
  role: '',
  dateJoined: '',
};

const initialState = {
  users: defaultUsers,
  show: false,
  newUser: initCurrentUser,
  editing: false,
  activePage: 1,
  filters: {},
  sort: { order: 'asc', orderBy: 'id' },
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CLOSE_MODAL':
      return {
        ...state,
        show: false,
        editing: false,
      };
    case 'SHOW_MODAL':
      return {
        ...state,
        show: true,
      };
    case 'ADD_USER':
      return {
        ...state,
        newUser: action.value,
      };
    case 'SET_USERS':
      return {
        ...state,
        users: action.value,
      };
    case 'EDIT_USER':
      return {
        ...state,
        newUser: action.value,
        editing: true,
      };
    case 'SET_USERS_EDIT':
      return {
        ...state,
        editing: false,
        users: action.value,
      };
    case 'SET_ACTIVE_PAGE':
      return {
        ...state,
        activePage: action.value,
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: action.value,
      };
    case 'SET_SORT':
      return {
        ...state,
        sort: action.value,
        activePage: 1,
      };
    default:
      return state;
  }
};

export { initCurrentUser, initialState, reducer };
