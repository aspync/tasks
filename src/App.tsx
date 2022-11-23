import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";
import { ChangeType } from "./components/ChangeType";
import { RevealAnswer } from "./components/RevealAnswer";
import { StartAttempt } from "./components/StartAttempt";
import { TwoDice } from "./components/TwoDice";
import { CycleHoliday } from "./components/CycleHoliday";
import { Counter } from "./components/Counter";
import { DoubleHalf } from "./bad-components/DoubleHalf";
import { ColoredBox } from "./bad-components/ColoredBox";
import { ShoveBox } from "./bad-components/ShoveBox";
import { ChooseTeam } from "./bad-components/ChooseTeam";

function App(): JSX.Element {
    return (
        <>
            <div className="App">
                <header className="App-header">
                    UD CISC275 with React Hooks and TypeScript
                </header>
                <p>
                    Edit <code>src/App.tsx</code> and save. This page will
                    automatically reload.
                </p>
            </div>
            <div>
                <DoubleHalf></DoubleHalf>
            </div>
            <div>
                <ChooseTeam></ChooseTeam>
            </div>
        </>
    );
}

export default App;
