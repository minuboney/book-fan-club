import React, { FC } from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

const columns = [
  { accessor: 'id', label: '#' },
  { accessor: 'title', label: 'Title' },
  { accessor: 'description', label: 'Description' },
  { accessor: 'genre', label: 'Genre' },
  { accessor: 'year', label: 'Year Published' },
  { accessor: 'availability', label: 'Availability' },
];

interface TableProps {
  sort: any;
  handleSort: any;
  filters: any;
  handleSearch: any;
  books: any;
  calculatedRows: any;
  disabled: any;
  onEdit: any;
  onDeleteBook: any;
  onStatusUpdate: any;
}

const BookTable: FC<TableProps> = (props): JSX.Element => {
  const {
    sort,
    handleSort,
    filters,
    handleSearch,
    books,
    calculatedRows,
    disabled,
    onEdit,
    onStatusUpdate,
    onDeleteBook,
  } = {
    ...props,
  };

  return (
    <Table striped bordered hover variant="dark" className="mt-3">
      <thead>
        <tr>
          {columns.map((column) => {
            const sortIcon = () => {
              if (column.accessor === sort.orderBy) {
                if (sort.order === 'asc') {
                  return ' ▴';
                }
                return ' ▾';
              } else {
                return '️↕️';
              }
            };
            return (
              <th key={column.accessor}>
                <span>{column.label}</span>
                <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>
              </th>
            );
          })}
          <th>Edit / Delete</th>
        </tr>
        <tr>
          <th></th>
          {columns.slice(1, 5).map((column) => {
            return (
              <th key={`${column.accessor}-search`}>
                <input
                  type="search"
                  placeholder={`Search ${column.label}`}
                  value={filters[column.accessor]}
                  onChange={(event) => handleSearch(event.target.value, column.accessor)}
                />
              </th>
            );
          })}
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {books.length > 0 ? (
          calculatedRows.map((row: any) => {
            return (
              <tr key={row.id}>
                {columns.map((column) => {
                  if (column.accessor === 'year') {
                    const date = row[column.accessor].split('-');
                    const formattedDated = date[2] + '/' + date[1] + '/' + date[0];
                    return <td key={column.accessor}>{formattedDated}</td>;
                  }
                  if (column.accessor === 'availability') {
                    return (
                      <td key={column.accessor}>
                        {row[column.accessor] ? (
                          <Button variant="info" onClick={() => onStatusUpdate(row)}>
                            Borrow
                          </Button>
                        ) : (
                          <Button variant="info" onClick={() => onStatusUpdate(row)}>
                            Return
                          </Button>
                        )}
                      </td>
                    );
                  }
                  return <td key={column.accessor}>{row[column.accessor]}</td>;
                })}
                <td>
                  <Button
                    variant="info"
                    title="Edit book details"
                    disabled={disabled}
                    onClick={() => onEdit(row)}
                  >
                    <FaPencilAlt />
                  </Button>{' '}
                  <Button
                    variant="danger"
                    title="Delete book"
                    disabled={disabled}
                    onClick={() => onDeleteBook(row)}
                  >
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={6} className="text-center">
              No books found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default BookTable;
