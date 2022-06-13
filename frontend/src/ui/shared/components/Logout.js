import React from 'react'
import {useDispatch} from 'react-redux'
import {httpConfig} from '../../utils/httpConfig'
import {getAuth} from '../../../store/auth'
import {Button, Col} from 'react-bootstrap'

export const LogoutComponent = () => {
    const dispatch = useDispatch()
    const logout = () => {
        httpConfig.get('/apis/sign-out/').then(reply => {

            if (reply.status === 200) {
                window.localStorage.removeItem('authorization')
                dispatch(getAuth(null))
                window.location = '/'

            }
        })
    }

    return (
        <>
            <Col className={'d-flex justify-content-end'}>
                <Button variant="danger" id="dropdown-basic" size={'lg'}
                        className={'large-button mt-3'} onClick={logout}>
                    Logout
                </Button>
            </Col>
        </>
    )
}