import React, { FC } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

interface DialogProps {
  show: boolean;
  onHide: any;
  newUser: any;
  editing: boolean;
  onSubmit: any;
  dispatch: any;
}

const UserDialog: FC<DialogProps> = (props): JSX.Element => {
  const { show, onHide, newUser, editing, onSubmit, dispatch } = {
    ...props,
  };

  return (
    <Modal size="lg" show={show} onHide={onHide}>
      <Form onSubmit={onSubmit}>
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                return dispatch({
                  type: 'ADD_USER',
                  value: { ...newUser, name: e.target.value },
                });
              }}
              placeholder="Enter Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              value={newUser.role}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                return dispatch({
                  type: 'ADD_USER',
                  value: { ...newUser, role: e.target.value },
                });
              }}
              placeholder="Enter Role"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDateJoined">
            <Form.Label>Date Joined</Form.Label>
            <Form.Control
              type="date"
              value={newUser.dateJoined}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                return dispatch({
                  type: 'ADD_USER',
                  value: { ...newUser, dateJoined: e.target.value },
                });
              }}
              placeholder="Enter Date Joined"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
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
  );
};

export default UserDialog;
