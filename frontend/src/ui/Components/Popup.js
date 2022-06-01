import React from 'react'
import './Popup.css'
import {Container} from "react-bootstrap";

export function Popup(props) {
    return (props.trigger) ? (
            <Container fluid className={'popup d-flex justify-content-center align-items-center'}>
                <Container fluid className={'popup-inner'}>
                    <button className={'close-btn'} onClick={() => props.setTrigger(false)}>close</button>
                    {props.children}
                </Container>
            </Container>
    ) : "";
}