import React, { FC } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

interface DialogProps {
  show: any;
  onHide: any;
  newUser: any;
  editing: boolean;
  onSubmit: any;
  onNameChange: any;
  onRoleChange: any;
  onDateChange: any;
}

const Dialog: FC<DialogProps> = (props): JSX.Element => {
  const {
    show,
    onHide,
    newUser,
    editing,
    onSubmit,
    onNameChange,
    onRoleChange,
    onDateChange,
  } = {
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
              onChange={onNameChange}
              placeholder="Enter Name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              value={newUser.role}
              onChange={onRoleChange}
              placeholder="Enter Role"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDateJoined">
            <Form.Label>Date Joined</Form.Label>
            <Form.Control
              type="date"
              value={newUser.dateJoined}
              onChange={onDateChange}
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

export default Dialog;
