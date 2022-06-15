import {
    Button,
    ButtonGroup,
    Container,
    Form,
    FormControl,
    Image,
    InputGroup,
    ToggleButton
} from 'react-bootstrap'
import React, {useEffect, useState} from 'react'
import facepalm from '../Home/icons/face-palm.png'
import crying from '../Home/icons/crying.png'
import bomb from '../Home/icons/bomb.png'
import './PotholeSubmissionPage.css'
import * as Yup from 'yup'
import {httpConfig} from "../utils/httpConfig"
import {Formik} from 'formik'
import {DisplayStatus} from "../shared/components/display-status/DisplayStatus";
import {useDispatch, useSelector} from "react-redux";
import jwtDecode from "jwt-decode";
import {fetchAuth, getAuth} from "../../store/auth";
import {useLocation, useNavigate} from "react-router-dom";
import {useDropzone} from 'react-dropzone';
import {fetchAllPotholes} from "../../store/potholes";

// import { DisplayError } from '../shared/components/display-error/DisplayError';


export function PotholeSubmissionForm(props) {

    const navigate = useNavigate();

    const toHomeMap = () => {
        navigate('/')
    }

    const {photo} = props

    const location = useLocation()
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch()
    const effects = () => {
        dispatch(fetchAuth());
    };
    useEffect(effects, [dispatch]);

    const validator = Yup.object().shape({
        potholeDescription: Yup.string()
            .max(512, 'Pothole description must be less than 512 characters.'),
        potholeSeverity: Yup.number()
            .min(1, 'Please provide a number larger than one.')
            .required('Pothole severity is required.'),
        potholePhoto: Yup.mixed().optional(),
        photoName: Yup.string().optional().max(32, 'Your photo name is too long. It can only be 32 characters.')
    })

    function submitPotholePhoto(values, {resetForm, setStatus}) {

        // 1. upload pothole
        // 2. upload actual image
        // 3. create photo in database
        const pothole = {
            potholeDescription: values.potholeDescription,
            potholeSeverity: values.potholeSeverity,
            potholeLat: values.potholeLat,
            potholeLng: values.potholeLng
        }

        httpConfig.post(`/apis/pothole/`, pothole)
            .then(reply => {
                let {message, type} = reply
                setStatus({message, type})

                if (reply.status === 200) {
                    if (values.potholePhoto) {
                        uploadImage(values.potholePhoto, reply.data)
                    } else {
                        resetForm()
                        //useLink or useNavigate (set a timer of a few seconds) "/Map"
                    }
                }
            })

        function uploadImage(image, potholeId) {
            httpConfig.post(`/apis/image-upload/`, image)
                .then(reply => {
                        let {message, type} = reply

                        if (reply.status === 200) {
                            let photo = {
                                photoURL: message,
                                photoName: values.photoName,
                                photoPotholeId: potholeId
                            }
                            httpConfig.post('/apis/photo/', photo).then(response => {
                                if (response.status === 200) {
                                    resetForm()
                                }
                                setStatus({
                                    message: response.message,
                                    type: response.type
                                })
                                dispatch(fetchAllPotholes())
                                toHomeMap()
                            })
                        } else {
                            setStatus({message, type})
                        }
                    }
                )
        }
    }

    const pothole = {
        potholeSeverity: '1',
        potholeDescription: '',
        potholeLat: location.state.lat,
        potholeLng: location.state.lng,
        photoName: ''
    }

    return (
        <>
            <Formik
                onSubmit={submitPotholePhoto}
                initialValues={pothole}
                validationSchema={validator}
            >
                {PotholeSubmissionFormContent}
            </Formik>
        </>
    )
}

function PotholeSubmissionFormContent(props) {

    const [selectedImage, setSelectedImage] = useState(null)

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
                <h1 className='title-centering mb-3'>Please rate your pothole</h1>
                <Form.Group controlId='potholeSeverity'>
                    <ButtonGroup className="mb-2 d-flex text-center">
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant="secondary"
                                name="potholeSeverity"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) => setRadioValue(e.currentTarget.value)}
                                onClick={() => {
                                    setFieldValue('potholeSeverity', radio.value)
                                }}
                            >
                                {radio.name}

                                <Image src={radio.img} style={{height: '25px', width: '25px'}}/>
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Form.Group>

                <Form.Group className="mt-3 mb-4" controlId="potholeDescription">
                    <Form.Label>Pothole Description</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                        </InputGroup.Text>
                        <FormControl
                            type="description"
                            placeholder="Enter a description here."
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.potholeDescription}
                            name="potholeDescription"
                        />
                    </InputGroup>
                    {errors.potholeDescription && touched.potholeDescription &&
                        <>
                            <div className={'alert alert-danger'}>
                                {errors.potholeDescription}
                            </div>
                        </>
                    }
                </Form.Group>

                <h1 className='title-centering'>Add Photo</h1>
                {selectedImage === null &&
                    <ImageDropZone
                      formikProps={{
                          values,
                          handleChange,
                          handleBlur,
                          setFieldValue,
                          fieldValue: 'potholePhoto',
                          setSelectedImage: setSelectedImage

                      }}
                    />
                }
                <div className='mx-auto d-flex justify-content-center'>
                    {selectedImage !== null ? <img src={selectedImage}/> : ""}
                </div>

                <Form.Group className="mb-3" controlId="photoName">
                    <Form.Label>Photo Name</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                        </InputGroup.Text>
                        <FormControl
                            type="text"
                            placeholder="Name of Photo."
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.photoName}
                            name="photoName"
                        />
                    </InputGroup>
                    {errors.photoName && touched.photoName &&
                        <>
                            <div className={'alert alert-danger'}>
                                {errors.photoName}
                            </div>
                        </>
                    }
                </Form.Group>
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
            <DisplayStatus status={status}/>
            {/*<FormDebugger {...props} />*/}
        </>
    )
}

function ImageDropZone({formikProps}) {

    const onDrop = React.useCallback(acceptedFiles => {

        const formData = new FormData()
        formData.append('image', acceptedFiles[0])

        const fileReader = new FileReader()
        fileReader.readAsDataURL(acceptedFiles[0])
        fileReader.addEventListener("load", () => {
            formikProps.setSelectedImage(fileReader.result)
        })

        formikProps.setFieldValue(formikProps.fieldValue, formData)

    }, [formikProps])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <Form.Group className={"mb-3"} {...getRootProps()}>

            <InputGroup size="lg" className="">

                <div className="mt-3 form-control-div mx-auto d-flex bg-light justify-content-center align-items-center border rounded w-50 py-3 px-3">
                    <FormControl
                        aria-label="pothole photo file drag and drop area"
                        aria-describedby="image drag drop area"
                        className="form-control-file"
                        accept="image/*"
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        {...getInputProps()}
                    />
                    {
                        isDragActive ?
                            <span className="align-items-center text-secondary">Drop image here</span> :
                            <span className="align-items-center text-secondary opacity-25">Drag and drop image, <br/> or click to choose from device.</span>
                    }
                </div>
            </InputGroup>
        </Form.Group>
    )
}





