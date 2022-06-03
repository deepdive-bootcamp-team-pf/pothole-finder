import React from 'react'
import { Button } from 'react-bootstrap'
import { Form } from 'formik'


export function SeverityPhotoPage (){

  return(
        <>
            <div>
                  <h1>Please rate your pothole</h1>
                        {/*<button variant="primary" onClick={handleClose}>Severe: 3+ inch </button>*/}
                        {/*<button variant="primary" onClick={handleClose}>Moderate: 1-3 inch </button>*/}
                        {/*<button variant="primary" onClick={handleClose}>Mild: under 1 inch or cracking pavement </button>*/}

                    <h2>Please Add A Photo Of Your Pothole</h2>
                    <p>This step is optional. We can pull location of pothole from photo. This step is optional.</p>

                    <button>Add Pothole </button>
                    <button>Back </button>
                    <button>Next </button>


            </div>

          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>

        </>
    )
}