import React, { FC } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

interface DialogProps {
  show: boolean;
  onHide: any;
  newBook: any;
  editing: boolean;
  onSubmit: any;
  dispatch: any;
}

const BookDialog: FC<DialogProps> = (props): JSX.Element => {
  const { show, onHide, newBook, editing, onSubmit, dispatch } = {
    ...props,
  };

  return (
    <Modal size="lg" show={show} onHide={onHide}>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          {editing ? (
            <Modal.Title>Edit Book</Modal.Title>
          ) : (
            <Modal.Title>Add Book</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={newBook.title}
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                return dispatch({
                  type: 'ADD_BOOK',
                  value: { ...newBook, title: e.target.value },
                });
              }}
              placeholder="Enter Title"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRole">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={newBook.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                return dispatch({
                  type: 'ADD_BOOK',
                  value: { ...newBook, description: e.target.value },
                });
              }}
              placeholder="Enter Description"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicRole">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              value={newBook.genre}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                return dispatch({
                  type: 'ADD_BOOK',
                  value: { ...newBook, genre: e.target.value },
                });
              }}
              placeholder="Enter Genre"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDateJoined">
            <Form.Label>Year Published</Form.Label>
            <Form.Control
              type="date"
              value={newBook.year}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                return dispatch({
                  type: 'ADD_BOOK',
                  value: { ...newBook, year: e.target.value },
                });
              }}
              placeholder="Enter Year Published"
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
            <Button variant="primary" disabled={!newBook.title} type="submit">
              Submit
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default BookDialog;
