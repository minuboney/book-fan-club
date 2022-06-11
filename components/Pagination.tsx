import React, { FC } from 'react';

/* eslint-disable jsx-a11y/accessible-emoji */

interface PageProps {
  activePage: any;
  count: any;
  rowsPerPage: any;
  totalPages: any;
  dispatch: any;
}

export const Pagination: FC<PageProps> = (props): JSX.Element => {
  const { activePage, count, rowsPerPage, totalPages, dispatch } = { ...props };
  const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1;
  const end = activePage === totalPages ? count : beginning + rowsPerPage - 1;

  return (
    <>
      <div className="pagination">
        <button
          disabled={activePage === 1}
          onClick={() => {
            return dispatch({
              type: 'SET_ACTIVE_PAGE',
              value: 1,
            });
          }}
        >
          ⏮️ First
        </button>
        <button
          disabled={activePage === 1}
          onClick={() => {
            return dispatch({
              type: 'SET_ACTIVE_PAGE',
              value: 1,
            });
          }}
        >
          ⬅️ Previous
        </button>
        <button
          disabled={activePage === totalPages}
          onClick={() => {
            return dispatch({
              type: 'SET_ACTIVE_PAGE',
              value: activePage + 1,
            });
          }}
        >
          Next ➡️
        </button>
        <button
          disabled={activePage === totalPages}
          onClick={() => {
            return dispatch({
              type: 'SET_ACTIVE_PAGE',
              value: totalPages,
            });
          }}
        >
          Last ⏭️
        </button>
      </div>
      <p>
        Page {activePage} of {totalPages}
      </p>
      <p>
        Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
      </p>
    </>
  );
};
