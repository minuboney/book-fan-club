import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';
import { FaPencilAlt, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { User, UserContext } from './Interface';
import styles from './Menu.module.css';

export const Menu = () => {
  const defaultUsers = [
    {
      id: 1,
      name: 'Bob',
      role: 'Admin',
      dateJoined: '10/04/2000',
    },
    {
      id: 2,
      name: 'John',
      role: 'Member',
      dateJoined: '10/06/2001',
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
              <Table striped bordered hover variant="dark" className="mt-3">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Date Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>{user.dateJoined}</td>
                        <td>
                          <Button
                            variant="info"
                            title="Edit user details"
                            disabled={disabled}
                            onClick={() => onEdit(user)}
                          >
                            <FaPencilAlt />
                          </Button>{' '}
                          <Button
                            variant="danger"
                            title="Delete user"
                            disabled={disabled}
                            onClick={() => onDeleteUser(user)}
                          >
                            <FaTrashAlt />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Card>

          <Modal size="lg" show={show} onHide={handleClose}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(newUser);
              }}
            >
              <Modal.Header closeButton>
                {editing ? (
                  <Modal.Title>Edit User</Modal.Title>
                ) : (
                  <Modal.Title>Add User</Modal.Title>
                )}
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.name}
                    required
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Enter Name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicRole">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    placeholder="Enter Role"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDateJoined">
                  <Form.Label>Date Joined</Form.Label>
                  <Form.Control
                    type="date"
                    value={newUser.dateJoined}
                    onChange={(e) =>
                      setNewUser({ ...newUser, dateJoined: e.target.value })
                    }
                    placeholder="Enter Date Joined"
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {editing ? (
                  <Button variant="primary" type="submit">
                    Update
                  </Button>
                ) : (
                  <Button variant="primary" disabled={!newUser.name} type="submit">
                    Submit
                  </Button>
                )}
              </Modal.Footer>
            </Form>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};
