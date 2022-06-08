import React, {useRef, useEffect, useState} from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import './Map.css'
import {fetchAllPotholes} from "../../store/potholes";
import Map from 'react-map-gl'
import mapLibre from 'maplibre-gl'
import { Container, Row, Col } from 'react-bootstrap'
import { Pin } from './Pin'

export default function Map(){

    // // Tell this component that it needs to watch for items that live outside this component (misquotes in the redux store)
    // // This is how we make sure the component looks for our data from redux and the fetch response from the backend
    // const dispatch = useDispatch()
    // const initialEffects = () => {
    //     dispatch(fetchAllPotholes())
    // }
    // React.useEffect(initialEffects, [dispatch])
    //
    // // use the misquotes data from the store
    // const potholes = useSelector((state) => state.potholes ? state.potholes : [])
    //
    // console.log(potholes)
    const [points] = React.useState([
        { lat: 35.332, lng: -106.652 },
        { lat: 35.339, lng: -106.656 },
        { lat: 35.40, lng: -106.666 },
        { lat: 35.23, lng: -106.4444 }


    return (
        <div className="map-wrap">
            <Map
                ref={mapContainer}
                className="map"
                mapLib={mapLibre}
                initialViewState={{
                    latitude: 35.33,
                    longitude: -106.65,
                    zoom: 9
                }}
                style={{ width: 600, height: 400 }}
                mapStyle="https://api.maptiler.com/maps/streets/style.json?key=D4b2ldjY7geFrPnuBPU8"
            >
                {points.map((point, index) => <Pin lat={point.lat} lng={point.lng} index={index} key={index}/>)}
            </Map>
        </div>
    )
}