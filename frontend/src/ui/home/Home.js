import React from 'react'
import Map from './Map'
import { SignUpPopup } from '../SignUp/SignUpPopup'
import {Button, Col, Container, Row} from 'react-bootstrap'
import './HomeNav.css'

export function Home() {
    return (
        <>
            <Container fluid className={'home-nav position-absolute bg-transparent'}>
                <Row className={'d-flex pt-3'}>
                    <Col className={'mr-auto'}>
                        <Button className={'m-3'} size={'lg'}>Add Pothole</Button>
                    </Col>
                    <Col className={'d-flex justify-content-end'}>
                        <Button className={'m-3'} size={'lg'}>Log In</Button>
                        <SignUpPopup/>
                    </Col>
                </Row>
            </Container>
            <Map/>
        </>
    )
}


