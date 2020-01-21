import React from 'react';
import {Container, Row, Col, Navbar, Card} from 'react-bootstrap';
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
              {todos.map((todo, index) => ())}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
