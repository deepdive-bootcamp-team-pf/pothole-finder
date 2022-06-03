import React from 'react'
import {Button, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";

export function SignUpForm() {
    return (
        <>
            <Form className={'p-3'}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-1" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                </InputGroup.Text>
                                <FormControl
                                    className="form-control"
                                    name="profileEmail"
                                    type="text"
                                    placeholder="First Name"
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                </InputGroup.Text>
                                <FormControl
                                    className="form-control"
                                    name="profileEmail"
                                    type="text"
                                    placeholder="Last Name"
                                />
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
                {/*controlId must match what is passed to the initialValues prop*/}


                <Form.Group className="mb-2" controlId="profileEmail">
                    <Form.Label>Email Address</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                        </InputGroup.Text>
                        <FormControl
                            className="form-control"
                            name="profileEmail"
                            type="text"
                            placeholder="your@email.you"
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-2" controlId="userName">
                    <Form.Label>User Name</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                        </InputGroup.Text>
                        <FormControl
                            className="form-control"
                            name="profileEmail"
                            type="text"
                            placeholder="Your User Name"
                        />
                    </InputGroup>
                </Form.Group>

                <br/>
                <br/>

                <Form.Group className="mb-1" controlId="profileAtHandle">
                    <Form.Label>Create Password</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                        </InputGroup.Text>
                        <FormControl
                            className="form-control"
                            name="profilePassword"
                            type="text"
                            placeholder="p@ssword1"
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className="mb-1" controlId="confirmProfilePassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                        </InputGroup.Text>
                        <FormControl
                            className="form-control"
                            name="profileEmail"
                            type="text"
                            placeholder="p@ssword1"
                        />
                    </InputGroup>
                </Form.Group>

                <Form.Group className={"mt-5"}>
                    <Button className="btn btn-primary btn-lg" type="submit">Sign Up!</Button>
                </Form.Group>
            </Form>
        </>
    )
}

