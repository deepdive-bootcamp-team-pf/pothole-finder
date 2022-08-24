import React from "react";
import { Button } from "react-bootstrap";
import "../Home/HomeNav.css";
import { SignUpModal } from "./SignUpModal";

export function SignUp() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        className="sign-up-button m-3"
        size="lg"
        onClick={() => setModalShow(true)}
      >
        Sign Up
      </Button>
      <SignUpModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
