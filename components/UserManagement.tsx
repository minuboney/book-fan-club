import React, { useState, useEffect, useMemo } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { User, UserContext } from './Interface';
import styles from './UserManagement.module.css';
import { sortRows, filterRows, paginateRows } from './helpers';
import { Pagination } from './Pagination';
import Dialog from './Dialog';
import UserTable from './UserTable';

export const UserManagement = () => {
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

  const [users, setUsers] = useState(defaultUsers);
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState(initCurrentUser);
  const [editing, setEdit] = useState(false);
  const { state } = React.useContext(UserContext);
  const disabled = state !== 1;

  const handleClose = () => {
    setShow(false);
    setEdit(false);
  };
  const handleShow = () => {
    setShow(true);
    if (!editing) {
      setNewUser(initCurrentUser);
    }
  };
  useEffect(() => {
    if (editing) {
      handleShow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const onFormSubmit = (newUser: any) => {
    const id = users.length + 1;
    setUsers([...users, { ...newUser, id }]);
  };

  const onEdit = (newUser: any) => {
    setEdit(true);
    setNewUser({ ...newUser, newUser });
  };

  const onSubmit = (newUser: any) => {
    if (editing) {
      onUpdateUser(newUser);
    } else {
      onFormSubmit(newUser);
    }
    handleClose();
  };

  const onUpdateUser = (newUser: User) => {
    setEdit(false);
    let id = newUser.id;
    setUsers(users.map((i) => (i.id === id ? newUser : i)));
  };

  const onDeleteUser = (currentUser: User) => {
    setUsers(users.filter((i) => i.id !== currentUser.id));
  };

  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' });
  const rowsPerPage = 3;

  const filteredRows = useMemo(() => filterRows(users, filters), [users, filters]);
  const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort]);
  const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage);

  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleSearch = (value: any, accessor: any) => {
    setActivePage(1);

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }));
    } else {
      setFilters((prevFilters: any) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[accessor];

        return updatedFilters;
      });
    }
  };

  const handleSort = (accessor: any) => {
    setActivePage(1);
    setSort((prevSort) => ({
      order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
      orderBy: accessor,
    }));
  };

  return (
    <Container fluid="md">
      <Row>
        <Col>
          <Card className="customCard mt-4">
            <div className={styles.cardBody}>
              <div className="d-flex justify-content-between customCardBody px-2">
                <div>
                  <Card.Title>User Data</Card.Title>
                </div>
                <div className="d-flex">
                  <Button
                    variant="primary"
                    onClick={handleShow}
                    title="Add User"
                    disabled={disabled}
                  >
                    <FaPlus />
                  </Button>
                </div>
              </div>
              <UserTable
                handleSort={handleSort}
                sort={sort}
                filters={filters}
                handleSearch={handleSearch}
                users={users}
                calculatedRows={calculatedRows}
                disabled={disabled}
                onEdit={onEdit}
                onDeleteUser={onDeleteUser}
              />
              {count > 0 ? (
                <Pagination
                  activePage={activePage}
                  count={count}
                  rowsPerPage={rowsPerPage}
                  totalPages={totalPages}
                  setActivePage={setActivePage}
                />
              ) : (
                <p>No data found</p>
              )}
            </div>
          </Card>
          <Dialog
            show={show}
            onHide={handleClose}
            newUser={newUser}
            editing={editing}
            onSubmit={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              onSubmit(newUser);
            }}
            onNameChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewUser({ ...newUser, name: e.target.value })
            }
            onRoleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewUser({ ...newUser, role: e.target.value })
            }
            onDateChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewUser({ ...newUser, dateJoined: e.target.value })
            }
          />
        </Col>
      </Row>
    </Container>
  );
};
