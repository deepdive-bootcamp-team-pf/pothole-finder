import React, {useEffect, useState} from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import './Map.css'
import Map, {GeolocateControl, Marker, NavigationControl, Popup, ScaleControl, useMap} from 'react-map-gl'
import mapLibre from 'maplibre-gl'
import {Pin} from './Pin'
import pin from "./icons/pin.png"
import {useDispatch, useSelector} from "react-redux";
import {setLocation} from '../../store/location'
import {fetchAllPotholes} from "../../store/potholes";
import {Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareXmark, faSquareCheck} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router-dom";

export function GetMarker(props) {
    const {show, setShow} = props

    const {current: value} = useMap()
    value.flyTo({center: [0,0]})

    const location = useSelector((state) => state.location ? state.location : {});
    const dispatch = useDispatch()

    const [lat, setLat] = useState(35.116363)
    const [lng, setLng] = useState(-106.604730)

    const initialEffects = () => {
        dispatch(setLocation({}))
    }

    React.useEffect(initialEffects, [dispatch])

    const dragEnd = (event) => {
        dispatch(setLocation({lat: event.lngLat.lat, lng: event.lngLat.lng}))
        setLat(event.lngLat.lat)
        setLng(event.lngLat.lng)
    }

    const navigate = useNavigate();
    const toPotholeSubmission = () => {
        navigate('pothole-submission-page', {state: {lat: location.lat, lng: location.lng}})
    }

    return (
        <>
            {show &&
                <>
                <div className={'home-nav position-absolute confirm-marker'}>
                    <p className={'mb-0'}>Confirm Marker?</p>
                    <Row>
                        <Col className={'d-flex justify-content-center'}>
                            <FontAwesomeIcon className={'x-button'} icon={faSquareXmark}
                                             onClick={() => setShow(false)}/>
                        </Col>
                        <Col className={'d-flex justify-content-center'}>
                            <FontAwesomeIcon className={'check-button'} icon={faSquareCheck}
                                             onClick={() => toPotholeSubmission()}/>
                        </Col>
                    </Row>
                </div>

                <Marker
                longitude={lng}
                latitude={lat}
                anchor="bottom"
                draggable={true}
                onDragEnd={dragEnd}
                //     onClick={e => {
                //         // If we let the click event propagates to the map, it will immediately close the popup
                //         // with `closeOnClick: true`
                //         e.originalEvent.stopPropagation();
                //         setPopupInfo(potholeInfo);
                //     }}
                >
                <img src={pin} alt={'draggable marker'} style={{width: '80px', height: '80px'}}/>
                </Marker>
                    </>
            }
        </>
    )
}

export default function MapFunction(props) {
    const {show, setShow} = props

    const potholes = useSelector(state => state.potholes ? state.potholes : []);
    const dispatch = useDispatch();
    const effects = () => {
        dispatch(fetchAllPotholes());
    };
    useEffect(effects, [dispatch]);

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        const crd = pos.coords;

        return [`${crd.latitude}`, `${crd.longitude}`]
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

    const [popupInfo, setPopupInfo] = useState(null);

    return (
        <>
            <Map
                id={"currentMap"}
                mapLib={mapLibre}
                initialViewState={{
                    latitude: 35.126899,
                    longitude: -106.575077,
                    zoom: 12
                }}
                style={{height: '100vh'}}
                mapStyle="https://api.maptiler.com/maps/streets/style.json?key=D4b2ldjY7geFrPnuBPU8"
            >
                {potholes.map(pothole => <Pin setPopupInfo={setPopupInfo} pothole={pothole}
                                              latitude={pothole.potholeLat}
                                              longitude={pothole.potholeLng}
                                              key={pothole.potholeId}/>)}
                {show ? <GetMarker show={show} setShow={setShow}/> : null}

                <GeolocateControl position="bottom-left"/>
                <NavigationControl position="bottom-left"/>
                <ScaleControl/>

                {popupInfo !== null && (
                    <Popup
                        anchor="top"
                        longitude={Number(popupInfo.potholeLng)}
                        latitude={Number(popupInfo.potholeLat)}
                        onClose={() => {
                            setPopupInfo(null)
                        }}
                    >
                        {popupInfo.potholeDescription}

                        {/*<img width="100%" src={popupInfo.photo}/>*/}
                    </Popup>
                )}
            </Map>
        </>
    )
}