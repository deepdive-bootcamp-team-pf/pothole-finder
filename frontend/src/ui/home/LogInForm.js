import {Button, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import React from 'react';

export function LogInForm() {
    return (
        <>
            <Form className={'login-form'}>
                <Row>
                    <Col>
                        <Form.Group className="mb-2" controlId="userName">
                            <Form.Label>User Name</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                </InputGroup.Text>
                                <FormControl
                                    className="form-control"
                                    name="profileEmail"
                                    type="text"
                                    placeholder="User Name"
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="mb-1" controlId="profileAtHandle">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                </InputGroup.Text>
                                <FormControl
                                    className="form-control"
                                    name="profilePassword"
                                    type="text"
                                    placeholder="P@ssword1"
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className={"mt-3"}>
                            <Button className="log-in-btn btn btn-primary" type="submit">Log In</Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </>
    )
}
