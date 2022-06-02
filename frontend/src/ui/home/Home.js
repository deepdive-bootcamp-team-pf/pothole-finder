import React from 'react'
import Map from './Map'
import { SignUpPopup } from '../SignUp/SignUpPopup'
import {Button, Col, Container, Row} from 'react-bootstrap'

export function Home() {
    return (
        <>
            <Container fluid className={'d-flex'}>
                <Row>
                    <Col className={'d-inline-flex justify-content-end'}>
                        <Button className={'m-3'} size={'lg'}>Log In</Button>
                        <SignUpPopup/>
                    </Col>
                </Row>
            </Container>
            <Map/>
        </>
    )
}


