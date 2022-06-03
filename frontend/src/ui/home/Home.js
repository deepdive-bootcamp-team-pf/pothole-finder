import React from 'react'
import Map from './Map'
import { SignUpPopup } from '../SignUp/SignUpPopup'
import {Button, Col, Container, Dropdown, Row} from 'react-bootstrap'
import './HomeNav.css'
import {LogInForm} from "./LogInForm";

export function Home() {
    return (
        <>
            <Container fluid className={'home-nav position-absolute bg-transparent'}>
                <Row className={'d-flex pt-3'}>
                    <Col className={'mr-auto'}>
                        <Button className={'large-button m-3'} size={'lg'}>Add Pothole</Button>
                    </Col>
                    <Col className={'d-flex justify-content-end'}>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic" size={'lg'} className={'large-button background-primary mt-3'}>
                                Log In
                            </Dropdown.Toggle>

                            <Dropdown.Menu className={'dropdown-menu-css'}>
                                <Container fluid><LogInForm/></Container>
                            </Dropdown.Menu>
                        </Dropdown>
                        <SignUpPopup/>
                    </Col>
                </Row>
            </Container>
            <Map/>
        </>
    )
}


