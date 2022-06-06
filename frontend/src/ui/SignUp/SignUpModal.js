import React from "react"
import {SignUpForm} from "./SignUpForm";
import {Container, Modal} from "react-bootstrap";
import './SignUp.css'


export function SignUpModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className={'text-center ps-3'}>
                    <h2> Sign Up</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container fluid className={"pt-3 background-image"}>
                    <p className={'m-0 ps-3 text-white'}>Signing up is free and easy.</p>
                    <p className={'mt-0 mx-0 mb-5 ps-3 text-white'}>Members can post potholes instantly!</p>
                </Container>
                <SignUpForm/>
            </Modal.Body>
        </Modal>
    );
}

// <Row>
//     <Col md={4} >
//         <p className={'m-0 ps-3'}>Signing up is free and easy.</p>
//         <br/>
//         <p className={'mt-0 mx-0 mb-5 ps-3'}>Members can post potholes instantly!</p>
//     </Col>
//     <Col md={8}>
//         <Image fluid src={"https://economical.com/ECOCOM/media/EcoComMedia/Site%20imagery/Blog/Blog%20entries/Car-Pot-Holes-Blog_945x525-min_1.jpg?ext=.jpg"} className="mx-auto d-block" alt="Pothole Sign Up Image"></Image>
//     </Col>
// </Row>