import React from 'react'
import Map from './Map'
import {Button, Col, Container, Dropdown, Row} from 'react-bootstrap'
import './HomeNav.css'
import {LogInForm} from './LogInForm'
import {SignUp} from '../SignUp/SignUp'
import MapFunction from "./Map";

export function Home() {
    return (
        <>
            <Container fluid className={'home-nav position-absolute bg-transparent'}>
                <Row className={'d-flex pt-3'}>
                    <Col className={'mr-auto'}>
                        <Button href="/severity-photo-page" className={'large-button m-3'} size={'lg'}>Add Pothole from Current Location</Button>
                        <Button className={'large-button m-3'} size={'lg'}>Add Pothole On Map</Button>
                    </Col>
                    <Col className={'d-flex justify-content-end'}>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic" size={'lg'} className={'large-button background-primary mt-3'}>
                                Log In
                            </Dropdown.Toggle>

                            <Dropdown.Menu className={'dropdown-menu-css'}>
                                <Container fluid className={'login-form-container'}><LogInForm/></Container>
                            </Dropdown.Menu>
                        </Dropdown>
                        <SignUp/>
                    </Col>
                </Row>
            </Container>
            <MapFunction/>
        </>
    )
}


