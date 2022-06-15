import React from 'react'
import {Col, Container, Row} from "react-bootstrap";
import facepalm from "./icons/face-palm.png";
import crying from "./icons/crying.png";
import bomb from "./icons/bomb.png";
import './HomeNav.css'

export function IconLegend() {
    return (
        <>
            <div className={'icon-legend border rounded'}>
                <Row>
                    <Col>
                        <p>Mild = <img src={facepalm} alt="severity-1" style={{width: '25px', height: '25px'}}/></p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Moderate = <img src={crying} alt="severity-2" style={{width: '25px', height: '25px'}}/></p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>Severe = <img src={bomb} alt="severity-1" style={{width: '25px', height: '25px'}}/></p>
                    </Col>
                </Row>
            </div>
        </>
    )
}