const defaultBooks = [
  {
    id: 1,
    title: 'Book 1',
    description: 'some description',
    genre: 'Fiction',
    year: '2000-10-04',
    availability: true,
  },
  {
    id: 2,
    title: 'Book 2',
    description: 'some description2',
    genre: 'Horror',
    year: '2000-10-05',
    availability: true,
  },
];

const initCurrentBook = {
  id: null,
  title: '',
  description: '',
  genre: '',
  year: '',
  availability: true,
};

const initialState = {
  books: defaultBooks,
  show: false,
  newBook: initCurrentBook,
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
    case 'ADD_BOOK':
      return {
        ...state,
        newBook: action.value,
      };
    case 'SET_BOOKS':
      return {
        ...state,
        books: action.value,
      };
    case 'EDIT_BOOK':
      return {
        ...state,
        newBook: action.value,
        editing: true,
      };
    case 'SET_BOOKS_EDIT':
      return {
        ...state,
        editing: false,
        books: action.value,
      };
    case 'SET_AVAILABILITY_STATUS':
      return {
        ...state,
        newBook: action.value,
        editing: false,
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

export { initCurrentBook, initialState, reducer };
