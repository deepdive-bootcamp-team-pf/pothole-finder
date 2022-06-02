import React from 'react'
import './Popup.css'
import {Button, Container} from "react-bootstrap";

export function Popup(props) {
    return (props.trigger) ? (
            <Container fluid className={'popup d-flex justify-content-center align-items-center'}>
                <Container fluid className={'popup-inner rounded border'}>
                    <Button className={'close-btn'} onClick={() => props.setTrigger(false)}>close</Button>
                    {props.children}
                </Container>
            </Container>
    ) : "";
}