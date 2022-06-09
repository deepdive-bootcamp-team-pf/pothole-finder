import React, { useState } from 'react'
import { Button, ButtonGroup, Container, Form, Image, ToggleButton } from 'react-bootstrap'
import './SeverityPhotoPage.css'
import {SeverityPhotoForm} from './SeverityPhotoForm'

export function SeverityPhotoPage() {

  return (
    <>
      <Container fluid className={'full-screen d-flex justify-content-center align-items-center add-background-image'}>
        <Container id={'content'} className={'my-auto p-3'}>
          <SeverityPhotoForm/>
        </Container>
      </Container>

    </>
  )
}