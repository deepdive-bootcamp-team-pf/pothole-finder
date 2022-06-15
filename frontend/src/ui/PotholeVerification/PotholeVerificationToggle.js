import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchAuth} from '../../store/auth'
import {httpConfig} from '../utils/httpConfig'
import {Button, Col, Container, Image, Row} from 'react-bootstrap'
import unverified from './icons/unverified-icon.png'
import verified from './icons/verified-icon.png'
import {fetchPotholeVerificationsByPotholeId, setNewPotholeVerification} from "../../store/pothole-verifications";

export function ValidatePothole({pothole}) {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const effects = () => {
        dispatch(fetchAuth());
    };
    useEffect(effects, [dispatch]);

    useEffect(() => {
        dispatch(fetchPotholeVerificationsByPotholeId())
    }, [])

    const potholeVs = useSelector(state => (state.potholeVerifications ? state.potholeVerifications : []))

    const handleSubmit = () => {
        dispatch(setNewPotholeVerification({potholeVerificationPotholeId: pothole.potholeId, potholeVerificationProfileId: auth.profileId}))
        httpConfig.post('/apis/pothole-verification', {potholeVerificationPotholeId: pothole.potholeId})
            .then(reply => {
                const {status} = reply
                if (status === 200) {
                    // console.log(reply)
                }
            })
    }

    const potholeVerificationsPerPothole = potholeVs.filter(item => pothole.potholeId === item.potholeVerificationPotholeId)

    return (
        <>
            <Container>
                <Row>
                    <Col md={6}>
                        <Button className={'mt-3 text-center'} size={"sm"} variant={'success'}
                                onClick={handleSubmit}>Verify Pothole</Button>
                    </Col>
                    <Col md={6}>
                        {potholeVerificationsPerPothole.length > 0 &&
                            <>
                                <Image className={'mt-3 ms-3'} src={verified} width={'60px'} height={'60px'}></Image>
                                {potholeVerificationsPerPothole.length}
                            </>
                        }
                        {potholeVerificationsPerPothole.length === 0 &&
                            <>
                                <Image className={'mt-3 ms-3'} src={unverified} width={'60px'} height={'60px'}></Image>
                                {potholeVerificationsPerPothole.length}
                            </>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}