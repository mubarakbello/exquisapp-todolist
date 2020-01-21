import React from 'react';
import {Container, Row, Col, Navbar, Card, Accordion, ListGroup } from 'react-bootstrap';
import './App.css';

const todos = [
  {
    _id: "6fuvhv",
    name:  "Personal",
    items: [
      { _id: "bchdsaw", title: "Wash cloth" },
      { _id: "uyrdsfs", title: "Cook spag"}
    ]
  },
  {
    _id: "ivbvsuf",
    name:  "Work",
    items: [
      { _id: "7cvejw", title: "Finish project" },
      { _id: "cvewja", title: "Leave office"}
    ]
  }
]

function App() {
  return (
    <div>
      <Navbar sticky="top" bg="primary" variant="dark">
        <Navbar.Brand href="#home">TodoApp</Navbar.Brand>
      </Navbar>
      <Container style={{marginTop: "40px"}}>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Card body>
              <div></div>
              <hr />
              <Accordion defaultActiveKey="0">
                {todos.map((todo, index) => (
                  <Card key={index}>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey={index}>
                      {todo.name}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={index}>
                      <Card.Body>
                        <ListGroup variant="flush">
                          {todo.items.map((item, index) => (
                            <ListGroup.Item key={index}>{item.title}</ListGroup.Item>
                          ))}
                        </ListGroup>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </Accordion>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
