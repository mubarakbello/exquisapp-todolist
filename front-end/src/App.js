import React from 'react';
import {Container, Row, Col, Navbar, Card} from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <div>
      <Navbar sticky="top" bg="primary" variant="dark">
        <Navbar.Brand href="#home">TodoApp</Navbar.Brand>
      </Navbar>
      <Container style={{marginTop: "40px"}}>
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Card body>This is some text within a card body.</Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
