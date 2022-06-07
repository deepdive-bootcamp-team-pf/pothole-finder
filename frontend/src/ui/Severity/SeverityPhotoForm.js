
import { Button, ButtonGroup, Container, Form, Image, ToggleButton } from 'react-bootstrap'
import React, { useState } from 'react'
import facepalm from '../Home/icons/face-palm.png'
import crying from '../Home/icons/crying.png'
import bomb from '../Home/icons/bomb.png'
import './SeverityPhotoPage.css'



export function SeverityPhotoForm (){
  const radios = [
    { name: 'Mild ', value: '1', img: facepalm },
    { name: 'Moderate ', value: '2', img: crying },
    { name: 'Severe ', value: '3', img: bomb },
  ]

  const [radioValue, setRadioValue] = useState('1')

  return (
    <>
      <Form>
        <h1 className='title-centering'>Please rate your Pothole</h1>
        <ButtonGroup className="mb-2 d-flex text-center">
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant="secondary"
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}

              <Image src={radio.img} style={{ height: '25px', width: '25px' }}/>
            </ToggleButton>
          ))}
        </ButtonGroup>
        <br/>
        <br/>
        <Form.Group className="mb-3" controlId="photoName">
          <Form.Label>Photo Name</Form.Label>
          <Form.Control type="name" placeholder="Camino de Crater"/>
          <Form.Text className="text-muted">
            Please add a name for your pothole.
          </Form.Text>
        </Form.Group>


        <Form.Group className="mb-3" controlId="photoDescription">
          <Form.Label>Photo Description</Form.Label>
          <Form.Control type="description" placeholder="This pothole gave me a flat tire!"/>
          <Form.Text className="text-muted">
            Please add a brief description of pothole.
          </Form.Text>
        </Form.Group>

        <h1 className='title-centering'>Add Photo</h1>
        <p>Please add a photo of your pothole. We can pull the location of pothole from photo. This step is
          optional.</p>
        <Button className="m-auto d-flex primary" type="addPhoto">
          Add Photo</Button>
        <br></br>
        <Container fluid className="d-flex">
          <Button href="/" variant="primary" type="back">
            Back
          </Button>
          <Button className="ms-auto primary" type="submit">
            Submit
          </Button>
        </Container>

      </Form>

    </>
  )
}
