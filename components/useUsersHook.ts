import React, { useReducer, useEffect, useMemo } from 'react';
import { User, UserContext } from './Interface';
import { sortRows, filterRows, paginateRows } from './helpers';
import { initCurrentUser, initialState, reducer } from './userUtils';

const useUsersHook = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { role } = React.useContext(UserContext);
  const disabled = role !== 1;

  const rowsPerPage = 3;
  const filteredRows = useMemo(
    () => filterRows(state.users, state.filters),
    [state.users, state.filters]
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
          type: 'ADD_USER',
          value: initCurrentUser,
        });
      }
    },
    onFormSubmit: (newUser: any) => {
      const id = state.users.length + 1;
      dispatch({
        type: 'SET_USERS',
        value: [...state.users, { ...newUser, id }],
      });
    },
    onEdit: (newUser: any) => {
      dispatch({
        type: 'EDIT_USER',
        value: { ...newUser, newUser },
      });
    },
    onSubmit: (newUser: any) => {
      if (state.editing) {
        mapDispatch.onUpdateUser(newUser);
      } else {
        mapDispatch.onFormSubmit(newUser);
      }
      dispatch({
        type: 'CLOSE_MODAL',
      });
    },
    onUpdateUser: (newUser: User) => {
      let id = newUser.id;
      dispatch({
        type: 'SET_USERS_EDIT',
        value: state.users.map((i: any) => (i.id === id ? newUser : i)),
      });
    },
    onDeleteUser: (currentUser: User) => {
      dispatch({
        type: 'SET_USERS',
        value: state.users.filter((i: any) => i.id !== currentUser.id),
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

export default useUsersHook;
