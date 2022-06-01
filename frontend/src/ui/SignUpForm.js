import React from 'react'
import {Form, FormControl, InputGroup} from "react-bootstrap";

export function SignUpForm() {
    return (
        <>
            <Form>
                {/*controlId must match what is passed to the initialValues prop*/}
                <Form.Group className="mb-1" controlId="profileEmail">
                    <Form.Label>email</Form.Label>
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

                <Form.Group className="mb-1" controlId="profileAtHandle">
                    <Form.Label>password</Form.Label>
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
            </Form>
        </>
    )
}

