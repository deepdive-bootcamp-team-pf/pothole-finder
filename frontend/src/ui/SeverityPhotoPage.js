import React from 'react'
import {Container, Button, Col, Row} from "react-bootstrap";

export function SeverityPhotoPage (){
    return(
        <>
            <h1>Please Rate your Pothole</h1>
            <div>
                <button>Severe: 3+ inch </button>
                <button>Moderate: 1-3 inch </button>
                <button>Mild: under 1 inch or cracking pavement </button>
            </div>
            <h1>Please Add A Photo Of Your Pothole</h1>
            <p>This step is optional. We can pull location of pothole from photo. This step is optional.</p>

            <button>Add Pothole </button>
            <button>Back </button>
            <button>Next </button>

        </>
    )
}