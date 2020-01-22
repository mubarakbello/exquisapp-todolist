import React from 'react';
import {
  Container, Row, Col, Navbar, Card, Accordion,
  ListGroup, CloseButton, Form, Button
} from 'react-bootstrap';
import Axios from 'axios';
import './App.css';

const API_URL = "http://localhost:3108/api";


class App extends React.Component {

  state = {
    loading: true,
    newListName: "",
    items: {}
  };

  componentDidMount() {
    this.loadTodoListData();
  }

  loadTodoListData = () => {
    this.setState({ loading: true });
    // load todos
    Axios.get(`${API_URL}/todos`)
      .then(res => {
        this.setState({
          todos: res.data.data,
          loading: false
        });
      })
      .catch((err) => {
        console.log(`${API_URL}/todos`);
        console.log("Err:", err);
      })
  }

  addNewList = () => {
    const name = this.state.newListName;
    if (!name) return;
    Axios.post(`${API_URL}/todo-list`, { name }, {
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => {
        this.setState({newListName: ""});
        this.loadTodoListData();
      })
  }

  addNewItem = (listId) => {
    const title = this.state.items[listId];
    if (!title) return;
    Axios.post(`${API_URL}/todo-item`, { title, listId }, {
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => {
        this.setState({
          items: {
            ...this.state.items,
            [listId]: ""
          }
        });
        setTimeout(() => {
          this.loadTodoListData();
        }, 1000);
      })
  }

  deleteList = (event, listId) => {
    event.stopPropagation();
    Axios.delete(`${API_URL}/todo-list/${listId}`, {}, {
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => {
        this.loadTodoListData();
      })
  }

  deleteItem = (event, itemId) => {
    event.stopPropagation();
    Axios.delete(`${API_URL}/todo-item/${itemId}`, {}, {
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => {
        this.loadTodoListData();
      })
  }

  render() {
    return (
      <div>
        <Navbar sticky="top" bg="primary" variant="dark">
          <Navbar.Brand href="#home">TodoApp</Navbar.Brand>
        </Navbar>
        <Container style={{marginTop: "40px"}}>
          <Row className="justify-content-md-center">
            <Col md={6}>
              <Card body>
                <div>
                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      placeholder="New List name"
                      value={this.state.newListName}
                      onChange={(event) => this.setState({newListName: event.target.value})}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={this.addNewList}>
                    +  Add New List
                  </Button>
                </Form>
                </div>
                <hr />
                {!this.state.loading &&
                  <Accordion defaultActiveKey="0">
                    {this.state.todos.map((todo, index) => (
                      <Card key={index}>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey={index}>
                          {todo.name}
                          <div style={{position: "absolute", top: "12px", right: "24px"}} className="pull-right">
                            <CloseButton onClick={(event) => this.deleteList(event, todo._id)} />
                          </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={index}>
                          <Card.Body>
                            <ListGroup variant="flush">
                              <Form>
                                <Form.Row>
                                  <Col>
                                    <Form.Control
                                      placeholder="New Todo Item"
                                      value={this.state.items[todo._id] || ""}
                                      onChange={(event) => {
                                        this.setState({
                                          items: {
                                            ...this.state.items,
                                            [todo._id]: event.target.value
                                          }
                                        });
                                      }}
                                    />
                                  </Col>
                                  <Col xs="auto">
                                    <Button variant="primary" onClick={() => this.addNewItem(todo._id)}>
                                      Add Item
                                    </Button>
                                  </Col>
                                </Form.Row>
                              </Form>
                              {todo.items.map((item, index) => (
                                <ListGroup.Item key={index}>
                                  {item.title}
                                  <div style={{position: "absolute", top: "12px", right: "24px"}} className="pull-right">
                                    <CloseButton onClick={(event) => this.deleteItem(event, item._id)} />
                                  </div>
                                </ListGroup.Item>
                              ))}
                            </ListGroup>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    ))}
                  </Accordion>
                }
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
