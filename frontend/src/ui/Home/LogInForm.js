import {Button, Col, Form, FormControl, InputGroup, Row} from 'react-bootstrap'
import React from 'react'

import * as Yup from 'yup'
import {httpConfig} from "../utils/httpConfig"
import {FormDebugger} from "../utils/FormDebugger"
import {Formik} from 'formik'
import {DisplayStatus} from "../shared/components/display-status/DisplayStatus";
import jwtDecode from "jwt-decode";
import {useDispatch} from "react-redux";
import {getAuth} from '../../store/auth'

export function LogInForm() {

    const dispatch = useDispatch()

    const validator = Yup.object().shape({
        profilePassword: Yup.string()
            .required('A password is required.')
            .min(8, 'Password needs to be at least 8 characters.'),
        profileUsername: Yup.string()
            .required('A user name is required.')
            .max(32, 'Username must be 64 characters or less')
    })

    const handleSubmit = (values, {resetForm, setStatus}) => {
        httpConfig.post('/apis/login', values).then(reply => {
            const {message, type, status} = reply
            if (status === 200 && reply.headers["authorization"]) {
                window.localStorage.removeItem("authorization");
                window.localStorage.setItem("authorization", reply.headers["authorization"]);
                resetForm();
                let jwtToken = jwtDecode(reply.headers["authorization"])
                dispatch(getAuth(jwtToken))
                {
                    resetForm()
                }
            }
            setStatus({message, type})
        })
    }

    const profile = {
        profilePassword: '',
        profileUsername: '',
    }

    return (
        <>
            <Formik
                onSubmit={handleSubmit}
                initialValues={profile}
                validationSchema={validator}
            >
                {LoginInFormContent}
            </Formik>
        </>
    )
}

function LoginInFormContent(props) {
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
            <Form onSubmit={handleSubmit} className={'login-form'}>
                <Row>
                    <Col>
                        <Form.Group className="mb-2" controlId="profileUsername">
                            <Form.Label>Enter Username</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                </InputGroup.Text>
                                <FormControl
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.profileUsername}
                                    name="profileUsername"
                                    placeholder="Username"
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

                        <Form.Group className="mb-1" controlId="profilePassword">
                            <Form.Label>Enter Password</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                </InputGroup.Text>
                                <FormControl
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.profilePassword}
                                    name="profilePassword"
                                    placeholder="Password"
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
                    </Col>
                </Row>
                <Button className="btn btn-primary btn-lg mt-3" type="submit">Login</Button>
            </Form>
            <DisplayStatus status={status}/>
        </>
    )
}
