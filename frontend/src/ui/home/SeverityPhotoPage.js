import React from 'react'
import { Button, Form } from 'react-bootstrap'
import './SeverityPhotoPage.css'
import bomb  from './icons/bomb.png'


export function SeverityPhotoPage (){

  function handleClose () {

  }

  return(
        <>
            <div>
                  <h1>Please rate your Pothole</h1>
                        <div> <img src={bomb} style={{height: '35px', width: '35px'}}/>Severe: 3+ inch </div>
                        <button variant="primary" onClick={handleClose}>Moderate: 1-3 inch </button>
                        <button variant="primary" onClick={handleClose}>Mild: under 1 inch or cracking pavement </button>

                    <h1>Add Photo</h1>
                    <p>Please add a photo of your pothole. We can pull the location of pothole from photo. This step is optional.</p>

              <Button variant="primary" type="addPhoto">
                Add Photo</Button>


            </div>

          <Form>
            <Form.Group className="mb-3" controlId="photoDescription">
              <Form.Label>Photo Description</Form.Label>
              <Form.Control type="description" placeholder="This pothole gave me a flat tire!" />
              <Form.Text className="text-muted">
                Please add a brief description of pothole.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="photoName">
              <Form.Label>Photo Name</Form.Label>
              <Form.Control type="password" placeholder="Camino de Crater" />
              <Form.Text className="text-muted">
                Please add a name for your pothole.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Post Pothole" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
            <Button variant="primary" type="back">
              Back
            </Button>
          </Form>

        </>
    )
}