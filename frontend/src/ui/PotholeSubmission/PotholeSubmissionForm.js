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
import {FormDebugger} from "../utils/FormDebugger"
import * as Yup from 'yup'
import {httpConfig} from "../utils/httpConfig"
import {Formik} from 'formik'
import {DisplayStatus} from "../shared/components/display-status/DisplayStatus";
import {useDispatch, useSelector} from "react-redux";
import jwtDecode from "jwt-decode";
import {fetchAuth, getAuth} from "../../store/auth";
import {useLocation} from "react-router-dom";


export function PotholeSubmissionForm() {

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
            .required('Pothole severity is required.')
    })

    const handleSubmit = (values, {resetForm, setStatus}) => {
        httpConfig.post('/apis/pothole', values).then(reply => {
            const {message, type, status} = reply
            if (status === 200 && reply.headers["authorization"]) {
                window.localStorage.removeItem("authorization");
                window.localStorage.setItem("authorization", reply.headers["authorization"]);
                resetForm();
                let jwtToken = jwtDecode(reply.headers["authorization"])
                dispatch(getAuth(jwtToken))
                {
                    resetForm()
                }
            }
            setStatus({message, type})
        })
    }

    // function submitUpdatedPothole(updatedPothole) {
    //     httpConfig.post(`/apis/photo-upload/${photo.photoId}`, updatedPothole)
    //         .then(reply => {
    //             let {message, type} = reply
    //
    //             if (reply.status === 200) {
    //                 resetForm()
    //             }
    //             setStatus({message, type})
    //         })
    // }

    const pothole = {
        potholeSeverity: '1',
        potholeDescription: '',
        potholeLat: location.state.lat,
        potholeLng: location.state.lng
    }

    return (
        <>
            <Formik
                onSubmit={handleSubmit}
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
                                onClick={()=>{setFieldValue('potholeSeverity', radio.value)}}
                            >
                                {radio.name}

                                <Image src={radio.img} style={{height: '25px', width: '25px'}}/>
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="potholeDescription">
                    <Form.Label>Pothole Description</Form.Label>
                    <InputGroup>
                        <InputGroup.Text>
                        </InputGroup.Text>
                        <FormControl
                            type="description"
                            placeholder="Optional brief description of the pothole. Let users know HOW bad this pothole is."
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
                <p className='text-center text-muted small'>(Adding a photo is optional.)</p>
                <Button className="m-auto d-flex primary" type="addPhoto">
                    Add Photo</Button>

                {/*<ImageDropZone*/}
                {/*    formikProps={{*/}
                {/*        values,*/}
                {/*        handleChange,*/}
                {/*        handleBlur,*/}
                {/*        setFieldValue,*/}
                {/*        fieldValue: 'profileAvatarUrl'*/}
                {/*    }}*/}
                {/*/>*/}

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
        </>
    )
}

// function ImageDropZone({formikProps}) {
//
//     const onDrop = React.useCallback(acceptedFiles => {
//
//         const formData = new FormData()
//         formData.append('image', acceptedFiles[0])
//
//         formikProps.setFieldValue(formikProps.fieldValue, formData)
//
//     }, [formikProps])
//     const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
//
//     return (
//         <Form.Group className={"mb-3"} {...getRootProps()}>
//             <Form.Label>User Avatar</Form.Label>
//
//             <InputGroup size="lg" className="">
//                 {
//                     formikProps.values.profileAvatarUrl &&
//                     <>
//                         <div className="bg-transparent m-0">
//                             <Image fluid={true} height={100} rounded={true} thumbnail={true} width={100}
//                                    alt="user avatar" src={formikProps.values.profileAvatarUrl}/>
//                         </div>
//
//                     </>
//                 }
//                 <div className="d-flex flex-fill bg-light justify-content-center align-items-center border rounded">
//                     <FormControl
//                         aria-label="profile avatar file drag and drop area"
//                         aria-describedby="image drag drop area"
//                         className="form-control-file"
//                         accept="image/*"
//                         onChange={formikProps.handleChange}
//                         onBlur={formikProps.handleBlur}
//                         {...getInputProps()}
//                     />
//                     {
//                         isDragActive ?
//                             <span className="align-items-center">Drop image here</span> :
//                             <span className="align-items-center">Drag and drop image here, or click here to select
// an image</span> } </div> </InputGroup> </Form.Group> ) }






