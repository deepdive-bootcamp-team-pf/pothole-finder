import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import jwtDecode from 'jwt-decode'
import {fetchAuth, getAuth} from '../../store/auth'
import {httpConfig} from "../utils/httpConfig";
import {Button} from "react-bootstrap";
import {Formik} from "formik";

export function ValidatePothole() {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const effects = () => {
        dispatch(fetchAuth());
    };
    useEffect(effects, [dispatch]);

    const handleSubmit = (values, {resetForm, setStatus}) => {
        httpConfig.post('/apis/pothole-verification', values).then(reply => {
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

    const potholeVerification = {}

    return (
        <>
            <Formik
                onSubmit={handleSubmit}
                initialValues={potholeVerification}>
                <Button className={'d-flex mt-2 text-center justify-content-center'} size={"sm"} variant={'success'} onClick={() => handleSubmit}>Validate Pothole</Button>
            </Formik>
        </>
    )
}