import React from 'react';
import {Button} from "react-bootstrap";
import {SignUpModal} from "./SignUpModal";

export function SignUp() {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Sign Up
            </Button>

            <SignUpModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}