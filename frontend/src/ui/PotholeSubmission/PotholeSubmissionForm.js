import {
    Button,
    ButtonGroup,
    Col,
    Container,
    Form,
    FormControl,
    Image,
    InputGroup,
    Row,
    ToggleButton
} from 'react-bootstrap'
import React, {useState} from 'react'
import facepalm from '../Home/icons/face-palm.png'
import crying from '../Home/icons/crying.png'
import bomb from '../Home/icons/bomb.png'
import './PotholeSubmissionPage.css'
import {FormDebugger} from "../utils/FormDebugger"
import * as Yup from 'yup'
import {httpConfig} from "../utils/httpConfig"
import {Formik} from 'formik'
import {DisplayStatus} from "../shared/components/display-status/DisplayStatus";


export function PotholeSubmissionForm(props) {
    const {photo} = props

    const validator = Yup.object().shape({
        potholeDescription: Yup.string()
            .required('A pothole description is required.')
            .max(255, 'First name must be 255 characters or less.'),
        potholeName: Yup.string()
            .required('A name is required.')
            .max(32, 'Last name must be 32 characters or less.')
    })

    function SubmitPotholeSubmissionForm(values, {resetForm, setStatus}) {

        if (values !== undefined) {
            httpConfig.post('/apis/photo-upload', values)
                .then(reply => {
                        let {message, type} = reply

                        if (reply.status === 200) {
                            submitUpdatedPothole({...values})
                        } else {
                            setStatus({message, type})
                        }
                    }
                )
        } else {
            submitUpdatedPothole(values)
        }

        function submitUpdatedPothole(updatedPothole) {
            httpConfig.post(`/apis/photo-upload/${photo.photoId}`, updatedPothole)
                .then(reply => {
                    let {message, type} = reply

                    if (reply.status === 200) {
                        resetForm()
                    }
                    setStatus({message, type})
                })
        }
    }
        return (
            <>
                <Formik
                    onSubmit={SubmitPotholeSubmissionForm}
                    initialValues={pothole}
                    validationSchema={validator}
                >
                    {PotholeSubmissionFormContent}
                </Formik>
            </>
        )
}

function PotholeSubmissionFormContent(props) {
    const {
        status,
        values,
        errors,
        touched,
        dirty,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        setFieldValue
    } = props

    const radios = [
        {name: 'Mild ', value: '1', img: facepalm},
        {name: 'Moderate ', value: '2', img: crying},
        {name: 'Severe ', value: '3', img: bomb},
    ]

    const [radioValue, setRadioValue] = useState('1')

    return (
        <>
            <Form onSubmit={handleSubmit} className={'p-3 form-text'}>
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

                            <Image src={radio.img} style={{height: '25px', width: '25px'}}/>
                        </ToggleButton>
                    ))}
                </ButtonGroup>


                <Form.Group className="mb-3" controlId="photoName">
                    <Form.Label>Photo Name</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                        </InputGroup.Text>
                        <Form.Control
                            type="name"
                            placeholder="Camino de Crater"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.photoName}
                            name="photoName"
                        />
                        <InputGroup>
                            <Form.Text className="text-muted">
                                Please add a name for your pothole.
                            </Form.Text>
                        </InputGroup>
                    </InputGroup>
                    {errors.photoName && touched.photoName &&
                        <>
                            <div className={'alert alert-danger'}>
                                {errors.photoName}
                            </div>
                        </>
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="photoDescription">
                    <Form.Label>Photo Description</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                        </InputGroup.Text>
                        <Form.Control
                            type="description"
                            placeholder="This pothole gave me a flat tire!"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.photoDescription}
                            name="photoDescription"
                        />
                        <InputGroup>
                            <Form.Text className="text-muted">
                                Please add a brief description of pothole.
                            </Form.Text>
                        </InputGroup>
                    </InputGroup>
                    {errors.photoDescription && touched.photoDescription &&
                        <>
                            <div className={'alert alert-danger'}>
                                {errors.photoDescription}
                            </div>
                        </>
                    }
                </Form.Group>

                <h1 className='title-centering'>Add Photo</h1>
                <p>Please add a photo of your pothole. We can pull the location of pothole from photo. This step is
                    optional.</p>
                <Button className="m-auto d-flex primary" type="addPhoto">
                    Add Photo</Button>

                <ImageDropZone
                    formikProps={{
                        values,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                        fieldValue: 'profileAvatarUrl'
                    }}
                />

                <br/>

                <Container fluid className="d-flex">
                    <Button href="/" variant="primary" type="back">
                        Back
                    </Button>
                    <Button className="ms-auto primary" type="submit">
                        Submit
                    </Button>
                </Container>
            </Form>
            {status && <div className={status.type}>{status.message}</div>}
            <DisplayStatus status={status}/>
        </>
    )
}

function ImageDropZone({formikProps}) {

    const onDrop = React.useCallback(acceptedFiles => {

        const formData = new FormData()
        formData.append('image', acceptedFiles[0])

        formikProps.setFieldValue(formikProps.fieldValue, formData)

    }, [formikProps])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <Form.Group className={"mb-3"} {...getRootProps()}>
            <Form.Label>User Avatar</Form.Label>

            <InputGroup size="lg" className="">
                {
                    formikProps.values.profileAvatarUrl &&
                    <>
                        <div className="bg-transparent m-0">
                            <Image fluid={true} height={100} rounded={true} thumbnail={true} width={100}
                                   alt="user avatar" src={formikProps.values.profileAvatarUrl}/>
                        </div>
                    </>
                }
                <div className="d-flex flex-fill bg-light justify-content-center align-items-center border rounded">
                    <FormControl
                        aria-label="profile avatar file drag and drop area"
                        aria-describedby="image drag drop area"
                        className="form-control-file"
                        accept="image/*"
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        {...getInputProps()}
                    />
                    {
                        isDragActive ?
                            <span className="align-items-center">Drop image here</span> :
                            <span className="align-items-center">Drag and drop image here, or click here to select an image</span>
                    }
                </div>
            </InputGroup>
        </Form.Group>
    )
}






