import React, {useEffect, useState} from 'react'
import 'maplibre-gl/dist/maplibre-gl.css'
import './Map.css'
import Map, {Marker} from 'react-map-gl'
import mapLibre from 'maplibre-gl'
import { Pin } from './Pin'
import pin from "./icons/pin.png"
import {useDispatch, useSelector} from "react-redux";
import {setLocation} from '../../store/location'
import {fetchAllPotholes} from "../../store/potholes";
import {Container} from "react-bootstrap";


export function GetMarker() {
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

    return (
            <Marker
                longitude={lng}
                latitude={lat}
                anchor="bottom"
                draggable={true}
                onDragEnd={dragEnd}
            >
                <img src={pin} style={{width: '50px', height: '50px'}}/>
            </Marker>
    )
}

export default function MapFunction(props) {
    const {show} = props

    const potholes = useSelector(state => state.potholes ? state.potholes : []);
    const dispatch = useDispatch();
    const effects = () => {
        dispatch(fetchAllPotholes());
    };
    useEffect(effects, [dispatch]);

    return (
        <>
                <Map

                    mapLib={mapLibre}
                    initialViewState={{
                        latitude: 35.126899,
                        longitude: -106.575077,
                        zoom: 12
                    }}
                    style={{height: '100vh'}}
                    mapStyle="https://api.maptiler.com/maps/streets/style.json?key=D4b2ldjY7geFrPnuBPU8"
                >
                    {potholes.map(pothole => <Pin pothole={pothole} latitude={pothole.potholeLat} longitude={pothole.potholeLng} description={pothole.potholeDescription} key={pothole.potholeId}/>)}
                    {show ? <GetMarker/> : null}
                </Map>
        </>
    )
}