import React from 'react'
import {Button, Col, Form, FormControl, InputGroup, Row} from "react-bootstrap";

import * as Yup from 'yup'
import {httpConfig} from "../utils/httpConfig"
import { FormDebugger } from "../utils/FormDebugger"
import { Formik } from 'formik'
import {DisplayStatus} from "../shared/components/display-status/DisplayStatus";

export function SignUpForm() {

    const validator = Yup.object().shape({
        profileFirstName: Yup.string()
            .required('A first name is required.')
            .max(32, 'First name must be 32 characters or less.'),
        profileLastName: Yup.string()
            .required('A last name is required.')
            .max(32, 'Last name must be 32 characters or less.'),
        profileEmail: Yup.string()
            .required('Must enter an email address.')
            .email('A valid email is required.'),
        profilePassword: Yup.string()
            .required('A password is required.')
            .min(8, 'Password needs to be at least 8 characters.'),
        profilePasswordConfirm: Yup.string()
            .oneOf([Yup.ref('profilePassword'), null], 'Passwords must match'),
        profileUsername: Yup.string()
            .required('A user name is required.')
            .max(32, 'Username must be 64 characters or less')
    })

    const handleSubmit = (values, {resetForm, setStatus}) => {
        httpConfig.post('/apis/sign-up', values).then(reply => {
            const {message, type, status} = reply
            if (status === 200) {
                resetForm()
            }
            setStatus({message, type})
        })
    }

    const profile = {
        profileFirstName: '',
        profileLastName: '',
        profileEmail: '',
        profilePassword: '',
        profilePasswordConfirm: '',
        profileUsername: '',
    }

    return (
        <>
            <Formik
                onSubmit={handleSubmit}
                initialValues={profile}
                validationSchema={validator}
            >
                {SignUpFormContent}
            </Formik>
        </>
    )
}

function SignUpFormContent(props) {
    const {
        status,
        values,
        errors,
        touched,
        dirty,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset
    } = props

    return (
        <>
            <Form onSubmit={handleSubmit} className={'p-3 form-text'}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-1" controlId="profileFirstName">
                            <Form.Label>First Name</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                </InputGroup.Text>
                                <FormControl
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.profileFirstName}
                                    name="profileFirstName"
                                    placeholder="First Name"
                                />
                            </InputGroup>
                            {errors.profileFirstName && touched.profileFirstName &&
                                <>
                                    <div className={'alert alert-danger'}>
                                        {errors.profileFirstName}
                                    </div>
                                </>
                            }
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group className="mb-3" controlId="profileLastName">
                            <Form.Label>Last Name</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                </InputGroup.Text>
                                <FormControl
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.profileLastName}
                                    name="profileLastName"
                                    placeholder="Last Name"
                                />
                            </InputGroup>
                            {errors.profileLastName && touched.profileLastName &&
                                <>
                                    <div className={'alert alert-danger'}>
                                        {errors.profileLastName}
                                    </div>
                                </>
                            }
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.profileEmail}
                            name="profileEmail"
                            placeholder="your@email.you"
                        />
                    </InputGroup>
                    {errors.profileEmail && touched.profileEmail &&
                        <>
                            <div className={'alert alert-danger'}>
                                {errors.profileEmail}
                            </div>
                        </>
                    }
                </Form.Group>

                <Form.Group className="mb-2" controlId="profileUsername">
                    <Form.Label>User Name</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                        </InputGroup.Text>
                        <FormControl
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.profileUsername}
                            name="profileUsername"
                            placeholder="Your User Name"
                        />
                    </InputGroup>
                    {errors.profileUsername && touched.profileUsername &&
                        <>
                            <div className={'alert alert-danger'}>
                                {errors.profileUsername}
                            </div>
                        </>
                    }
                </Form.Group>

                <br/>
                <br/>

                <Form.Group className="mb-1" controlId="profilePassword">
                    <Form.Label>Create Password</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                        </InputGroup.Text>
                        <FormControl
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.profilePassword}
                            name="profilePassword"
                            placeholder="p@ssword1"
                            type="password"
                        />
                    </InputGroup>
                    {errors.profilePassword && touched.profilePassword &&
                        <>
                            <div className={'alert alert-danger'}>
                                {errors.profilePassword}
                            </div>
                        </>
                    }
                </Form.Group>

                <Form.Group className="mb-1" controlId="profilePasswordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                        </InputGroup.Text>
                        <FormControl
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.profilePasswordConfirm}
                            name="profilePasswordConfirm"
                            placeholder="p@ssword1"
                            type="password"
                        />
                    </InputGroup>
                    {errors.profilePasswordConfirm && touched.profilePasswordConfirm &&
                        <>
                            <div className={'alert alert-danger'}>
                                {errors.profilePasswordConfirm}
                            </div>
                        </>
                    }
                </Form.Group>
                        <Button className="btn btn-primary btn-lg mt-3" type="submit">Sign Up!</Button>
            </Form>
            <DisplayStatus status={status}/>
        </>
    )
}
