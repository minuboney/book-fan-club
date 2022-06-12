import React, { useReducer, useEffect, useMemo } from 'react';
import { Book, RoleContext } from '../Interface';
import { sortRows, filterRows, paginateRows } from '../helpers';
import { initCurrentBook, initialState, reducer } from './bookUtils';

const useBooksHook = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { role } = React.useContext(RoleContext);
  const disabled = role === 3;

  const rowsPerPage = 3;
  const filteredRows = useMemo(
    () => filterRows(state.books, state.filters),
    [state.books, state.filters]
  );
  const sortedRows = useMemo(
    () => sortRows(filteredRows, state.sort),
    [filteredRows, state.sort]
  );
  const calculatedRows = paginateRows(sortedRows, state.activePage, rowsPerPage);
  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);

  const mapDispatch = {
    parentDispatch: dispatch,
    handleClose: () => dispatch({ type: 'CLOSE_MODAL' }),
    handleShow: () => {
      dispatch({
        type: 'SHOW_MODAL',
      });
      if (!state.editing) {
        dispatch({
          type: 'ADD_BOOK',
          value: initCurrentBook,
        });
      }
    },
    onFormSubmit: (newBook: any) => {
      const id = state.books.length + 1;
      dispatch({
        type: 'SET_BOOKS',
        value: [...state.books, { ...newBook, id }],
      });
    },
    onEdit: (newBook: any) => {
      dispatch({
        type: 'EDIT_BOOK',
        value: { ...newBook, newBook },
      });
    },
    onStatusUpdate: (newBook: any) => {
      newBook.availability = !newBook.availability;
      dispatch({
        type: 'SET_AVAILABILITY_STATUS',
        value: { ...newBook, newBook },
      });
    },
    onSubmit: (newBook: any) => {
      if (state.editing) {
        mapDispatch.onUpdateBook(newBook);
      } else {
        mapDispatch.onFormSubmit(newBook);
      }
      dispatch({
        type: 'CLOSE_MODAL',
      });
    },
    onUpdateBook: (newBook: Book) => {
      let id = newBook.id;
      dispatch({
        type: 'SET_BOOKS_EDIT',
        value: state.books.map((i: any) => (i.id === id ? newBook : i)),
      });
    },
    onDeleteBook: (currentBook: Book) => {
      dispatch({
        type: 'SET_BOOKS',
        value: state.books.filter((i: any) => i.id !== currentBook.id),
      });
    },
    handleSearch: (value: any, accessor: any) => {
      dispatch({
        type: 'SET_ACTIVE_PAGE',
        value: 1,
      });

      if (value) {
        dispatch({
          type: 'SET_FILTERS',
          value: {
            ...state.filter,
            [accessor]: value,
          },
        });
      } else {
        const updatedFilters = { ...state.filter };
        delete updatedFilters[accessor];

        dispatch({
          type: 'SET_FILTERS',
          value: updatedFilters,
        });
      }
    },
    handleSort: (accessor: any) => {
      dispatch({
        type: 'SET_SORT',
        value: {
          order:
            state.sort.order === 'asc' && state.sort.orderBy === accessor
              ? 'desc'
              : 'asc',
          orderBy: accessor,
        },
      });
    },
    disabled,
    calculatedRows,
    count,
    totalPages,
    rowsPerPage,
  };

  useEffect(() => {
    if (state.editing) {
      mapDispatch.handleShow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.editing]);

  return [state, mapDispatch];
};

export default useBooksHook;
