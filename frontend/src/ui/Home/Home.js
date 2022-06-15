import React, {useEffect} from 'react'
import {Button, Col, Container, Dropdown, Row, Stack} from 'react-bootstrap'
import './HomeNav.css'
import {LogInForm} from './LogInForm'
import {SignUp} from '../SignUp/SignUp'
import MapFunction from "./Map";
import {fetchAuth} from '../../store/auth'
import {useDispatch, useSelector} from "react-redux";
import {LogoutComponent} from "../shared/components/Logout";
import {SignUpModal} from "../SignUp/SignUpModal";
import {useNavigate} from "react-router-dom"
import logo from './icons/pothole-logo.png'

export function Home() {

    const location = useSelector((state) => state.location ? state.location : {});
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const effects = () => {
        dispatch(fetchAuth());
    };
    useEffect(effects, [dispatch]);

    const [show, setShow] = React.useState(false)
    const [modalShow, setModalShow] = React.useState(false);

    const navigate = useNavigate();

    const toPotholeSubmission = () => {
        navigate('/pothole-submission-page', {state: {lat: location.lat, lng: location.lng}})
    }

    return (
        <>
            <Container fluid className={'home-nav position-absolute bg-transparent'}>
                <Row className={'d-flex pt-3'}>
                    <Col className={'mr-auto'}>

                        {auth === null &&
                            <>
                                <Button className={'sign-up-button m-3'} size={"lg"} onClick={() => setModalShow(true)}>Add
                                    Pothole</Button>
                                <SignUpModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </>}

                        {auth !== null &&
                            <Dropdown>
                                <Dropdown.Toggle disabled={show} variant="primary" id="dropdown-basic"
                                                 className={'large-button mt-3'}
                                                 size={'lg'}>
                                    Add Pothole
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => toPotholeSubmission()}>
                                        From Current Location
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => setShow(true)}>
                                        On Map
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>}
                    </Col>
                    <Col className={'mx-auto d-flex justify-content-center'}>
                        <img src={logo} alt="pothole logo" className={'pothole-logo'}/>
                    </Col>
                    {auth !== null &&
                        <Col>
                            <LogoutComponent/>
                        </Col>
                    }

                    {auth === null &&
                        <Col className={'d-flex justify-content-end'}>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic" size={'lg'}
                                                 className={'large-button background-primary mt-3'}>
                                    Log In
                                </Dropdown.Toggle>

                                <Dropdown.Menu className={'dropdown-menu-css'}>
                                    <Container fluid className={'login-form-container'}><LogInForm/></Container>
                                </Dropdown.Menu>
                            </Dropdown>
                            <SignUp/>
                        </Col>
                    }
                </Row>
            </Container>
            <MapFunction show={show} setShow={setShow}/>
        </>
    )
}