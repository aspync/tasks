import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";

function App(): JSX.Element {
    return (
        <div className="App">
            <header className="App-header">Aspyn Call</header>
            <p>COS420</p>
            <p>Hello World</p>
            <Button
                onClick={() => console.log("I am logged")}
                aria-label="Log Hello World"
            >
                Click Me!
            </Button>
            <Container>
                <Row>
                    <Col>First column</Col>
                    <Col>
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
