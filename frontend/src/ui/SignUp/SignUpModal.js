import React from "react";
import { Container, Modal } from "react-bootstrap";
import { SignUpForm } from "./SignUpForm";
import "./SignUp.css";

export function SignUpModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="text-center ps-3"
        >
          <h2> Sign Up</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid className="pt-3 background-image">
          <p className="m-0 ps-3 text-white text-on-photo">
            Signing up is free and easy.
          </p>
          <p className="mt-0 mx-0 mb-5 ps-3 text-white text-on-photo">
            Members can post potholes instantly!
          </p>
        </Container>
        <SignUpForm />
      </Modal.Body>
    </Modal>
  );
}
