import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import styles from '../Table.module.css';
import { Pagination } from '../Pagination';
import Dialog from './BookDialog';
import BookTable from './BookTable';
import useBooksHook from './useBooksHook';

export const BookManagement = () => {
  const [state, dispatch] = useBooksHook();

  return (
    <Container fluid="md">
      <Row>
        <Col>
          <Card className="customCard mt-4">
            <div className={styles.cardBody}>
              <div className="d-flex justify-content-between customCardBody px-2">
                <div>
                  <Card.Title>Books Data</Card.Title>
                </div>
                <div className="d-flex">
                  <Button
                    variant="primary"
                    onClick={dispatch.handleShow}
                    title="Add Book"
                    disabled={dispatch.disabled}
                  >
                    <FaPlus />
                  </Button>
                </div>
              </div>
              <BookTable
                handleSort={dispatch.handleSort}
                sort={state.sort}
                filters={state.filters}
                handleSearch={dispatch.handleSearch}
                calculatedRows={dispatch.calculatedRows}
                books={state.books}
                disabled={dispatch.disabled}
                onEdit={dispatch.onEdit}
                onStatusUpdate={dispatch.onStatusUpdate}
                onDeleteBook={dispatch.onDeleteBook}
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
            newBook={state.newBook}
            editing={state.editing}
            onSubmit={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.preventDefault();
              dispatch.onSubmit(state.newBook);
            }}
            dispatch={dispatch.parentDispatch}
          />
        </Col>
      </Row>
    </Container>
  );
};
