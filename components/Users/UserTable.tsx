import React, { FC } from 'react';
import { Button, Table } from 'react-bootstrap';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

const columns = [
  { accessor: 'id', label: '#' },
  { accessor: 'name', label: 'Name' },
  { accessor: 'role', label: 'Role' },
  { accessor: 'dateJoined', label: 'Date Joined' },
];

interface TableProps {
  sort: any;
  handleSort: any;
  filters: any;
  handleSearch: any;
  users: any;
  calculatedRows: any;
  disabled: any;
  onEdit: any;
  onDeleteUser: any;
}

const UserTable: FC<TableProps> = (props): JSX.Element => {
  const {
    sort,
    handleSort,
    filters,
    handleSearch,
    users,
    calculatedRows,
    disabled,
    onEdit,
    onDeleteUser,
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
          {columns.slice(1, 4).map((column) => {
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
        </tr>
      </thead>
      <tbody>
        {users.length > 0 ? (
          calculatedRows.map((row: any) => {
            return (
              <tr key={row.id}>
                {columns.map((column) => {
                  if (column.accessor === 'dateJoined') {
                    const date = row[column.accessor].split('-');
                    const formattedDated = date[2] + '/' + date[1] + '/' + date[0];
                    return <td key={column.accessor}>{formattedDated}</td>;
                  }
                  return <td key={column.accessor}>{row[column.accessor]}</td>;
                })}
                <td>
                  <Button
                    variant="info"
                    title="Edit user details"
                    disabled={disabled}
                    onClick={() => onEdit(row)}
                  >
                    <FaPencilAlt />
                  </Button>{' '}
                  <Button
                    variant="danger"
                    title="Delete user"
                    disabled={disabled}
                    onClick={() => onDeleteUser(row)}
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
              No users found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default UserTable;
