import React from "react"
import {SignUpForm} from "./SignUpForm";
import {Modal} from "react-bootstrap";


export function SignUpModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter"  className={'text-center ps-3'}>
                    <h2> Sign Up</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className={'m-0 ps-3'}>Signing up is free and easy.</p>
                <p className={'mt-0 mx-0 mb-5 ps-3'}>Members can post potholes instantly!</p>
                <SignUpForm/>
            </Modal.Body>
        </Modal>
    );
}