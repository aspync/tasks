import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">Aspyn Call</header>
            <h1>Welcome to my React site!</h1>
            <p>COS420</p>
            <p>Hello World</p>
            <Button
                onClick={() => console.log("Hello World!")}
                aria-label="Log Hello World"
            >
                Log Hello World
            </Button>
            <Container>
                <Row>
                    <Col>
                        <div
                            style={{
                                width: 20,
                                height: 30,
                                backgroundColor: "red"
                            }}
                        ></div>
                        Grocery List
                        <ul>
                            <li>Eggs</li>
                            <li>Rice</li>
                            <li>Chicken</li>
                            <li>Shrimp</li>
                            <li>Steak</li>
                            <li>Mixed Veggies</li>
                        </ul>
                    </Col>
                    <Col>
                        <div
                            style={{
                                width: 20,
                                height: 30,
                                backgroundColor: "red"
                            }}
                        ></div>
                        <img
                            src="../assets/uzui_and_wives.jpg"
                            alt="Tengen Uzui and wives lol"
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
