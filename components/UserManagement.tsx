import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import styles from './UserManagement.module.css';
import { Pagination } from './Pagination';
import Dialog from './Dialog';
import UserTable from './UserTable';
import useUsersHook from './useUsersHook';

export const UserManagement = () => {
  const [state, dispatch] = useUsersHook();

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
                    onClick={dispatch.handleShow}
                    title="Add User"
                    disabled={dispatch.disabled}
                  >
                    <FaPlus />
                  </Button>
                </div>
              </div>
              <UserTable
                handleSort={dispatch.handleSort}
                sort={state.sort}
                filters={state.filters}
                handleSearch={dispatch.handleSearch}
                calculatedRows={dispatch.calculatedRows}
                users={state.users}
                disabled={dispatch.disabled}
                onEdit={dispatch.onEdit}
                onDeleteUser={dispatch.onDeleteUser}
              />
              {dispatch.count > 0 ? (
                <Pagination
                  activePage={state.activePage}
                  count={dispatch.count}
                  rowsPerPage={dispatch.rowsPerPage}
                  totalPages={dispatch.totalPages}
                  dispatch={dispatch.parentDispatch}
                />
              ) : (
                <p>No data found</p>
              )}
            </div>
          </Card>
          <Dialog
            show={state.show}
            onHide={dispatch.handleClose}
            newUser={state.newUser}
            editing={state.editing}
            onSubmit={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              dispatch.onSubmit(state.newUser);
            }}
            onNameChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              return dispatch.parentDispatch({
                type: 'ADD_USER',
                value: { ...state.newUser, name: e.target.value },
              });
            }}
            onRoleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              return dispatch.parentDispatch({
                type: 'ADD_USER',
                value: { ...state.newUser, role: e.target.value },
              });
            }}
            onDateChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              return dispatch.parentDispatch({
                type: 'ADD_USER',
                value: { ...state.newUser, dateJoined: e.target.value },
              });
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};
