import React from 'react'
import {SignUpPopup} from "./SignUp/SignUpPopup";
import {Button, Container} from "react-bootstrap";


export const Home = () => {
  return (
    <>
        <Container fluid>
            <Button className={'m-3'} size={'lg'}>Log In</Button>
            <SignUpPopup/>
        </Container>
    </>
  )
}